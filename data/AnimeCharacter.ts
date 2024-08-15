import { ObjectSchema } from "realm/dist/public-types/schema";
import Realm from "realm";
import { LocalModel } from "./LocalModel";

export class AnimeCharacter extends LocalModel<AnimeCharacter> {
    _id!: number;
    name!: string;
    fullImage!: string | null;
    thumbnailImage!: string

    getType(): string {
        return AnimeCharacter.realmName
    }

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