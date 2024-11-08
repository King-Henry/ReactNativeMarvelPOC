import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from '../App';

const CharacterListNavContext = React.createContext<NativeStackScreenProps<RootStackParamList, 'CharacterList'> | null>(null);

export function CharacterListNavProvider({ children, navProps }: { 
    children: React.ReactNode, 
    navProps: NativeStackScreenProps<RootStackParamList, 'CharacterList'> }): React.ReactElement {
  return (
    <CharacterListNavContext.Provider value={navProps}>
      {children}
    </CharacterListNavContext.Provider>
  );
}

export function useCharacterListNav(): NativeStackScreenProps<RootStackParamList, 'CharacterList'> {
    const nav = React.useContext(CharacterListNavContext);
    if(nav === null) {
        throw new Error("useCharacterListNav must be used within a CharacterListNavProvider");
    } 

    return nav
}

