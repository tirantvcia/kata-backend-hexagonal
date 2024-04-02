export class Email {

    private constructor (readonly email: string) {}
    static create(email:string): Email {
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if(!expression.test(email)) {
            throw new Error("email with invalid format");    
        }
        return new Email(email);
        
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
    });
});
