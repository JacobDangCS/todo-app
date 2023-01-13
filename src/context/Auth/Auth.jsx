import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = React.createContext();

// const testUsers = {
//     Admininistrator: {
//         password: 'admin',
//         name: 'Administrator',
//         token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ'
//     },
//     Editor: {
//         password: 'editor',
//         name: 'Editor',
//         token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s'
//     },
//     Writer: {
//         password: 'writer',
//         name: 'Writer',
//         token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68'
//     },
//     User: {
//         password: 'user',
//         name: 'User',
//         token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
//     },
// };



const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);

    const can = (capability) => {
        return user?.capabilities?.includes(capability);
    };

    const _validateToken = (token) => {
        try {
            let validUser = jwt_decode(token);
            if (validUser) {
                setUser(validUser);
                setIsLoggedIn(true);
            }
        } catch (error) {
            setError(error);
        }
    };

    const login = async (username, password) => {

        let config = {
            url:'/signin',
            baseURl:'https://api-js401.herokuapp.com/api/v1/todo',
            method:'post',
            auth:{username, password}
        }

        let res = await axios(config);

        const {token} = res.data;

        if (token) {
            try {
                _validateToken(token);
            } catch (error) {
                setError(error);
            }
        }

    };

    const logout = () => {
        setUser({})
        setIsLoggedIn(false);
    };


    const values = {
        user,
        isLoggedIn,
        error,
        can,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;