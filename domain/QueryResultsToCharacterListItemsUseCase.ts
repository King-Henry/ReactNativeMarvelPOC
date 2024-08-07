import { Results } from "realm";
import { AnimeCharacter } from "../data/AnimeCharacter";
import { CharacterListUiItem } from "../ui/CharacterListUiItem";
import { characterToListItemUseCase } from "./CharacterToListUiItemUseCase"

export function queryResultsToCharacterListItemsUseCase(
        results: Results<AnimeCharacter>, 
        startingItem: number = 0, 
        endingItem: number = results.length - 1// actual index
    ): CharacterListUiItem[] {
    // console.log("ENDING ITEM: " + endingItem)
    // benchmarkFirstItemFetch(results)
    const toReturn = []
    const actualEndingItem = endingItem > results.length ? results.length : endingItem
    for(let i = startingItem; i <= actualEndingItem; i++) {
        const model = results[i]
        if(model === undefined) {
            continue;
        }
        const listItem = characterToListItemUseCase(model)
        toReturn.push(listItem)
    }
    
    return toReturn
}

function benchmarkFirstItemFetch(results: Results<AnimeCharacter>) {
    const start = performance.now();
    const item = results[0]
    console.log(JSON.stringify(item))
    const end = performance.now()
    console.log(end - start)
}