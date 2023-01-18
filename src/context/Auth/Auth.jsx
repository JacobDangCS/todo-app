import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import cookie from 'react-cookies';

export const AuthContext = React.createContext();


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
        cookie.save('auth', token);
      }
    } catch (error) {
      setError(error);
    }
  };

  const login = async (username, password) => {
    console.log('FROM CONTEXT', username ,password);
    let config = {
      url: '/signin',
      baseURL: 'https://api-js401.herokuapp.com',
      method: 'post',
      auth: { username, password }
    }

    let res = await axios(config);

    const { token } = res.data;

    if (token) {
      try {
        _validateToken(token);
      } catch (error) {
        setError(error);
      }
    }

  };

  useEffect(() => {
    let token = cookie.load('auth');
    if (token) {
      _validateToken(token);
    }
  }, []);

  const logout = () => {
    setUser({})
    setIsLoggedIn(false);
    cookie.remove('auth');
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