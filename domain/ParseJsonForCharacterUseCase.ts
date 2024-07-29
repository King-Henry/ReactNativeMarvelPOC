import { ParsedCharacter } from "../data/ParsedCharacter";


export function parseJsonForCharacterUseCase(rawCharacter: any): ParsedCharacter {
    let characterId: number = rawCharacter.id;
    let characterName: string = rawCharacter.name;
    let thumbnailTuple: any = rawCharacter.thumbnail;
    let thumbnailPath: string = thumbnailTuple?.path;
    let thumbnailExtension: string = thumbnailTuple?.extension;
    let fullUrl: string = `${thumbnailPath}.${thumbnailExtension}`;
    let characterLink: string = rawCharacter.resourceURI;
    let characterComicCount: number = rawCharacter.comics?.available ?? 0
    let characterDescription: string | null = rawCharacter.description
    // console.log(`TIMMEH id:` + characterId)
    // console.log(`TIMMEH name` + characterName)
    // console.log(`TIMMEH fullUrl` + fullUrl)
    // console.log(`TIMMEH link` + characterLink)
    // console.log(`TIMMEH comicCount` + characterComicCount)
    // console.log(`TIMMEH description` + characterDescription)

    return {
        id: characterId,
        name: characterName,
        description: characterDescription,
        thumbnailUrl: fullUrl,
        characterLink: characterLink,
        comicCount: characterComicCount
    }
}


export {}