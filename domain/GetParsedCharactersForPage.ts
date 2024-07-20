import { useEffect, useState } from "react";
import { getCharacters } from "../data/MarvelApiService";
import { ParsedCharacter } from "../data/ParsedCharacter";
import { useApiResponseToCharactersUseCase } from "./ApiResponseToCharactersUseCase";
import { useSaveParsedCharactersToRealmUseCase } from "./SaveParsedCharactersToRealmUseCase";

export function useGetParsedCharactersForPage(page: number): boolean {
    const [success, setSuccess] = useState(true)
    useEffect(() => {
        const fetchAndSaveToRealm = async () => {
            try {
                const json: any = await getCharacters(20, 0)
                const parsedCharacters: ParsedCharacter[] = useApiResponseToCharactersUseCase(json)
                const success = useSaveParsedCharactersToRealmUseCase(parsedCharacters)
                setSuccess(success)
            } catch(error) {
                console.log(error)
                setSuccess(false)
            }
        }

        fetchAndSaveToRealm()
    }, [])
    
    return success
}