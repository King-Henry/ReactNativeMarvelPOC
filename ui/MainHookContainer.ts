import {useState} from 'react';
import {useGetCharactersUseCase} from '../domain/UseGetCharactersByPageUseCase';
import {getListItemsUseCase} from '../domain/GetListItemsUseCase';

const PAGE_SIZE = 100;

// Should return actions and state
export const useMainHookContainer = () => {
  // Load items from db and build ui models
  const [page, setPage] = useState(0);
  const {query} = useGetCharactersUseCase();
  const listItems = getListItemsUseCase(query, 0, PAGE_SIZE, page);

  const getNextPage = () => {
    setPage(p => p + 1);
  };

  return {listItems, getNextPage};
};
