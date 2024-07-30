import { useRealm } from "@realm/react";
import React, { useEffect, useRef } from "react";
import { Results } from "realm";
import { MarvelCharacter } from "../data/MarvelCharacter";
import { CharacterListUiItem } from "../ui/CharacterListUiItem";
import { queryResultsToCharacterListItemsUseCase } from "./QueryResultsToCharacterListItemsUseCase";

export function useSubscribeToCharacterListUiItems() {
    const [items, setItems] = React.useState<CharacterListUiItem[]>([])
    const [error, setError] = React.useState<Error | null>(null)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const queryResultsRef = useRef<Results<MarvelCharacter> | null>(null) // we need to keep around the query results. Should this happen here?
    const realm = useRealm()
    
    useEffect(() => {
        setIsLoading(true)
        const query: Results<MarvelCharacter> = realm.objects(MarvelCharacter.realmName)
        // Hold on to query results for paging in the future
        queryResultsRef.current = query
        // Set list on useState
        setIsLoading(false)
        

        const queryChangeListener = () => {
            console.log("We have RESULTTTTTS " + query.length)
            queryResultsRef.current = query // query gets updated in real time so this should have the latest results 
            //rebuild list
            const listItems: CharacterListUiItem[] = queryResultsToCharacterListItemsUseCase(queryResultsRef.current)
            setItems(listItems)
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
    }, [])

    const getNextPage = () => {

    }

    const getPreviousPage = () => {

    }

    // return lambda to access next page (future)
    // Return items
    console.log("Items count -- " + items.length)
    console.log("Item 1 - " + JSON.stringify(items[0]))
    return { items, error,  isLoading, getNextPage, getPreviousPage }
}
