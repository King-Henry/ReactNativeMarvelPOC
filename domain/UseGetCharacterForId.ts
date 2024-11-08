import { useEffect, useState } from "react";
import { AnimeCharacter } from "../data/AnimeCharacter";
import { useAnimeCharacterRepository } from "../data/CharacterRepository";

export function useGetCharacterForId(id: string | number): ModelFetchResult<AnimeCharacter> {
    const [result, setResult] = useState<ModelFetchResult<AnimeCharacter>>(
        { status: ModelFetchStatus.Loading, model: null }
    )

    const animeRepository = useAnimeCharacterRepository()

    useEffect(() => {
        const character = animeRepository.get(id)
        if (character === null) {
            setResult({ status: ModelFetchStatus.Error, model: null })
        } else {
            setResult({ status: ModelFetchStatus.Success, model: character })
        }
    }, [])

    return result
}

export enum ModelFetchStatus {
    Success,
    Error,
    Loading
}

export interface ModelFetchResult<T extends Realm.Object<T>> {
    status: ModelFetchStatus,
    model: T | null
}