import { useContext } from "react";
import { Results } from "realm";
import { AnimeCharacter } from "./AnimeCharacter"
import { LocalDataStoreContext } from "./LocalDataStoreContext";
import { useLocalDataStore } from "./UseLocalDataStore";

// interface Repository<MutableModel, Model> {
//     create(mutable: MutableModel): boolean;
//     get(id: number | number): Model | null;
// }

export interface Repository<T> {
    create(model: T | Partial<T>) : boolean,
    get(id: number) : T | null
    update(model: T) : boolean,
    remove(id: number) : boolean,
    getAll() : Results<T>
}

export const useAnimeCharacterRepository = (): Repository<AnimeCharacter> => { 
    const dataStore = useContext(LocalDataStoreContext)

    if(dataStore === null) { 
        throw new Error("LocalDataStoreContext is null")
    }

    const create = (character: AnimeCharacter | Partial<AnimeCharacter>): boolean => {
        return dataStore.create<AnimeCharacter>(AnimeCharacter.realmName, character)
    }

    const get = (id: number): AnimeCharacter | null => {
        return dataStore.get(AnimeCharacter.realmName, id)
    }

    const update = (character: AnimeCharacter | Partial<AnimeCharacter>): boolean => {
        return dataStore.update<AnimeCharacter>(AnimeCharacter.realmName, character)
    }

    const remove = (id: number): boolean => {
        return dataStore.deleteModel(AnimeCharacter.realmName, id)
    }

    // Filter/sort results in use case?
    const getAll = (): Results<AnimeCharacter> => {
        return dataStore.queryForObjectOfType(AnimeCharacter.realmName)
    }

    return { create, get, update, remove, getAll }
}
