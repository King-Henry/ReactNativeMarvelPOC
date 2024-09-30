import {ParsedCharacter} from '../data/ParsedCharacter';
import {parseJsonForCharacterUseCase} from './ParseJsonForCharacterUseCase';

export function transformApiResponseToCharactersUseCase(
  // would need a json typing for the following
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
): ParsedCharacter[] {
  const results = data.characters;
  if (!results) {
    return [];
  }

  const characters: ParsedCharacter[] = [];
  for (const result of results) {
    const parsedCharacter = parseJsonForCharacterUseCase(result);
    characters.push(parsedCharacter);
  }

  console.log('Api response has been transformed!');
  return characters;
}
