import { Realm } from "realm"
import { ObjectSchema } from "realm/dist/public-types/schema";

export class MarvelCharacter extends Realm.Object<MarvelCharacter> {
    _id!: number;
    name!: string;
    description?: string;
    thumbnailUrl!: string;
    comicsCount!: number;
    characterLink!: string

    static realmName = "MarvelCharacter"

    static schema: ObjectSchema = {
        name: this.realmName,
        properties: {
            _id: 'int',
            name: 'string',
            description: 'string?',
            thumbnailUrl: 'string',
            comicsCount: 'int',
            characterLink: 'string'
        },
        primaryKey: '_id',
    }
}