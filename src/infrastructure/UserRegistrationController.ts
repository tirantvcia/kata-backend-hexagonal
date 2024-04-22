import { UserRegistrationService } from "../application/UserRegistrationService";
import { UserRegistrationRequest, UserRegistrationResponse } from "../application/dto";
import { HttpRequest, HttpResponse } from "./Http";


export class UserRegistrationController {

    constructor(private userRegistrationService: UserRegistrationService) { }
    async register(request: HttpRequest<UserRegistrationRequest>, response: HttpResponse<UserRegistrationResponse>) {
        const registrationResponse: UserRegistrationResponse = await this.userRegistrationService.register(request.body);
        response.status(201).json(registrationResponse);
    }

}
