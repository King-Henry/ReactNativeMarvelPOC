import { AnimeCharacter } from "../data/AnimeCharacter";
import { CharacterDetailUiModel } from "./CharacterDetailUiModel";

export function transformCharacterToCharacterDetailUi(character: AnimeCharacter): CharacterDetailUiModel {
    return {
        name: character.name,
        fullImage: character.fullImage,
        id: character._id
    };
}