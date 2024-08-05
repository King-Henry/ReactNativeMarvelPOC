import { useRealm } from "@realm/react";
import { useEffect, useState } from "react";
import { getCharacters } from "../data/ApiService";
import { ParsedCharacter } from "../data/ParsedCharacter";
import { transformApiResponseToCharactersUseCase } from "./ApiResponseToCharactersUseCase";
import { prefetchCharacterImagesUseCase } from "./PrefetchCharacterImagesUseCase";
import { saveParsedCharactersToRealmUseCase } from "./SaveParsedCharactersToRealmUseCase";

export function getParsedCharacters(): boolean {
    const [success, setSuccess] = useState(true)
    const realm = useRealm()
    useEffect(() => {
        const fetchAndSaveToRealm = async () => {
            try {
                const json: any = await getCharacters(20, 0)
                const parsedCharacters: ParsedCharacter[] = transformApiResponseToCharactersUseCase(json)
                // await prefetchCharacterImagesUseCase(parsedCharacters)
                const success = saveParsedCharactersToRealmUseCase(parsedCharacters, realm)
                setSuccess(success)
            } catch(error) {
                console.log(`GetParsedCharactersForPage() error -- ` + error)
                setSuccess(false)
            }
        }

        fetchAndSaveToRealm()
    }, [])
    
    // console.log(`Was successful?? - ${success}`)
    return success
}