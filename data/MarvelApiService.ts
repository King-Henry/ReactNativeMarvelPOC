import { buildUrl } from "../domain/ApiUrlBuilder"

export async function getCharacters(limit: number, offset: number): Promise<any> {
    return fetch(buildUrl(limit, offset))
        .then(res => res.json())
}