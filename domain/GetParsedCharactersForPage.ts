import {useEffect, useState} from 'react';
import {getCharacters} from '../data/ApiService';
import {ParsedCharacter} from '../data/ParsedCharacter';
import {useAnimeCharacterDataStore} from '../data/CharacterDataStore';
import {saveParsedCharactersToRealmUseCase} from './SaveParsedCharactersToRealmUseCase';

export function useGetParsedCharacters() {
  const [result, setResult] = useState(GetParsedCharactersResult.Pending);
  const repository = useAnimeCharacterDataStore();
  useEffect(() => {
    const fetchAndSaveToRealm = async () => {
      try {
        const parsedCharacters: ParsedCharacter[] = await getCharacters(20, 0);
        // const parsedCharacters: ParsedCharacter[] = transformApiResponseToCharactersUseCase(json)
        // await prefetchCharacterImagesUseCase(parsedCharacters)
        const success = saveParsedCharactersToRealmUseCase(
          parsedCharacters,
          repository,
        );
        setResult(GetParsedCharactersResult.Success);
        //buildList();
      } catch (error) {
        console.log(`GetParsedCharactersForPage() error -- ` + error);
        setResult(GetParsedCharactersResult.Failure);
      }
    };

    fetchAndSaveToRealm();
  }, []);

  // console.log(`Was successful?? - ${success}`)
  return {result};
}

export enum GetParsedCharactersResult {
  Success,
  Failure,
  Pending,
}
