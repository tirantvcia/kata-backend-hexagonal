import { ValidationError } from './ValidationError';
import { generateUuuid } from '../common/generateUuuid';


export class Id {

    private constructor(readonly uuid: string) { }
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
        if (isNotValidFormat) {
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
