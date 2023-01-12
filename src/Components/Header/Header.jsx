import { Text, createStyles, Group } from "@mantine/core";
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: theme.colors.blue[7],
        padding: theme.spacing.md,
    },
    link: {
        fontSize: theme.fontSizes.md,
        color: theme.colors.gray[0],
        textDecoration: 'none',
    }
}))

const Header = () => {
    const { classes } = useStyles();

    return (
        <Header>
            <Group>
                <Link to="/" className={classes.link}></Link>
                <Link to="/settings" className={classes.link}></Link>
            </Group>
            <header className={classes.header}>
                <Text>Home</Text>
            </header>
        </Header>
    )
};

export default Header;