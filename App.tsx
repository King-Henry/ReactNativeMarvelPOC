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
import { MainContent } from './ui/MainContent';


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

export default App;
