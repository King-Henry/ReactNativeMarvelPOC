import {ActivityIndicator, FlatList, SafeAreaView, View} from 'react-native';
import {useMainHookContainer} from './MainHookContainer';
import React from 'react';
import {listStyle, loaderStyles} from '../styles';
import {CharacterListUiItem} from './CharacterListUiItem';
import CharacterRow from './CharacterRow';

export function MainContent(): React.JSX.Element {
  console.log('RENDERING MAIN CONTENT');

  // Subscribe to Realm updates to receive fetched characters
  const {listItems, getNextPage} = useMainHookContainer();

  console.log(listItems.length);

  if (listItems.length < 1) {
    return (
      <View style={loaderStyles.centeredLoader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={listStyle.listContainer}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <FlatList
          data={listItems}
          onEndReached={getNextPage}
          onEndReachedThreshold={8}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => listItemToUiRow(item)}
        />
      </View>
    </SafeAreaView>
  );
}

const onRowClick = (id: number): void => {
  console.log('Clicked on item: ' + id);
};

const listItemToUiRow = (item: CharacterListUiItem): React.JSX.Element => {
  return (
    <CharacterRow uiModel={item} clickListener={onRowClick}>
      {item.id}
    </CharacterRow>
  );
};
