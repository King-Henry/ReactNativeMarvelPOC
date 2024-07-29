import { useRealm } from "@realm/react";
import { useEffect, useState } from "react";
import { getCharacters } from "../data/MarvelApiService";
import { ParsedCharacter } from "../data/ParsedCharacter";
import { transformApiResponseToCharactersUseCase } from "./ApiResponseToCharactersUseCase";
import { saveParsedCharactersToRealmUseCase } from "./SaveParsedCharactersToRealmUseCase";

export function getParsedCharactersForPage(page: number): boolean {
    const [success, setSuccess] = useState(true)
    const realm = useRealm()
    useEffect(() => {
        const fetchAndSaveToRealm = async () => {
            try {
                const json: any = await getCharacters(20, 0)
                const parsedCharacters: ParsedCharacter[] = transformApiResponseToCharactersUseCase(json)
                const success = saveParsedCharactersToRealmUseCase(parsedCharacters, realm)
                setSuccess(success)
            } catch(error) {
                console.log(`GetParsedCharactersForPage() error -- ` + error)
                setSuccess(false)
            }
        }

        fetchAndSaveToRealm()
    }, [])
    
    console.log(`Was successful?? - ${success}`)
    return success
}