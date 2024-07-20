import { useObject, useRealm } from "@realm/react";
import { MarvelCharacter } from "../data/MarvelCharacter";
import { ParsedCharacter } from "../data/ParsedCharacter";

export function useSaveParsedCharactersToRealmUseCase(remoteCharacters: ParsedCharacter[]): boolean {
    const realm = useRealm();
    try {
        remoteCharacters.forEach((remoteCharacter) => {
            const existingObject = useObject(MarvelCharacter, remoteCharacter.id);
            if(!existingObject) {
                realm.write(() => {
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
        return false
    }
}