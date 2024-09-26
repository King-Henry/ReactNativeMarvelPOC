// import React from "react"
// import { CharacterListUiItem } from "../ui/CharacterListUiItem"
import React, {useEffect} from 'react';
import {
  GetParsedCharactersResult,
  useGetParsedCharacters,
} from './GetParsedCharactersForPage';
import {useGetCharactersByPageUseCase} from './SubscribeToCharacterListUiItems';

interface MainVieModel {}

// Should return actions and state
export const useMainViewModel = () => {
  // Load items from db and build ui models
  const {items, error, isLoading, getNextPage, getPreviousPage} =
    useGetCharactersByPageUseCase();

  return {items, error, getNextPage, getPreviousPage};
};
