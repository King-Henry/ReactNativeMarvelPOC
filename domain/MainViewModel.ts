// import React from "react"
// import { CharacterListUiItem } from "../ui/CharacterListUiItem"
import React from "react"
import { CharacterListUiItem } from "../ui/CharacterListUiItem"
import { useGetParsedCharacters } from "./GetParsedCharactersForPage"
import { useSubscribeToCharacterListUiItems } from "./SubscribeToCharacterListUiItems"

interface MainVieModel {

}
// Should return actions and state
export const useMainViewModel = () => {
    // Used to trigger the subscription to the character list
    const [shouldSubscribe, setShouldSubscribe] = React.useState<boolean>(false)

    // Fetch and save characters to db
    const { success, finished } = useGetParsedCharacters()

    // Load items from db and build ui models
    const { items, error, isLoading, getNextPage, getPreviousPage } = useSubscribeToCharacterListUiItems(shouldSubscribe)

    console.log(`finished & isLoading:`)
    const allLoadingComplete = finished && !isLoading
    if(!shouldSubscribe && finished) {
        console.log("Setting should subscribe to true")
        setShouldSubscribe(true)
    }

    console.log(`allLoadingComplete: ${allLoadingComplete}`)

    return { items, allLoadingComplete, error, getNextPage, getPreviousPage }

}