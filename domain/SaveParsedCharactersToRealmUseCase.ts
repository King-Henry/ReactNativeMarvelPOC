import { Realm, useObject } from "@realm/react";
import { AnimeCharacter } from "../data/AnimeCharacter";
import { ParsedCharacter } from "../data/ParsedCharacter";

export function saveParsedCharactersToRealmUseCase(remoteCharacters: ParsedCharacter[], realm: Realm): boolean {
    try {
        remoteCharacters.forEach((remoteCharacter) => {
            const existingObject = realm.objectForPrimaryKey(AnimeCharacter, remoteCharacter.id);
            // console.log(`ExistingObject - ${!existingObject}`)
            if(!existingObject) {
                realm.write(() => {
                    // console.log(`Writing character ${remoteCharacter.id} to db`)
                    realm.create<AnimeCharacter>(AnimeCharacter.realmName, 
                        {
                            _id: remoteCharacter.id,
                            name: remoteCharacter.name,
                            fullImage: remoteCharacter.fullImage,
                            thumbnailImage: remoteCharacter.thumbnailImage
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