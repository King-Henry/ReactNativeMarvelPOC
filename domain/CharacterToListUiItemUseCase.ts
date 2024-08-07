import { AnimeCharacter } from "../data/AnimeCharacter";
import { CharacterListUiItem } from "../ui/CharacterListUiItem";


export function characterToListItemUseCase(model: AnimeCharacter): CharacterListUiItem {
    return {
        id: model._id,
        name: model.name,
        thumbnailUrl: model.thumbnailImage! // Doing this to have smaller sized thumbnail images
    }
}

