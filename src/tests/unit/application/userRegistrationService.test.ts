import { User } from "../../../core/entities/User";
import { InMemoryRepository } from "../../../core/repositories/UserRepository";
import { Email } from "../../../core/valuelObjects/Email";
import { Id } from "../../../core/valuelObjects/Id";
import { Password } from "../../../core/valuelObjects/Password";
import { ValidationError } from "../../../core/valuelObjects/ValidationError";

type UserRegistrationRequest = {
    email : string,
    password : string
}
type UserRegistrationResponse = {
    email : string,
    id : string
}

class UserRegistrationService {

    constructor(private readonly userRepository: InMemoryRepository){}
    
    async register(registrationRequest: UserRegistrationRequest): Promise<UserRegistrationResponse> {
        await this.ensureEmailIsNotUsed(Email.create(registrationRequest.email));
        const user: User = await this.createUser(registrationRequest);
        await this.userRepository.save(user);
        return user.toDto();
    }

 

    private async createUser(registrationRequest: UserRegistrationRequest) {
        const email = Email.create(registrationRequest.email);
        const id = Id.generate();
        const password = Password.createFromPlainText(registrationRequest.password);
        const user: User = new User(id, email, password);
        return user;
    }

    private async ensureEmailIsNotUsed(email: Email) {
        const userRegistered = await this.findUserByEmail(email);
        if (userRegistered) {
            throw new ValidationError("email has been used");
        }
    }

    async findUserByEmail(email: Email): Promise<User>  {
        return this.userRepository.findByEmail(email);
    }
}

describe('The User registration service',  () => {
    it('register a new user successfully when given request is valid', async () => {
        const registrationRequest: UserRegistrationRequest = createRequest() 
        const userRepository: InMemoryRepository = new InMemoryRepository();
        const userRegistrationService = new UserRegistrationService(userRepository);
        await userRegistrationService.register(registrationRequest);

        const email = Email.create(registrationRequest.email);
        const userFromBBDD = await userRegistrationService.findUserByEmail(email);
        expect(userFromBBDD.isMatchingEmail(email)).toBeTruthy();
    })

    it('cannot register a new user when email is used by another registered user', async () => {
        const registrationRequest: UserRegistrationRequest = createRequest() 
        const userRepository: InMemoryRepository = new InMemoryRepository();
        const userRegistrationService = new UserRegistrationService(userRepository);
        await userRegistrationService.register(registrationRequest);
        expect(userRegistrationService.register(registrationRequest)).rejects.toThrow(new ValidationError("email has been used"));
        

    })
})

function createRequest(): UserRegistrationRequest {
    return {
        email: 'testEmail@hexagonal.tdd',
        password: 'TestPwd12_'
    };
}
