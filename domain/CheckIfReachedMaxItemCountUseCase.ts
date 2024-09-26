import { Results } from "realm"
import { AnimeCharacter } from "../data/AnimeCharacter"


export function checkIfReachedMaxItemCountUseCase(listItemCount: number, allResults: Results<AnimeCharacter> | null): boolean {
    const reachedMaxCount = listItemCount === allResults?.length
    return reachedMaxCount
}