/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { RealmProvider } from '@realm/react'
import { AnimeCharacter } from './data/AnimeCharacter'
import { listStyle, loaderStyles } from './styles';
import { CharacterListUiItem } from './ui/CharacterListUiItem';
import CharacterRow  from './ui/CharacterRow';
import { useMainViewModel } from './domain/MainViewModel';


const queryClient: QueryClient = new QueryClient()


function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <RealmProvider schema={[AnimeCharacter]}>
        <MainContent/>
      </RealmProvider>
    </QueryClientProvider>
  )
  
}

function MainContent(): React.JSX.Element {
  console.log("RENDERING MAIN CONTENT")

  // Subscribe to Realm updates to receive fetched characters
  const { items, error,  allLoadingComplete, getNextPage } = useMainViewModel()

  if(!allLoadingComplete) {
    return (
      <View style={loaderStyles.centeredLoader}>
        <ActivityIndicator size="large"/>
      </View> 
    )
  }

  if(error) {
    console.log(`ERROR: ${error}`)
    return <Text>ERROR</Text>
  }

  const onEndReached = () => {
    getNextPage()
  }

  return (
    <SafeAreaView style={listStyle.listContainer}>
      <FlatList
        data={items}
        onEndReached={onEndReached}
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


export default App;
