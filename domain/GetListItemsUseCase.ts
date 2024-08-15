import { Results } from "realm";
import { AnimeCharacter } from "../data/AnimeCharacter";
import { CharacterListUiItem } from "../ui/CharacterListUiItem";
import { maxIndexForPageUseCase } from "./MaxIndexForPageUseCase";
import { queryResultsToCharacterListItemsUseCase } from "./QueryResultsToCharacterListItemsUseCase";


export function getListItemsUseCase(allResults: Results<AnimeCharacter>, startingIndex: number, listItemCount: number,  pageSize: number, page: number): CharacterListUiItem[] {
    const reachedMaxCount = listItemCount === allResults?.length
    if(!allResults || reachedMaxCount) {
        return [];
    }

    const maxItemToGrab = maxIndexForPageUseCase(allResults, pageSize, page)
    // console.log("getNextPage() - SENDING NEW ITEMS")
    return queryResultsToCharacterListItemsUseCase(allResults, startingIndex, maxItemToGrab)
    
    
}