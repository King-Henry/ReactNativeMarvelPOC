import { MarvelCharacter } from "../data/MarvelCharacter";
import { CharacterListUiItem } from "../ui/CharacterListUiItem";

export function marvelCharacterToListItemUseCase(model: MarvelCharacter): CharacterListUiItem {
    return {
        id: model._id,
        name: model.name,
        thumbnailUrl: model.thumbnailUrl
    }
}