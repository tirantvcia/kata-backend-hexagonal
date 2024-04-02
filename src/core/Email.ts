import { ValidationError } from "./ValidationError";

export class Email {

    private constructor(readonly email: string) { }
    static create(email: string): Email {
        this.checkIsValidEmail(email);
        return new Email(email);

    }
    private static checkIsValidEmail(email: string) {
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!expression.test(email)) {
            throw new ValidationError("email with invalid format");
        }
    }

    toString() {
        return this.email;
    }
    equals(email: Email): any {
        return this.email === email.email;
    }

}
