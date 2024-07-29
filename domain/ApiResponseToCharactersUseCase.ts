import { ParsedCharacter } from "../data/ParsedCharacter";
import { parseJsonForCharacterUseCase } from "./ParseJsonForCharacterUseCase";


export function transformApiResponseToCharactersUseCase(data: any): ParsedCharacter[] {
    const results = data.data?.results
    if(!results) {
        return []
    }

    const characters: ParsedCharacter[] = []
    for(let result of results) {
        let parsedCharacter = parseJsonForCharacterUseCase(result)
        characters.push(parsedCharacter)
    }

    console.log("Api response has been transformed!");
    return characters
}