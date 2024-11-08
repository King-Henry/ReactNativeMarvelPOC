/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { RealmProvider } from '@realm/react'
import { AnimeCharacter } from './data/AnimeCharacter'
import { LocalDataStoreProvider } from './data/LocalDataStoreContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { ListScreen } from './ui/ListScreen';
import { CharacterDetailScreen } from './ui/CharacterDetailScreen';


const queryClient: QueryClient = new QueryClient()
const Stack = createNativeStackNavigator<RootStackParamList>()


function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <RealmProvider schema={[AnimeCharacter]}>
        <LocalDataStoreProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='CharacterList'>
              <Stack.Screen name="CharacterList" component={ListScreen}/>
              <Stack.Screen name='CharacterDetail' component={CharacterDetailScreen}/>
            </Stack.Navigator>
          </NavigationContainer>
        </LocalDataStoreProvider>
      </RealmProvider>
    </QueryClientProvider>
  )
}

export type RootStackParamList = {
  CharacterList: undefined;
  CharacterDetail: { characterId: number };
}

export type CharacterListProps = NativeStackScreenProps<RootStackParamList, 'CharacterList'>
export type CharacterDetailProps = NativeStackScreenProps<RootStackParamList, 'CharacterDetail'>


export default App;
