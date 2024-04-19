import { User } from "../../../core/entities/User";
import { InMemoryRepository } from "../../../core/repositories/UserRepository";
import { Email } from "../../../core/valuelObjects/Email";
import { Id } from "../../../core/valuelObjects/Id";
import { Password } from "../../../core/valuelObjects/Password";

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
        const id = Id.generate();
        const user: User = this.createUser(registrationRequest, id);
        await this.userRepository.save(user);
        return user.toDto();
    }

 

    private createUser(registrationRequest: UserRegistrationRequest, id: Id) {
        const password = Password.createFromPlainText(registrationRequest.password);
        const email = Email.create(registrationRequest.email);
        const user: User = new User(id, email, password);
        return user;
    }

    async findUserByEmail(email: Email): Promise<User>  {
        return this.userRepository.findByEmail(email);
    }
}

describe('The User registration service',  () => {
    it('register a new user successfully when given request is valid', async () => {
        const registrationRequest: UserRegistrationRequest = {
            email: 'testEmail@hexagonal.tdd',
            password: 'TestPwd12_'
        } 
        const userRepository: InMemoryRepository = new InMemoryRepository();
        const userRegistrationService = new UserRegistrationService(userRepository);
        userRegistrationService.register(registrationRequest);
        const email = Email.create(registrationRequest.email);
        const userFromBBDD = await userRegistrationService.findUserByEmail(email);
        expect(userFromBBDD.isMatchingEmail(email)).toBeTruthy();
    })
})