import { Realm, useObject } from "@realm/react";
import { AnimeCharacter } from "../data/AnimeCharacter";
import { ParsedCharacter } from "../data/ParsedCharacter";
import { Repository } from "./CharacterRepository";

export function saveParsedCharactersToRealmUseCase(remoteCharacters: ParsedCharacter[], repository: Repository<AnimeCharacter>): boolean {
    try {
        remoteCharacters.forEach((remoteCharacter) => {
            const existingObject = repository.get(remoteCharacter.id);
            // console.log(`ExistingObject - ${!existingObject}`)
            if(!existingObject) {
                repository.create({
                    _id: remoteCharacter.id,
                    name: remoteCharacter.name,
                    fullImage: remoteCharacter.fullImage,
                    thumbnailImage: remoteCharacter.thumbnailImage
                })
            }
        })
        return true
    } catch(error) {
        console.log(`saveParsedCharactersToRealmUseCase() error -- ` + error)
        return false
    }
}