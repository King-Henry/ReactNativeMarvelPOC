// import React from "react"
// import { CharacterListUiItem } from "../ui/CharacterListUiItem"
import React, { useEffect } from "react"
import { GetParsedCharactersResult, useFetchAndStoreCharacters } from "./GetParsedCharactersForPage"
import { useSubscribeToCharacterListUiItems } from "./SubscribeToCharacterListUiItems"

interface MainVieModel {

}

// Should return actions and state
export const useMainViewModel = () => {
    // Used to trigger the subscription to the character list
    const [shouldSubscribe, setShouldSubscribe] = React.useState<boolean>(false)

    // Fetch and save characters to db
    const { result } = useFetchAndStoreCharacters()

    // Load items from db and build ui models
    const { items, isLoading, getNextPage } = useSubscribeToCharacterListUiItems(shouldSubscribe)

    useEffect(() => {
        let finished = result !== GetParsedCharactersResult.Pending 
        if(!shouldSubscribe && finished) {
            console.log("Setting should subscribe to true")
            setShouldSubscribe(true)
        }
    }, [result])

    
    const allLoadingComplete = result !== GetParsedCharactersResult.Pending && !isLoading
    const fetchError = result === GetParsedCharactersResult.Failure

    return { items, fetchError, allLoadingComplete, getNextPage }

}