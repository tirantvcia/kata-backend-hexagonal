import { json } from "express";
import { UserRegistrationService } from "../../../application/UserRegistrationService";
import { UserRegistrationRequest, UserRegistrationResponse } from "../../../application/dto";
import { InMemoryRepository } from "../../../core/repositories/UserRepository";
import { Email } from "../../../core/valuelObjects/Email";
import { ValidationError } from "../../../core/valuelObjects/ValidationError";
import { HttpRequest, HttpResponse } from "../../../infrastructure/Http";
import { UserRegistrationController } from "../../../infrastructure/UserRegistrationController";

describe('The Controller', ()=>{
    let userRegistrationController: UserRegistrationController;
    beforeEach(()=>{
        userRegistrationController  = createController();
    }) 
    it('register new user when email and password are provided', async () => {
       

        const email = 'test@test.com';
        const password = "TestPass01_";
        const request: HttpRequest<UserRegistrationRequest> = createStubRequest(email, password)
        const response = createSpyResponse();


        
        await userRegistrationController.register(request, response);
        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith({id: expect.any(String), email});

    })
 
})

function createController() {
    const userRepository: InMemoryRepository = new InMemoryRepository();
    const userRegistrationService = new UserRegistrationService(userRepository);
    const userRegistrationController = new UserRegistrationController(userRegistrationService);
    return userRegistrationController;
}

function createStubRequest(email: string, password: string): HttpRequest<UserRegistrationRequest> {
    return {
        body: {
            email,
            password
        }
    };
}

function createSpyResponse() {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    } as HttpResponse<UserRegistrationResponse>;
}

function createRequestWithoutEmail(): UserRegistrationRequest {
    return {
        email: '',
        password: 'TestPwd12_'
    };
}
