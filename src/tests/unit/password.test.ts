import { ValidationError } from "../../core/ValidationError";
import { Password } from "../../core/Password";

describe("The Password" , () => {
    it('createFromPlainTexts a strong password with all requirements', () => {
        expect(Password.createFromPlainText("SecurePass123_")).toBeInstanceOf(Password);
    })
    it('gets an error for an invalid length password',  () => {
        const sourcePassword = "Se23_";
        expect(() => Password.createFromPlainText(sourcePassword)).toThrow(new ValidationError("password lenght less than permited"));
    });
    it('gets an error for an invalid password with no uppercase letter',  () => {
        const sourcePassword = "secu23_";
        expect(() => Password.createFromPlainText(sourcePassword)).toThrow(new ValidationError("password must have almost one uppercase letter"));
    });
    it('gets an error for an invalid password with no lowecaser letter',  () => {
        const sourcePassword = "SECUREPASS123_";
        expect(() => Password.createFromPlainText(sourcePassword)).toThrow(new ValidationError("password must have almost one lowercase letter"));
    });
    it('gets an error for an invalid password with no numbers',  () => {
        const sourcePassword = "SecurePass_";
        expect(() => Password.createFromPlainText(sourcePassword)).toThrow(new ValidationError("password must have almost one number"));
    });
    it('gets an error for an invalid password with no underscore',  () => {
        const sourcePassword = "SecurePass123";
        expect(() => Password.createFromPlainText(sourcePassword)).toThrow(new ValidationError("password must have almost one underscore"));
    });
    it('gets several errors for an invalid password',  () => {
        const sourcePassword = "SecurePass";
        expect(() => Password.createFromPlainText(sourcePassword)).toThrow(new ValidationError("password must have almost one number, password must have almost one underscore"));
    });
})


