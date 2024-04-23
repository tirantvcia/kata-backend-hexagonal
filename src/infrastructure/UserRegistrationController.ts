import { UserRegistrationService } from "../application/UserRegistrationService";
import { UserRegistrationRequest, UserRegistrationResponse } from "../application/dto";
import { ValidationError } from "../core/valuelObjects/ValidationError";
import { HttpRequest, HttpResponse } from "./Http";


export class UserRegistrationController {

    constructor(private userRegistrationService: UserRegistrationService) { }
    async register(request: HttpRequest<UserRegistrationRequest>, response: HttpResponse<UserRegistrationResponse>) {
        try {
            if (!request.body.email) {
                throw new ValidationError("Email is required");
            } 
            const registrationResponse: UserRegistrationResponse = await this.userRegistrationService.register(request.body);
            response.status(201).json(registrationResponse);
        } catch (error) {
            if(error instanceof ValidationError) {
                response.status(400).json({message: error.message});
            } else {
                response.status(500).json({message: 'Internal server error'});
            }
            
        }
        
    }

}
