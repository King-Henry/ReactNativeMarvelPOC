import { Md5 } from "ts-md5"
import 'react-native-url-polyfill'

const BASE_API = "https://narutodb.xyz"
const CHARACTERS_ENDPOINT = "/api/character"
// const PRIVATE_KEY = "b731efcb4a8383c43f42b023505e305cee65c382"
// const PUBLIC_KEY = "e2419bfb679902f52b4d1d2bd98806ad"


export function buildUrl(limit: number, offset: number): URL {
    // let timeStamp = Date.now().toString();
    let url = new URL(CHARACTERS_ENDPOINT, BASE_API);
    let queryParams = {
        page: "1",
        limit: "1429"
    }
    let params = new URLSearchParams(queryParams)
    url.search = params.toString()
    console.log(`Our endpoint: ` + url.toString())
    return url
}

// function buildHash(timeStamp: string): string {
//     let md5 = new Md5();
//     md5
//         .appendStr(timeStamp.toString())
//         .appendStr(PRIVATE_KEY)
//         .appendStr(PUBLIC_KEY)
//     return md5.end(false) as string
// }