export class ValidationError extends Error {}

export class Email {

    private constructor (readonly email: string) {}
    static create(email:string): Email {
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
describe('The Email', () => {
    it('get an exception for an invalid email from string',  () => {
        const sourceEmail = "jose.gimeno.msn.com";
        expect(() => Email.create(sourceEmail)).toThrow(new Error("email with invalid format"));
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
