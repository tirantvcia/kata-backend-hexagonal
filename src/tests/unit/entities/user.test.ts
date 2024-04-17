import { Email } from "../../../core/valuelObjects/Email";
import { Id } from "../../../core/valuelObjects/Id"
import { Password } from "../../../core/valuelObjects/Password";
import { ValidationError } from "../../../core/valuelObjects/ValidationError";
import { User } from "../../../core/entities/User";

describe('The User', () => {
    it('cnangess the passowrd when a different one is provided', () => {
        const initialPassowrd = Password.createFromPlainText('h5G23M_il')
        const user = createUser(initialPassowrd);
        const newPassword = Password.createFromPlainText('kkG23Mil_');
        user.changePassword(newPassword);
        expect(user.isMatchingPassword(newPassword)).toBeTruthy();

    })
    it('does not cnangess the passowrd when a equals one is provided', () => {
        const initialPassowrd = Password.createFromPlainText('h5G23M_il')
        const user = createUser(initialPassowrd);
        expect(() =>  user.changePassword(initialPassowrd)).toThrow(new ValidationError("new password is the same as current"));

    })
})

function createUser( passowrd: Password) {
    const id = Id.generate();
    const email = Email.create('test@hexagonal.com');
    const user = new User(id, email, passowrd);
    return user;
}
