import { User } from "../core/entities/User";
import { InMemoryRepository } from "../core/repositories/UserRepository";
import { Email } from "../core/valuelObjects/Email";
import { Id } from "../core/valuelObjects/Id";
import { Password } from "../core/valuelObjects/Password";
import { ValidationError } from "../core/valuelObjects/ValidationError";
import { UserRegistrationRequest, UserRegistrationResponse } from "./dto";


export class UserRegistrationService {

    constructor(private readonly userRepository: InMemoryRepository) { }

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

    async findUserByEmail(email: Email): Promise<User> {
        return this.userRepository.findByEmail(email);
    }
}
