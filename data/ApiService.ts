import { buildUrl } from "../domain/ApiUrlBuilder"
import { transformApiResponseToCharactersUseCase } from "../domain/TransformApiResponseToCharactersUseCase"
import { ParsedCharacter } from "./ParsedCharacter"

export async function getCharactersRemote(limit: number, offset: number): Promise<ParsedCharacter[]> {
    return fetch(buildUrl(limit, offset))
        .then(res => {
            console.log("Api call successful")
            return res.json()
        }).then(
            json => transformApiResponseToCharactersUseCase(json)
        )
}