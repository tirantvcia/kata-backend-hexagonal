import { ValidationError } from "../../../core/valuelObjects/ValidationError";
import { Password } from "../../../core/valuelObjects/Password";

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
    it('ensure that password is hashed',  () => {
        const sourcePassword = "SecurePass1_";
        const password:Password = Password.createFromPlainText(sourcePassword);

        const hashedPassword = password.toString();
        expect(hashedPassword).not.toEqual(sourcePassword);
        expect(hashedPassword.length).toEqual(64);
        expect(/^[a-f-F0-9]{64}$/.test(hashedPassword)).toBeTruthy();
    });

    it('matches if two passwords are equals',  () => {
        const sourcePassword = "SecurePass1_";
        const password1:Password = Password.createFromPlainText(sourcePassword);
        const password2:Password = Password.createFromPlainText(sourcePassword);


        expect(password1.isEqual(password2)).toBeTruthy();
    });
    it('does not match if two passwords are different',  () => {
        const sourcePassword1 = "SecurePass1_";
        const sourcePassword2 = "SecurePass2_";
        const password1:Password = Password.createFromPlainText(sourcePassword1);
        const password2:Password = Password.createFromPlainText(sourcePassword2);

        expect(password1.isEqual(password2)).toBeFalsy();
    });
})



