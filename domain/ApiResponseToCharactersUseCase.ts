import { ParsedCharacter } from "./ParsedCharacter";
import { useParseJsonForCharacterUseCase } from "./ParseJsonForCharacterUseCase";


export function useApiResponseToCharactersUseCase(data: any): ParsedCharacter[] {
    const results = data.data?.results
    if(!results) {
        return []
    }

    const characters: ParsedCharacter[] = []
    for(let result of results) {
        let parsedCharacter = useParseJsonForCharacterUseCase(result)
        characters.push(parsedCharacter)
    }

    return results
}