/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { RealmProvider } from '@realm/react'
import { AnimeCharacter } from './data/AnimeCharacter'
import { listStyle, styles } from './styles';
import { getParsedCharacters } from './domain/GetParsedCharactersForPage';
import { useSubscribeToCharacterListUiItems } from './domain/SubscribeToCharacterListUiItems';
import { CharacterListUiItem } from './ui/CharacterListUiItem';
import CharacterRow  from './ui/CharacterRow';


type SectionProps = PropsWithChildren<{
  title: string;
}>;

const queryClient: QueryClient = new QueryClient()

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

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
  
  // Fetch characters from API and store in DB
  const success = getParsedCharacters()

  // // Subscribe to Realm updates to receive fetched characters
  const { items, error,  isLoading, getNextPage, getPreviousPage } = useSubscribeToCharacterListUiItems()

  if(isLoading) {
    return <Text>Loading..</Text>
  }

  if(error) {
    console.log(`ERROR: ${error}`)
    return <Text>ERROR</Text>
  }

  const onEndReached = () => {
    console.log("TIMMEH - we've reached the end!")
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
  console.log("Just clicked on " + id)
}

const listItemToUiRow = (item: CharacterListUiItem): React.JSX.Element => {
  return <CharacterRow uiModel={item} clickListener={onRowClick}>{item.id}</CharacterRow>
}


function defaultView(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


export default App;
