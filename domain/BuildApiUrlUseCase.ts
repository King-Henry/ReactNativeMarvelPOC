import 'react-native-url-polyfill'

const BASE_API = "https://narutodb.xyz"
const CHARACTERS_ENDPOINT = "/api/character"

export function buildApiUrlUseCase(limit: number, offset: number): URL {
    let url = new URL(CHARACTERS_ENDPOINT, BASE_API);
    let queryParams = {
        page: offset.toString(),
        limit: limit.toString(),
    }
    let params = new URLSearchParams(queryParams)
    url.search = params.toString()
    console.log(`Our endpoint: ` + url.toString())
    return url
}