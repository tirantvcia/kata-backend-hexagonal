import { UserRegistrationService } from "./application/UserRegistrationService";
import { InMemoryRepository } from "./core/repositories/UserRepository";
import { UserRegistrationController } from "./infrastructure/UserRegistrationController";
import { createRouter, createServer } from "./infrastructure/server";



export class Factory {
    private static userRepository: InMemoryRepository;
    static getUserRepository() {
        if (this.userRepository == null) {
            this.userRepository = new InMemoryRepository();
        }
        return this.userRepository;
    }
    static createController() {
        const userRepository: InMemoryRepository = this.getUserRepository();
        const userRegistrationService = new UserRegistrationService(userRepository);
        return new UserRegistrationController(userRegistrationService);

    }
    static createServer() {
        return createServer(createRouter(this.createController()));
    }

}
