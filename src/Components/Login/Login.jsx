import { AuthContext } from "../../context/Auth/Auth";
import { useContext, useState } from 'react';
//import { SettingsContext } from "../../context/Settings/Settings";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, user, logout } = useContext(AuthContext);
    //const { addStaff } = useContext(SettingsContext);

    const handleLogin = (e) => {
        e.preventDefault();
        login(username, password);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        setUsername('');
        setPassword('');
    };


    return (
        <>
            <form onSubmit={handleLogin}>
                <label> Username:
                    <input onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label> Password:
                    <input onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Login</button>
                </label>
            </form>
            <button onClick={{handleLogout}}>Logout</button>
        </>
    )
};

export default Login;