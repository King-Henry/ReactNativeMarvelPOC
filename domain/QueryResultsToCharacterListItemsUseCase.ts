import { Results } from "realm";
import { MarvelCharacter } from "../data/MarvelCharacter";
import { CharacterListUiItem } from "../ui/CharacterListUiItem";
import { marvelCharacterToListItemUseCase } from "./MarvelCharacterToListUiItemUseCase"

export function queryResultsToCharacterListItemsUseCase(
        results: Results<MarvelCharacter>, 
        startingItem: number = 0, 
        endingItem: number = results.length - 1// actual index
    ): CharacterListUiItem[] {
    const toReturn = []
    const actualEndingItem = endingItem > results.length ? results.length : endingItem
    for(let i = startingItem; i <= actualEndingItem; i++) {
        const model = results[i]
        if(model === undefined) {
            continue;
        }
        const listItem = marvelCharacterToListItemUseCase(model)
        toReturn.push(listItem)
    }
    return toReturn
}