import { json } from "express";
import { UserRegistrationService } from "../../../application/UserRegistrationService";
import { UserRegistrationRequest, UserRegistrationResponse } from "../../../application/dto";
import { InMemoryRepository } from "../../../core/repositories/UserRepository";
import { Email } from "../../../core/valuelObjects/Email";
import { ValidationError } from "../../../core/valuelObjects/ValidationError";

interface HttpRequest<T>  {
    body: T
}

interface HttpResponse<T>  {
    status(code: number): this;
    json(data: T | {message: string}): this;
}

class UserRegistrationController {

    constructor(private userRegistrationService: UserRegistrationService) {}
    async register(request: HttpRequest<UserRegistrationRequest>, response: HttpResponse<UserRegistrationResponse>) {
        const registrationResponse : UserRegistrationResponse = await this.userRegistrationService.register(request.body);
        response.status(201).json(registrationResponse);
    }
    
}

describe('The Controller', ()=>{
    it('ensure that register email is valid', async () => {
        const userRepository: InMemoryRepository = new InMemoryRepository();
        const userRegistrationService = new UserRegistrationService(userRepository);
        const userRegistrationController = new UserRegistrationController(userRegistrationService);

        const email = 'test@test.com';
        const password = "TestPass01_";
        const request: HttpRequest<UserRegistrationRequest> = {
            body: {
                email,
                password
            }
        }
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        } as HttpResponse<UserRegistrationResponse>;


        
        await userRegistrationController.register(request, response);
        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith({id: expect.any(String), email});

    })
})

function createRequestWithoutEmail(): UserRegistrationRequest {
    return {
        email: '',
        password: 'TestPwd12_'
    };
}
