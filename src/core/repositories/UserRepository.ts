import { User } from "../entities/User";
import { Email } from "../valuelObjects/Email";
import { Id } from "../valuelObjects/Id";

interface UserRepository {
    save(user: User): Promise<void>;
    findById(id: Id): Promise<User> | undefined;
    findByEmail(email: Email): Promise<User> | undefined;
    findAll(): Promise<User[]>;
    remove(user: User): Promise<void>;
}

export class InMemoryRepository implements UserRepository {
    private users: User[] = [];

    async save(user: User): Promise<void> {
        const index = this.users.findIndex(u => u.isEquals(user));
        const notFound = -1;
        
        (index === notFound)?
            this.users.push(user):
            this.users[index] = user;
        
        
    }
    async findById(id: Id): Promise<User> {
        return this.users.find(user => user.isMatchingId(id));
    }
    async findByEmail(email: Email): Promise<User> {
        return this.users.find(user => user.isMatchingEmail(email));
    }
    async findAll(): Promise<User[]> {
        return this.users;
    }
    async remove(user: User): Promise<void> {
       this.users = this.users.filter(userDB => !userDB.isEquals(user));
    }
    
}