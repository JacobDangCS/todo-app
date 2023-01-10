import React from 'react';
import { useState } from 'react';
 

export const SettingsContext = React.createContext();

const SettingsProvider = ({ children }) => {
    const [sort, setSort] = useState('');
    const [pageItems, setPageItems] = useState(3);
    const [showComplete, setShowComplete] = useState(false);


    const values = {sort, pageItems, showComplete,}

    return (
        <SettingsContext.Provider value={values}>
            {children}
        </SettingsContext.Provider>
    )
};

export default SettingsProvider;
