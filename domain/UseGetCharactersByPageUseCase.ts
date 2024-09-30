import {Results} from 'realm';
import {AnimeCharacter} from '../data/AnimeCharacter';
import {useAnimeCharacterDataStore} from '../data/CharacterDataStore';

export function useGetCharactersUseCase() {
  console.log('GETTING CHARACTERS');
  const charactersDataStore = useAnimeCharacterDataStore();
  const query: Results<AnimeCharacter> = charactersDataStore.getAll();

  return {query};
}
