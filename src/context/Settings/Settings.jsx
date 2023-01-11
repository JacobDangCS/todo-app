import React from 'react';
import { useState, useEffect } from 'react';


export const SettingsContext = React.createContext();

const SettingsProvider = ({ children }) => {
    const [sort, setSort] = useState('');
    const [pageItems, setPageItems] = useState(3);
    const [showComplete, setShowComplete] = useState('difficulty');

    const saveLocally = () => {
        localStorage.setItem('todo', JSON.stringify({ pageItems, sort, showComplete }));
    };

    useEffect(() => {
        let storage = JSON.parse(localStorage.getItem('todo'));
        if (storage) {
            setShowComplete(storage.showComplete);
            setPageItems(storage.pageItems);
            setSort(storage.sort);
        }
    }, []);


    const values = { sort, pageItems, showComplete, setSort, setPageItems, setShowComplete, saveLocally }

    return (
        <SettingsContext.Provider value={values}>
            {children}
        </SettingsContext.Provider>
    )
};

export default SettingsProvider;
