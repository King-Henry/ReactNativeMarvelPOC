import { buildApiUrlUseCase } from "../domain/BuildApiUrlUseCase"
import { transformApiResponseToCharactersUseCase } from "../domain/TransformApiResponseToCharactersUseCase"
import { ParsedCharacter } from "./ParsedCharacter"

export async function getCharactersRemote(limit: number, offset: number): Promise<ParsedCharacter[]> {
    return fetch(buildApiUrlUseCase(limit, offset))
        .then(res => {
            console.log("Api call successful")
            return res.json()
        }).then(
            json => transformApiResponseToCharactersUseCase(json)
        )
}