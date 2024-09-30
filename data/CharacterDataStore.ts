import {Results} from 'realm';
import {AnimeCharacter} from './AnimeCharacter';
import {LocalDataBaseContext} from './LocalDataBase';
import {useContext, useEffect, useState} from 'react';
import {ParsedCharacter} from './ParsedCharacter';
import {getCharacters} from './ApiService';
import {saveParsedCharactersToRealmUseCase} from '../domain/SaveParsedCharactersToRealmUseCase';

export interface DataStore<T> {
  create(model: T | Partial<T>): boolean;
  get(id: number): T | null;
  update(model: T): boolean;
  remove(id: number): boolean;
  getAll(): Results<T>;
  initializationResult: GetParsedCharactersResult;
}

export enum GetParsedCharactersResult {
  Success,
  Failure,
  Pending,
}

//UPDATE TO USE RN REALM NOT JS REALM
export const useAnimeCharacterDataStore = (): DataStore<AnimeCharacter> => {
  const db = useContext(LocalDataBaseContext);
  if (db === null) {
    throw Error;
  }

  const [initializationResult, setResult] = useState(
    GetParsedCharactersResult.Pending,
  );

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

  useEffect(() => {
    const fetchAndSaveToRealm = async () => {
      try {
        const parsedCharacters: ParsedCharacter[] = await getCharacters(1429);
        saveParsedCharactersToRealmUseCase(create, get, parsedCharacters);
        setResult(GetParsedCharactersResult.Success);
      } catch (error) {
        console.log(`GetParsedCharactersForPage() error -- ` + error);
        setResult(GetParsedCharactersResult.Failure);
      }
    };

    fetchAndSaveToRealm();
  }, []);

  return {
    create,
    get,
    update,
    remove,
    getAll: getAllCharacters,
    initializationResult,
  };
};
