import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  View,
  Text,
} from 'react-native';
import {useMainViewModel} from './domain/MainViewModel';
import React from 'react';
import {listStyle, loaderStyles} from './styles';
import {CharacterListUiItem} from './ui/CharacterListUiItem';
import CharacterRow from './ui/CharacterRow';

export function MainContent(): React.JSX.Element {
  console.log('RENDERING MAIN CONTENT');

  // Subscribe to Realm updates to receive fetched characters
  const {items, error, getNextPage} = useMainViewModel();

  if (items.length < 1) {
    return (
      <View style={loaderStyles.centeredLoader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    console.log(`ERROR: ${error}`);
    return <Text>ERROR</Text>;
  }

  return (
    <SafeAreaView style={listStyle.listContainer}>
      <FlatList
        data={items}
        onEndReached={getNextPage}
        onEndReachedThreshold={8}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => listItemToUiRow(item)}
      />
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
