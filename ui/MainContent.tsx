import React from "react"
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native"
import { useMainHookContainer } from "./MainHookContainer"
import { loaderStyles, listStyle } from "../styles"
import { CharacterListUiItem } from "./CharacterListUiItem"
import CharacterRow from "./CharacterRow"

export function MainContent(): React.JSX.Element {
    console.log("RENDERING MAIN CONTENT")
  
    // Subscribe to Realm updates to receive fetched characters
    const { items, allLoadingComplete, getNextPage } = useMainHookContainer()
  
    if(!allLoadingComplete) {
      return (
        <View style={loaderStyles.centeredLoader}>
          <ActivityIndicator size="large"/>
        </View> 
      )
    }
  
    // TODO: Implement error example
    // if(error) {
    //   console.log(`ERROR: ${error}`)
    //   return <Text>ERROR</Text>
    // }
  
    return (
      <SafeAreaView style={listStyle.listContainer}>
        <FlatList
          data={items}
          onEndReached={getNextPage}
          onEndReachedThreshold={8}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => listItemToUiRow(item)} />
      </SafeAreaView>
    )
  }
  
  const onRowClick = (id: number): void => {
    console.log("Clicked on item: " + id)
  }
  
  const listItemToUiRow = (item: CharacterListUiItem): React.JSX.Element => {
    return <CharacterRow uiModel={item} clickListener={onRowClick}>{item.id}</CharacterRow>
  }