import { ValidationError } from "./ValidationError";
import { hash } from "../common/hash";

export class Password {


    private constructor(readonly value: string) { }

    static createFromPlainText(plainText: string): Password {
        Password.validate(plainText);
        return new Password(Password.hashPlainText(plainText));
    }

    private static hashPlainText(plainText: string) {
        return hash(plainText);
    }

    toString(): string {
        return this.value;
    }

    isEqual(password: Password): any {
        return this.value === password.value;
    }
    
    private static validate(text: string) {
        const validationErrors: string[] = [];
        Password.validateLength(text, validationErrors);
        Password.validateUpperCaseLetter(text, validationErrors);
        Password.validateLowerCaseLetter(text, validationErrors);
        Password.validateNumber(text, validationErrors);
        Password.validateUnderscore(text, validationErrors);
        if (validationErrors.length > 0) {
            throw new ValidationError(validationErrors.join(", "));
        }
    }


    static validateUnderscore(text: string, validationErrors: string[]) {
        const underscoreExpr: RegExp = /^.*_.*$/;
        if (!underscoreExpr.test(text)) {
            validationErrors.push("password must have almost one underscore");
        }
    }
    static validateNumber(text: string, validationErrors: string[]) {
        const numberExpr: RegExp = /^.*[0-9].*$/;
        if (!numberExpr.test(text)) {
            validationErrors.push("password must have almost one number");
        }
    }
    static validateLowerCaseLetter(text: string, validationErrors: string[]) {
        const lowercaseExpr: RegExp = /^.*[a-z].*$/;
        if (!lowercaseExpr.test(text)) {
            validationErrors.push("password must have almost one lowercase letter");
        }
    }

    private static validateUpperCaseLetter(text: string, validationErrors: string[]) {
        const uppercaseExpr: RegExp = /^.*[A-Z].*$/;
        if (!uppercaseExpr.test(text)) {
            validationErrors.push("password must have almost one uppercase letter");
        }
    }

    private static validateLength(text: string, validationErrors: string[]) {
        if (text.length <= 6) {
            validationErrors.push("password lenght less than permited");
        }
    }
}
