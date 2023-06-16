import React, { createContext, useReducer } from 'react';
import { Reducer } from './CredentialsReducer';
var bcrypt = require('bcryptjs');
const userCredentials = {
    userCredentials:{
        isLogged:false,
        email:'',
        password:''
    }
}

export const CredentialContext = createContext(userCredentials);

export const CredentialProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, userCredentials);

    function loginFunction({email,password,id}) {
        bcrypt.hash(password,10).then((hash)=>{
            dispatch({
                type: 'LOGIN',
                payload: {
                    email,
                    hash,
                    id
                }
            });
        })
        
        
    };

    function logoutFunction() {
        dispatch({
            type: 'LOGOUT',
            payload: {}
        });
    };

    return (<CredentialContext.Provider value={{
        userCredentials: state.userCredentials,
        loginFunction,
        logoutFunction,
    }}>
        {children}
    </CredentialContext.Provider>);
}
