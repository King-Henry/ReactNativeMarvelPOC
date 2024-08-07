import { Realm } from "realm"
import { ObjectSchema } from "realm/dist/public-types/schema";

export class AnimeCharacter extends Realm.Object<AnimeCharacter> {
    _id!: number;
    name!: string;
    fullImage!: string | null;
    thumbnailImage!: string

    static realmName = "AnimeCharacter"

    static schema: ObjectSchema = {
        name: this.realmName,
        properties: {
            _id: 'int',
            name: 'string',
            fullImage: 'string?',
            thumbnailImage: 'string'
        },
        primaryKey: '_id',
    }
}