import { SettingsContext } from '../../context/Settings/Settings';
import { useContext, useState } from 'react';
import { Card, createStyles, Grid, Switch, Text, NumberInput, TextInput, Button } from '@mantine/core';
import { IconSettings } from '@tabler/icons';
import { When } from 'react-if';

const useStyles = createStyles((theme) => ({
    h1: {
        backgroundColor: theme.colors.gray[8],
        color: theme.colors.gray[0],
        fontSize: theme.fontSizes.lg,
        width: '80%',
        margin: 'auto',
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        marginTop: theme.spacing.md,
    }
}));

const SettingsForm = () => {
    const [show, setShow] = useState(false);
    const { pageItems, setPageItems, showComplete, setShowComplete, sort, setSort, saveLocally } = useContext(SettingsContext);
    const { classes } = useStyles();
    const handleSubmit = (e) => {
        e.preventDefault();
        setShow(true);
        saveLocally();
    };

    return (
        <>
            <h1 className={classes.h1}><IconSettings /> Manage Settings</h1>
            <Grid style={{ width: '80%', margin: 'auto' }}>
                <Grid.Col xs={12} sm={6}>
                    <Card withBorder p="xs">
                        <Card.Section>
                            <Text>Updated Settings</Text>
                            <form onSubmit={handleSubmit}>
                                <Switch
                                    label="Show Completed ToDos"
                                    checked={showComplete} onChange={(event) => setShowComplete(event.currentTarget.checked)} />
                                <NumberInput
                                    mb="sm"
                                    value={pageItems}
                                    label="ItemsPerPage"
                                    onChange={(value) => setPageItems(value)}
                                />
                                <TextInput
                                    mb="sm"
                                    placeholder={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    label="Sort Keyword"
                                />
                                <Button type="submit">Show New Settings</Button>
                            </form>
                        </Card.Section>
                    </Card>
                </Grid.Col>
                <Grid.Col xs={12} sm={6}>
                    <When condition={show}>
                        <Card withBorder p="sm">
                            <Card.Section>
                                <Text m="xl" fontSize="xl" weight="bold">Updated Settings</Text>
                            </Card.Section>
                            <Text m="sm">{showComplete ? 'Show' : 'Hide'}Completed ToDos</Text>
                            <Text m="sm">Items Per Page {pageItems}</Text>
                            <Text m="sm">Sort Keyword: {sort}</Text>
                        </Card>
                    </When>
                </Grid.Col>
            </Grid>
        </>
    )
};

export default SettingsForm;