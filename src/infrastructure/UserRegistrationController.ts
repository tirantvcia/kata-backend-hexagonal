import { UserRegistrationService } from "../application/UserRegistrationService";
import { UserRegistrationRequest, UserRegistrationResponse } from "../application/dto";
import { ValidationError } from "../core/valuelObjects/ValidationError";
import { HttpRequest, HttpResponse } from "./Http";


export class UserRegistrationController {

    constructor(private userRegistrationService: UserRegistrationService) { }
    async register(request: HttpRequest<UserRegistrationRequest>, response: HttpResponse<UserRegistrationResponse>) {
        try {
            this.ensureRegistrationDataIsProvided(request); 
            await this.hendleRegistration(request, response);
        } catch (error) {
            this.handleErrors(error, response);
            
        }
        
    }


    private async hendleRegistration(request: HttpRequest<UserRegistrationRequest>, response: HttpResponse<UserRegistrationResponse>) {
        const registrationResponse: UserRegistrationResponse = await this.userRegistrationService.register(request.body);
        response.status(201).json(registrationResponse);
    }

    private handleErrors(error: any, response: HttpResponse<UserRegistrationResponse>) {
        if (error instanceof ValidationError) {
            response.status(400).json({ message: error.message });
        } else {
            response.status(500).json({ message: 'Internal server error' });
        }
    }

    private ensureRegistrationDataIsProvided(request: HttpRequest<UserRegistrationRequest>) {
        if (!request.body.email) {
            throw new ValidationError("Email is required");
        }
        if (!request.body.password) {
            throw new ValidationError("Password is required");
        }
    }
}
