import { Realm } from "realm"
import { ObjectSchema } from "realm/dist/public-types/schema";

export class MarvelCharacter extends Realm.Object<MarvelCharacter> {
    _id!: number;
    name!: string;
    description?: string;
    thumbnailUrl!: string;
    comicsCount!: number;
    characterLink!: string

    static schema: ObjectSchema = {
        name: 'MarvelCharacter',
        properties: {
            _id: 'number',
            name: 'string',
            description: 'string?',
            thumbnailUrl: 'string',
            comicsCount: 'number',
            characterLink: 'string'
        },
        primaryKey: '_id',
    }
}