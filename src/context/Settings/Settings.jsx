import React from 'react';
import { useState, useEffect } from 'react';


export const SettingsContext = React.createContext();

const SettingsProvider = ({ children }) => {
    const [sort, setSort] = useState('');
    const [pageItems, setPageItems] = useState(3);
    const [showComplete, setShowComplete] = useState('difficulty');
    const [staff, setStaff] = useState([{name: '', position: ''}])

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

    const addStaff = (person) => {
        if(person && person.name && person.position){
            setStaff([...staff, person]);
        } else {
            console.log('Invalid person! Add a name & position')
        }
    }


    const values = { sort, pageItems, showComplete, setSort, setPageItems, setShowComplete, saveLocally, staff, addStaff }

    return (
        <SettingsContext.Provider value={values}>
            {children}
        </SettingsContext.Provider>
    )
};

export default SettingsProvider;
