import {Results} from 'realm';
import {AnimeCharacter} from './AnimeCharacter';
import {LocalDataBaseContext, useLocalDataBase} from './LocalDataBase';
import {useContext, useEffect, useState} from 'react';
import {ParsedCharacter} from './ParsedCharacter';
import {getCharacters} from './ApiService';
import {saveParsedCharactersToRealmUseCase} from '../domain/SaveParsedCharactersToRealmUseCase';

// interface Repository<MutableModel, Model> {
//     create(mutable: MutableModel): boolean;
//     get(id: number | number): Model | null;
// }

export interface DataStore<T> {
  create(model: T | Partial<T>): boolean;
  get(id: number): T | null;
  update(model: T): boolean;
  remove(id: number): boolean;
  getAll(): Results<T>;
}

export enum GetParsedCharactersResult {
  Success,
  Failure,
  Pending,
}

export const useAnimeCharacterDataStore = (): DataStore<AnimeCharacter> => {
  const db = useContext(LocalDataBaseContext);
  console.log('Is this First?');

  const [result, setResult] = useState(GetParsedCharactersResult.Pending);

  const create = (
    character: AnimeCharacter | Partial<AnimeCharacter>,
  ): boolean => {
    return db.create<AnimeCharacter>(AnimeCharacter.realmName, character);
  };

  const get = (id: number): AnimeCharacter | null => {
    return db.get(AnimeCharacter.realmName, id);
  };

  const update = (
    character: AnimeCharacter | Partial<AnimeCharacter>,
  ): boolean => {
    return db.update<AnimeCharacter>(AnimeCharacter.realmName, character);
  };

  const remove = (id: number): boolean => {
    return db.deleteModel(AnimeCharacter.realmName, id);
  };

  // Filter/sort results in use case?
  const getAllCharacters = (): Results<AnimeCharacter> => {
    return db.queryForObjectOfType(AnimeCharacter.realmName);
  };

  //   function saveParsedCharactersToRealmUseCase(
  //     remoteCharacters: ParsedCharacter[],
  //   ): boolean {
  //     try {
  //       remoteCharacters.forEach(remoteCharacter => {
  //         const existingObject = get(remoteCharacter.id);
  //         // console.log(`ExistingObject - ${!existingObject}`)
  //         const character: AnimeCharacter | Partial<AnimeCharacter> = {
  //           _id: remoteCharacter.id,
  //           name: remoteCharacter.name,
  //           fullImage: remoteCharacter.fullImage,
  //           thumbnailImage: remoteCharacter.thumbnailImage,
  //         };
  //         if (!existingObject) {
  //           create(character);
  //         }
  //       });
  //       return true;
  //     } catch (error) {
  //       console.log(`saveParsedCharactersToRealmUseCase() error -- ` + error);
  //       return false;
  //     }
  //   }

  useEffect(() => {
    console.log('OR IS THIS FIRST');
    const fetchAndSaveToRealm = async () => {
      try {
        const parsedCharacters: ParsedCharacter[] = await getCharacters(20, 0);
        // const parsedCharacters: ParsedCharacter[] = transformApiResponseToCharactersUseCase(json)
        // await prefetchCharacterImagesUseCase(parsedCharacters)
        const success = saveParsedCharactersToRealmUseCase(
          create,
          get,
          parsedCharacters,
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

  return {create, get, update, remove, getAll: getAllCharacters, result};
};
