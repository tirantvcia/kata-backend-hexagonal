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
        this.users.push(user);
        return Promise.resolve(); 
    }
    async findById(id: Id): Promise<User> {
        return this.users.find(user => user.isMatchingId(id));
    }
    async findByEmail(email: Email): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    async remove(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}