import { ParsedCharacter } from "./ParsedCharacter";


export function useParseJsonForCharacterUseCase(rawCharacter: any): ParsedCharacter {
    let characterId: number = rawCharacter.id;
    let characterName: string = rawCharacter.name;
    let thumbnailTuple: any = rawCharacter.thumbnail;
    let thumbnailPath: string = thumbnailTuple?.path;
    let thumbnailExtension: string = thumbnailTuple?.extension;
    let fullUrl: string = thumbnailPath + thumbnailExtension;
    let characterLink: string = rawCharacter.resourceURI;
    let characterComicCount: number = rawCharacter.comics?.available ?? 0
    let characterDescription: string | null= rawCharacter.description

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