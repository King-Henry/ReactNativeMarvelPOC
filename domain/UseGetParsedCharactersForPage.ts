import { useEffect, useState } from "react";
import { getCharactersRemote } from "../data/ApiService";
import { ParsedCharacter } from "../data/ParsedCharacter";
import { useAnimeCharacterRepository } from "../data/CharacterRepository";
import { saveParsedCharactersToRealmUseCase } from "./SaveParsedCharactersToRealmUseCase";

export function useFetchAndStoreCharacters()  {
    const [result, setResult] = useState(GetParsedCharactersResult.Pending)
    const repository = useAnimeCharacterRepository()
    useEffect(() => {
        const fetchAndSaveToRealm = async () => {
            try {
                const parsedCharacters: ParsedCharacter[] = await getCharactersRemote(20, 0)
                const success = saveParsedCharactersToRealmUseCase(parsedCharacters, repository)
                const result = success ? GetParsedCharactersResult.Success : GetParsedCharactersResult.Failure
                setResult(result)
            } catch(error) {
                console.log(`GetParsedCharactersForPage() error -- ` + error)
                setResult(GetParsedCharactersResult.Failure)
            }
        }

        fetchAndSaveToRealm()
    }, [])
    
    // console.log(`Was successful?? - ${success}`)
    return { result }
}

export enum GetParsedCharactersResult {
    Success,
    Failure,
    Pending
}