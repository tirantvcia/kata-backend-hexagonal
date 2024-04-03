import { ValidationError } from "../../core/ValidationError";

class Password {

    private constructor(readonly text:string) {}

    static createFromPlainText(text: string): any {
        Password.validate(text);
        return new Password(text);
    }
    private static validate(text: string) {
        Password.validateLength(text);
        Password.validateUpperCaseLetter(text);
        Password.validateLowerCaseLetter(text);
        Password.validateNumber(text);
        Password.validateUnderscore(text);
    }

    static validateUnderscore(text: string) {
        const underscoreExpr: RegExp = /^.*_.*$/;
        if (!underscoreExpr.test(text)) {
            throw new ValidationError("password must have almost one underscore.");
        }
    }
    static validateNumber(text: string) {
        const numberExpr: RegExp = /^.*[0-9].*$/;
        if (!numberExpr.test(text)) {
            throw new ValidationError("password must have almost one number.");
        }
    }
    static validateLowerCaseLetter(text: string) {
        const lowercaseExpr: RegExp = /^.*[a-z].*$/;
        if (!lowercaseExpr.test(text)) {
            throw new ValidationError("password must have almost one lowercase letter.");
        }
    }
   
    private static validateUpperCaseLetter(text: string) {
        const uppercaseExpr: RegExp = /^.*[A-Z].*$/;
        if (!uppercaseExpr.test(text)) {
            throw new ValidationError("password must have almost one uppercase letter.");
        }
    }

    private static validateLength(text: string) {
        if (text.length <= 6) {
            throw new ValidationError("password lenght less than permited.");
        }
    }
}
describe("The Password" , () => {
    it('createFromPlainTexts a strong password with all requirements', () => {
        expect(Password.createFromPlainText("SecurePass123_")).toBeInstanceOf(Password);
    })
    it('gets an error for an invalid length password',  () => {
        const sourcePassword = "InSecu";
        expect(() => Password.createFromPlainText(sourcePassword)).toThrow(new ValidationError("password lenght less than permited."));
    });
    it('gets an error for an invalid password with no uppercase letter',  () => {
        const sourcePassword = "insecure";
        expect(() => Password.createFromPlainText(sourcePassword)).toThrow(new ValidationError("password must have almost one uppercase letter."));
    });
    it('gets an error for an invalid password with no lowecaser letter',  () => {
        const sourcePassword = "INSECURE";
        expect(() => Password.createFromPlainText(sourcePassword)).toThrow(new ValidationError("password must have almost one lowercase letter."));
    });
    it('gets an error for an invalid password with no numbers',  () => {
        const sourcePassword = "INSeCURE";
        expect(() => Password.createFromPlainText(sourcePassword)).toThrow(new ValidationError("password must have almost one number."));
    });
    it('gets an error for an invalid password with no underscore',  () => {
        const sourcePassword = "INs3CURE";
        expect(() => Password.createFromPlainText(sourcePassword)).toThrow(new ValidationError("password must have almost one underscore."));
    });
})