import { getCharacters } from "../data/MarvelApiService";
import { ParsedCharacter } from "../data/ParsedCharacter";
import { useApiResponseToCharactersUseCase } from "./ApiResponseToCharactersUseCase";
import { useSaveParsedCharactersToRealmUseCase } from "./SaveParsedCharactersToRealmUseCase";

export async function useGetParsedCharactersForPage(page: number): Promise<boolean> {
    try {
        const json: any = await getCharacters(20, 0)
        const parsedCharacters: ParsedCharacter[] = useApiResponseToCharactersUseCase(json)
        return useSaveParsedCharactersToRealmUseCase(parsedCharacters)
    } catch(error) {
        return false
    }
}