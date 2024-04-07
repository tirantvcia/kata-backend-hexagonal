import { v4 as uuidv4 } from 'uuid';


export function generateUuuid(): string {
    return uuidv4();
}
