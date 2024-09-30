import {AnimeCharacter} from '../data/AnimeCharacter';
import {ParsedCharacter} from '../data/ParsedCharacter';

export function saveParsedCharactersToRealmUseCase(
  create: (character: AnimeCharacter | Partial<AnimeCharacter>) => boolean,
  get: (id: number) => AnimeCharacter | null,
  remoteCharacters: ParsedCharacter[],
): boolean {
  remoteCharacters.forEach(remoteCharacter => {
    const existingObject = get(remoteCharacter.id);
    if (!existingObject) {
      create({
        _id: remoteCharacter.id,
        name: remoteCharacter.name,
        fullImage: remoteCharacter.fullImage,
        thumbnailImage: remoteCharacter.thumbnailImage,
      });
    }
  });
  return true;
}
