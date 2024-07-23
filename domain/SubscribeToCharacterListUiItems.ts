import { useRealm } from "@realm/react";
import React, { useEffect, useRef } from "react";
import { Results } from "realm";
import { MarvelCharacter } from "../data/MarvelCharacter";
import { CharacterListUiItem } from "../ui/CharacterListUiItem";
import { queryResultsToCharacterListItemsUseCase } from "./QueryResultsToCharacterListItemsUseCase";

export function useSubscribeToCharacterListUiItems() {
    const [items, setItems] = React.useState<CharacterListUiItem[]>([])
    const queryResultsRef = useRef<Results<MarvelCharacter> | null>(null) // we need to keep around the query results. Should this happen here?
    
    useEffect(() => {
        const realm = useRealm()
        const query: Results<MarvelCharacter> = realm.objects(MarvelCharacter.realmName)
        // Hold on to query results for paging in the future
        queryResultsRef.current = query
        // Build initial list
        const listItems: CharacterListUiItem[] = queryResultsToCharacterListItemsUseCase(queryResultsRef.current)
        // Set list on useState
        setItems(listItems)

        const queryChangeListener = () => {
            queryResultsRef.current = query // query gets updated in real time so this should have the latest results 
            //rebuild list
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
    })

    const getNextPage = () => {

    }

    const getPreviousPage = () => {

    }

    // return lambda to access next page (future)
    // Return items
    return { items, getNextPage, getPreviousPage }
}
