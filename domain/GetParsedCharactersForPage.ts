import { useEffect, useState } from "react";
import { getCharacters } from "../data/ApiService";
import { ParsedCharacter } from "../data/ParsedCharacter";
import { transformApiResponseToCharactersUseCase } from "./ApiResponseToCharactersUseCase";
import { useAnimeCharacterRepository } from "./CharacterRepository";
import { saveParsedCharactersToRealmUseCase } from "./SaveParsedCharactersToRealmUseCase";

export function useGetParsedCharacters()  {
    const [success, setSuccess] = useState(true)
    const [finished, setFinished] = useState(false)
    const repository = useAnimeCharacterRepository()
    useEffect(() => {
        const fetchAndSaveToRealm = async () => {
            try {
                const json: any = await getCharacters(20, 0)
                const parsedCharacters: ParsedCharacter[] = transformApiResponseToCharactersUseCase(json)
                // await prefetchCharacterImagesUseCase(parsedCharacters)
                const success = saveParsedCharactersToRealmUseCase(parsedCharacters, repository)
                setSuccess(success)
            } catch(error) {
                console.log(`GetParsedCharactersForPage() error -- ` + error)
                setSuccess(false)
            }
            setFinished(true)
        }

        fetchAndSaveToRealm()
    }, [])
    
    // console.log(`Was successful?? - ${success}`)
    return { success, finished }
}