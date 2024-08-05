import { Realm } from "realm"
import { ObjectSchema } from "realm/dist/public-types/schema";

export class AnimeCharacter extends Realm.Object<AnimeCharacter> {
    _id!: number;
    name!: string;
    image!: string | null;

    static realmName = "AnimeCharacter"

    static schema: ObjectSchema = {
        name: this.realmName,
        properties: {
            _id: 'int',
            name: 'string',
            image: 'string?'
        },
        primaryKey: '_id',
    }
}