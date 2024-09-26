// import React from "react"
// import { CharacterListUiItem } from "../ui/CharacterListUiItem"
import {useGetCharactersByPageUseCase} from '../domain/UseGetCharactersByPageUseCase';

// Should return actions and state
export const useMainViewModel = () => {
  // Load items from db and build ui models
  const {items, error, isLoading, getNextPage, getPreviousPage} =
    useGetCharactersByPageUseCase();

  return {items, error, getNextPage, getPreviousPage};
};
