import { Text, createStyles } from "@mantine/core";
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    header:{
        backgroundColor: theme.colors.blue[7],
        padding: theme.spacing.md,
        fontSize: theme.fontSizes.md,
        color: theme.colors.gray[0],
    }
}))

const Header = ({incomplete}) => {
    const {classes} = useStyles();
    return(
        <Header>
        <Link to = '/' className = 'Link'></Link>
        <Link to = '/settings' className = 'Setting'></Link>
        <header className = {classes.header}>
            <Text>Home</Text>
        </header>
        </Header>
    )
}

export default Header;