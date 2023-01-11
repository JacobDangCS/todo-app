import { SettingsContext } from '../../context/Settings/Settings';
import { useContext } from 'react';
import { Card, createStyles, Grid, NumberInput, Switch, Text, TextInput } from '@mantine/core';

const useStyles = createStyles((theme) => {

})

const SettingsForm = () => {
    const {pageItems, showCompleted, sort} = useContext(SettingsContext);
    const { classes } = useStyles();

    return(
        <>
        
        
        </>
    )
}

export default SettingsForm;