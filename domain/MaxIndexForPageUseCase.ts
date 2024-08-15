import { Results } from "realm"
import { AnimeCharacter } from "../data/AnimeCharacter"


export function maxIndexForPageUseCase(queryResults: Results<AnimeCharacter>, pageSize: number, page: number): number {
    const resultCount = queryResults.length
    if(!resultCount) { // if resultCount is 0, undefined, or null
        // console.log("Returning 0")
        return 0
    }

    const numOfPages = Math.ceil(resultCount / pageSize)
    const currentPage = page
    console.log("Num of pages " + numOfPages)
    console.log("Current page " + currentPage)
    if(currentPage === numOfPages) {
        return resultCount
    } else {
        return pageSize * currentPage
    }
}