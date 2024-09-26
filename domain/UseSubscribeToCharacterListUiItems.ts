import React, { useEffect, useRef } from "react";
import { Results } from "realm";
import { AnimeCharacter } from "../data/AnimeCharacter";
import { CharacterListUiItem } from "../ui/CharacterListUiItem";
import { useAnimeCharacterRepository } from "../data/CharacterRepository";
import { checkIfReachedMaxItemCountUseCase } from "./CheckIfReachedMaxItemCountUseCase";
import { getListItemsUseCase } from "./GetListItemsUseCase";

const PAGE_SIZE = 100;

export function useSubscribeToCharacterListUiItems(shouldBuildList: boolean) {
    const [items, setItems] = React.useState<CharacterListUiItem[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const queryResultsRef = useRef<Results<AnimeCharacter> | null>(null)
    const page = useRef<number>(1)
    const charactersRepository = useAnimeCharacterRepository()
    
    useEffect(() => {
        if(!shouldBuildList) {
            return;
        }

        const query: Results<AnimeCharacter> = charactersRepository.getAll()
        // Hold on to query results for paging in the future
        queryResultsRef.current = query

        const queryChangeListener = () => {
            queryResultsRef.current = query // Query gets updated in real time so this should have the latest results 
            // Grab items for page
            const listItems: CharacterListUiItem[] = getListItemsUseCase(queryResultsRef.current, 
                0, PAGE_SIZE, page.current)
            setItems(listItems)
            setIsLoading(false)
        }
        
        query.addListener(queryChangeListener)
    
        return () => {
            query.removeListener(queryChangeListener)
        }
    }, [shouldBuildList])

    const getNextPage = () => {
        const results = queryResultsRef.current
        if(checkIfReachedMaxItemCountUseCase(items.length, results)) {
            return;
        }
        page.current = page.current + 1
        const listItems: CharacterListUiItem[] = getListItemsUseCase(results, 0, PAGE_SIZE, page.current)
        setItems(listItems)
    }

    return { items, isLoading, getNextPage }
}
