import { transformApiResponseToCharactersUseCase } from '../domain/ApiResponseToCharactersUseCase';
import { buildUrlUseCase } from '../domain/BuildApiUrlUseCase';
import { ParsedCharacter } from './ParsedCharacter';

export async function getCharacters(limit: number): Promise<ParsedCharacter[]> {
  return fetch(buildUrlUseCase(limit))
    .then(res => {
      console.log('Api call successful');
      return res.json();
    })
    .then(res => {
      return transformApiResponseToCharactersUseCase(res);
    });
}
