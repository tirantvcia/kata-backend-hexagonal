import { User } from "../../../core/entities/User";
import { InMemoryRepository } from "../../../core/repositories/UserRepository";
import { Email } from "../../../core/valuelObjects/Email";
import { Id } from "../../../core/valuelObjects/Id"
import { Password } from "../../../core/valuelObjects/Password";

describe('Te in memory user repository', () => {
    it('finds an user by id', async () => {
        const id = Id.generate();
        const user = createUserById(id);
        const userRepository: InMemoryRepository = new InMemoryRepository();
        userRepository.save(user);
        const userFromBBDD = await userRepository.findById(id);
        expect(userFromBBDD).toBe(user);
        
    })
    it('does not find a non existing user by id', async () => {
        const id = Id.generate();
        const userRepository: InMemoryRepository = new InMemoryRepository();
        const userFromBBDD = await userRepository.findById(id);
        expect(userFromBBDD).toBe(undefined);
        
    })
    it('finds an user by email', async () => {
        const email = Email.create('test@hexagonal.com');
        const user = createUserByEmail(email);
        const userRepository: InMemoryRepository = new InMemoryRepository();
        userRepository.save(user);
        const userFromBBDD = await userRepository.findByEmail(email);
        expect(userFromBBDD).toBe(user);
        
    })
    it('does not find a non existing user by email', async () => {
        const email = Email.create('test@hexagonal.com');
        const userRepository: InMemoryRepository = new InMemoryRepository();
        const userFromBBDD = await userRepository.findByEmail(email);
        expect(userFromBBDD).toBe(undefined);
    })
    it('finds all users by email', async () => {
        const email = Email.create('test@hexagonal.com');
        const user = createUserByEmail(email);
        const anotherEmail = Email.create('test1@hexagonal.com');
        const anotherUser = createUserByEmail(anotherEmail);
        const userRepository: InMemoryRepository = new InMemoryRepository();
        userRepository.save(user);
        userRepository.save(anotherUser);
        const usersFromBBDD = await userRepository.findAll();
        expect(usersFromBBDD).toHaveLength(2);
        expect(usersFromBBDD).toEqual([user, anotherUser]);
        
    })
})

function createUserById(id: Id) {
    const passowrd = Password.createFromPlainText('h5G23M_il');
    const email = Email.create('test@hexagonal.com');
    const user = new User(id, email, passowrd);
    return user;
}
function createUserByEmail(email: Email) {
    const id = Id.generate();
    const passowrd = Password.createFromPlainText('h5G23M_il');
    const user = new User(id, email, passowrd);
    return user;
}