import { InMemoryRepository } from "../../../core/repositories/UserRepository";
import { Email } from "../../../core/valuelObjects/Email";
import { ValidationError } from "../../../core/valuelObjects/ValidationError";
import { UserRegistrationService } from "../../../application/UserRegistrationService";
import { UserRegistrationRequest } from "../../../application/dto";

describe('The User registration service',  () => {
    let userRepository: InMemoryRepository;
    let userRegistrationService:UserRegistrationService;
    beforeEach(() => {
        userRepository = new InMemoryRepository();
        userRegistrationService = new UserRegistrationService(userRepository);
    });

    it('register a new user successfully when given request is valid', async () => {
        const registrationRequest: UserRegistrationRequest = createRequest() 
        await userRegistrationService.register(registrationRequest);
        const email = Email.create(registrationRequest.email);
        const userFromBBDD = await userRegistrationService.findUserByEmail(email);
        expect(userFromBBDD.isMatchingEmail(email)).toBeTruthy();
    })

    it('cannot register a new user when email is used by another registered user', async () => {
        const registrationRequest: UserRegistrationRequest = createRequest() 
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
