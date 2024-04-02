import { Email } from "../../core/Email";
import { ValidationError } from "../../core/ValidationError";

describe('The Email', () => {
    it('get an exception for an invalid email from string',  () => {
        const sourceEmail = "jose.gimeno.msn.com";
        expect(() => Email.create(sourceEmail)).toThrow(new ValidationError("email with invalid format"));
    });
    it('get a valid email from string',  () => {
        const sourceEmail = "jose.gimeno@msn.com";
        const email: Email = Email.create(sourceEmail);
        expect(email).not.toBeNull();
        expect(email).toBeInstanceOf(Email);
        expect(email.toString()).toEqual(sourceEmail);
    });
    it('check if two emails are equals',  () => {
        const sourceEmail = "jose.gimeno@msn.com";
        const email1: Email = Email.create(sourceEmail);
        const email2: Email = Email.create(sourceEmail);


        expect(email1.equals(email2)).toBeTruthy();
    });
    it('check if two emails not are equals',  () => {
        const sourceEmail1 = "jose.p.gimeno@msn.com";
        const sourceEmail2 = "jose.gimeno@msn.com";
        const email1: Email = Email.create(sourceEmail1);
        const email2: Email = Email.create(sourceEmail2);


        expect(email1.equals(email2)).toBeFalsy();
    });
});
