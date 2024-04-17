import { Email } from "../valuelObjects/Email";
import { Id } from "../valuelObjects/Id";
import { Password } from "../valuelObjects/Password";
import { ValidationError } from "../valuelObjects/ValidationError";


export class User {

    constructor(private readonly id: Id, private readonly email: Email, private password: Password) { };

    isMatchingPassword(password: Password): boolean {
        return this.password.isEqual(password);
    }

    changePassword(newPassword: Password) {
        this.ensureIsDifferentPassword(newPassword);
        this.password = newPassword;
    }

    private ensureIsDifferentPassword(newPassword: Password) {
        if (this.isMatchingPassword(newPassword)) {
            throw new ValidationError("new password is the same as current");
        }
    }
}
