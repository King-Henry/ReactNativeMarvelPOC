import React, { useEffect, useRef } from "react";
import { Results } from "realm";
import { AnimeCharacter } from "../data/AnimeCharacter";
import { CharacterListUiItem } from "../ui/CharacterListUiItem";
import { useAnimeCharacterRepository } from "./CharacterRepository";
import { getListItemsUseCase } from "./GetListItemsUseCase";

const PAGE_SIZE = 100;

export function useSubscribeToCharacterListUiItems() {
    const [items, setItems] = React.useState<CharacterListUiItem[]>([])
    const [error, setError] = React.useState<Error | null>(null)
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const queryResultsRef = useRef<Results<AnimeCharacter> | null>(null) // we need to keep around the query results. Should this happen here?
    const page = useRef<number>(1)
    const charactersRepository = useAnimeCharacterRepository()
    const [shouldBuildList, setShouldBuildList] = React.useState<boolean>(false)
    
    
    useEffect(() => {
        if(!shouldBuildList) {
            return;
        }
        console.log('STARTING BUILDING ITEMS')

        // setIsLoading(true)
        const query: Results<AnimeCharacter> = charactersRepository.getAll()
        // Hold on to query results for paging in the future
        queryResultsRef.current = query
        // Set list on useState
        // setIsLoading(false)
        

        const queryChangeListener = () => {
            queryResultsRef.current = query // query gets updated in real time so this should have the latest results 
            // Grab items for page
            const listItems: CharacterListUiItem[] = getListItemsUseCase(queryResultsRef.current, 
                0, items.length, PAGE_SIZE, page.current)
            // console.log("queryChangeListener() - SENDING NEW ITEMS")
            setItems(listItems)
            setIsLoading(false)
        }
        
        // Add listener
        try { 
            query.addListener(queryChangeListener)
        } catch (error) {
            console.log(`An error has occured with the query listener! ${error}`)
        }

        return () => {
            query.removeListener(queryChangeListener)
        }
    }, [shouldBuildList])

    const getNextPage = () => {
        const results = queryResultsRef.current
        const reachedMaxCount = items.length === results?.length
        if(!results || reachedMaxCount) {
            return;
        }
        page.current = page.current + 1
        const listItems: CharacterListUiItem[] = getListItemsUseCase(results, 0, items.length, PAGE_SIZE, page.current)
        // console.log("getNextPage() - SENDING NEW ITEMS")
        setItems(listItems)
    }

    const getPreviousPage = () => {
    }

    const setReadyToBuild = () => {
        setShouldBuildList(true)
    }

    // return lambda to access next page (future)
    // Return items
    // console.log("Items count -- " + items.length)
    return { items, error,  isLoading, getNextPage, getPreviousPage, setReadyToBuild }
}
