import { Realm, useObject } from "@realm/react";
import { MarvelCharacter } from "../data/MarvelCharacter";
import { ParsedCharacter } from "../data/ParsedCharacter";

export function saveParsedCharactersToRealmUseCase(remoteCharacters: ParsedCharacter[], realm: Realm): boolean {
    try {
        remoteCharacters.forEach((remoteCharacter) => {
            const existingObject = realm.objectForPrimaryKey(MarvelCharacter, remoteCharacter.id);
            console.log(`ExistingObject - ${!existingObject}`)
            if(!existingObject) {
                realm.write(() => {
                    console.log(`Writing character ${remoteCharacter.id} to db`)
                    realm.create<MarvelCharacter>(MarvelCharacter.realmName, 
                        {
                            _id: remoteCharacter.id,
                            name: remoteCharacter.name,
                            description: remoteCharacter.description,
                            thumbnailUrl: remoteCharacter.thumbnailUrl,
                            comicsCount: remoteCharacter.comicCount,
                            characterLink: remoteCharacter.characterLink
                        }
                    )
                })
            }
        })
        return true
    } catch(error) {
        console.log(`saveParsedCharactersToRealmUseCase() error -- ` + error)
        return false
    }
}