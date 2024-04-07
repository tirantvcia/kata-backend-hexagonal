import {v4 as uuidv4} from 'uuid';
import { ValidationError } from '../../core/ValidationError';

export function generateUuuid(): string {
    return uuidv4();
}

export class Id {

    private constructor(readonly uuid: string){}
    public static generate() {
        return new Id(generateUuuid());
    }
    public static createFrom(id: string) {
        Id.validateUuidFormat(id);
        return new Id(id);
    }
    private static validateUuidFormat(id: string) {
        const regex: RegExp = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/;
        const isNotValidFormat = !regex.test(id.toString());
        if(isNotValidFormat) {
            throw new ValidationError("id must have a valid format");
        }
    }
    public toString() {
        return this.uuid;
    }
    isEqual(id: Id): boolean {
        return this.uuid === id.toString();
    }
}
describe('The Id', () => {
    it('generate a valid identifier', () => {
        const id = Id.generate();
        expectThatIdHasUuidFormat(id);
    })
    it('creates an Id from a valid identifier', () => {
        const validId = generateUuuid();
        const id = Id.createFrom(validId);
        expectThatIdHasUuidFormat(id);
        expect(id.toString()).toBe(validId);
    })
    it('does not creates an Id from a invalid identifier', () => {
        const invalidId = 'inv-vali-id';
        expect(() => Id.createFrom(invalidId)).toThrow(new ValidationError("id must have a valid format"));
    })
    it('identifies two identical ids as equals', () => {
        const validId = generateUuuid();
        const id1 = Id.createFrom(validId);
        const id2 = Id.createFrom(validId);
        expect(id1.isEqual(id2)).toBe(true);
    })    
    it('identifies two different ids as not equals', () => {
        const id1 = Id.generate();
        const id2 = Id.generate();
        expect(id1.isEqual(id2)).toBe(false);
    })   
})


function expectThatIdHasUuidFormat(id: Id) {
    const regex: RegExp = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/;
    expect(regex.test(id.toString())).toBeTruthy();
}

