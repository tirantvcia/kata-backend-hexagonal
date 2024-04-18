import { User } from "../../../core/entities/User";
import { InMemoryRepository } from "../../../core/repositories/UserRepository";
import { Email } from "../../../core/valuelObjects/Email";
import { Id } from "../../../core/valuelObjects/Id"
import { Password } from "../../../core/valuelObjects/Password";

describe('Te in memory user repository', () => {
    it('finds an user by id', async () => {
       
        const id = Id.generate();
        const user = createUser(id);
        const userRepository: InMemoryRepository = new InMemoryRepository();
        userRepository.save(user);
        const userFromBBDD = await userRepository.findById(id);
        expect(userFromBBDD).toBe(user);
        
    })
    it('finds an user by id', async () => {
       
        const id = Id.generate();
        const user = createUser(id);
        const userRepository: InMemoryRepository = new InMemoryRepository();
        userRepository.save(user);
        const userFromBBDD = await userRepository.findById(id);
        expect(userFromBBDD).toBe(user);
        
    })
})

function createUser(id: Id) {
    const passowrd = Password.createFromPlainText('h5G23M_il');
    const email = Email.create('test@hexagonal.com');
    const user = new User(id, email, passowrd);
    return user;
}
