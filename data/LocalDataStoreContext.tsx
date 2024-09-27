import React from "react";
import { LocalDataStore, useLocalDataStore } from "./UseLocalDataStore";

export const LocalDataStoreContext = React.createContext<LocalDataStore | null>(null);

export const LocalDataStoreProvider = ({ children }: { children: React.ReactNode}) => {
    const dataStore = useLocalDataStore();
    return (
        <LocalDataStoreContext.Provider value={dataStore}>
            {children}
        </LocalDataStoreContext.Provider>
    )
};