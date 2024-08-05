import { ParsedCharacter } from "../data/ParsedCharacter";


export function parseJsonForCharacterUseCase(rawCharacter: any): ParsedCharacter {
    let characterId: number = rawCharacter.id;
    let characterName: string = rawCharacter.name;
    let characterImage: string  = rawCharacter.images[0] ?? null
    // console.log(`TIMMEH id:` + characterId)
    // console.log(`TIMMEH name` + characterName)
    // console.log(`TIMMEH fullUrl` + fullUrl)
    // console.log(`TIMMEH link` + characterLink)
    // console.log(`TIMMEH comicCount` + characterComicCount)
    // console.log(`TIMMEH description` + characterDescription)

    return {
        id: characterId,
        name: characterName,
        image: characterImage
    }
}


export {}