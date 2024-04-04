import { ValidationError } from "../../core/ValidationError";

class Password {

    private constructor(readonly text:string) {}

    static createFromPlainText(text: string): any {
        Password.validate(text);
        return new Password(text);
    }
    private static validate(text: string) {
        const validationErrors: string[] = [];
        Password.validateLength(text, validationErrors);
        Password.validateUpperCaseLetter(text, validationErrors);
        Password.validateLowerCaseLetter(text, validationErrors);
        Password.validateNumber(text, validationErrors);
        Password.validateUnderscore(text, validationErrors);
        if(validationErrors.length > 0) {
            throw new ValidationError(validationErrors.join(", "));
        }
    }
 

    static validateUnderscore(text: string, validationErrors: string[]) {
        const underscoreExpr: RegExp = /^.*_.*$/;
        if (!underscoreExpr.test(text)) {
            validationErrors.push("password must have almost one underscore.");
        }
    }
    static validateNumber(text: string, validationErrors: string[]) {
        const numberExpr: RegExp = /^.*[0-9].*$/;
        if (!numberExpr.test(text)) {
            validationErrors.push("password must have almost one number.");
        }
    }
    static validateLowerCaseLetter(text: string, validationErrors: string[]) {
        const lowercaseExpr: RegExp = /^.*[a-z].*$/;
        if (!lowercaseExpr.test(text)) {
            validationErrors.push("password must have almost one lowercase letter.");
        }
    }
   
    private static validateUpperCaseLetter(text: string, validationErrors: string[]) {
        const uppercaseExpr: RegExp = /^.*[A-Z].*$/;
        if (!uppercaseExpr.test(text)) {
            validationErrors.push("password must have almost one uppercase letter.");
        }
    }

    private static validateLength(text: string, validationErrors: string[]) {
        if (text.length <= 6) {
            validationErrors.push("password lenght less than permited.");
        }
    }
}
describe("The Password" , () => {
    it('createFromPlainTexts a strong password with all requirements', () => {
        expect(Password.createFromPlainText("SecurePass123_")).toBeInstanceOf(Password);
    })
    it('gets an error for an invalid length password',  () => {
        const sourcePassword = "Se23_";
        expect(() => Password.createFromPlainText(sourcePassword)).toThrow(new ValidationError("password lenght less than permited."));
    });
    it('gets an error for an invalid password with no uppercase letter',  () => {
        const sourcePassword = "secu23_";
        expect(() => Password.createFromPlainText(sourcePassword)).toThrow(new ValidationError("password must have almost one uppercase letter."));
    });
    it('gets an error for an invalid password with no lowecaser letter',  () => {
        const sourcePassword = "SECUREPASS123_";
        expect(() => Password.createFromPlainText(sourcePassword)).toThrow(new ValidationError("password must have almost one lowercase letter."));
    });
    it('gets an error for an invalid password with no numbers',  () => {
        const sourcePassword = "SecurePass_";
        expect(() => Password.createFromPlainText(sourcePassword)).toThrow(new ValidationError("password must have almost one number."));
    });
    it('gets an error for an invalid password with no underscore',  () => {
        const sourcePassword = "SecurePass123";
        expect(() => Password.createFromPlainText(sourcePassword)).toThrow(new ValidationError("password must have almost one underscore."));
    });
})


