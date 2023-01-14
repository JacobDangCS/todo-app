import { AuthContext } from "../../context/Auth/Auth";
import { useContext, useState } from 'react';
import { Button, TextInput, Group } from '@mantine/core'
import { If, Then, Else } from 'react-if';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, logout, isLoggedIn } = useContext(AuthContext);


    const handleLogin = (e) => {
        e.preventDefault();
        login(username, password);
    };

    const handleLogout = (e) => {
        setUsername('');
        setPassword('');
        logout();
    };


    return (
        <>
            <If condition={isLoggedIn}>
                <Then>
                    <Button color="red.6" onClick={handleLogout}>Log Out</Button>
                </Then>
                <Else>
                    <Group>
                    <TextInput
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <TextInput
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <Button color="gray.8" onClick={() => login(handleLogin)}>Login</Button>
                    </Group>
                </Else>
            </If>
        </>
    )
};

export default Login;