import React from "react";
import { createContext, useReducer } from "react";
import jwtDecode from 'jwt-decode';

const ACTION_TYPES = {
    LOGIN: 'login',
    LOGOUT: 'logout'
}

const INITIAL_STATE = {
    user: null,
}

const token = localStorage.getItem('token');
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) localStorage.removeItem('token');
    else INITIAL_STATE.user = decodedToken;
}

const AuthContext = createContext({
    user: null,
    login: (data) => {},
    logout: () => {}
});

function authReducer (state, action) {
    switch (action.type) {
        case ACTION_TYPES.LOGIN:
            return {
                ...state,
                user: action.payload
            }
        
        case ACTION_TYPES.LOGOUT:
            return {
                ...state,
                user: null
            }

        default:
            return state;
    }
};

function AuthProvider (props) {
    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

    const login = (data) => {
        localStorage.setItem('token', data.token);
        dispatch({ type: ACTION_TYPES.LOGIN, payload: data });
    }
    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: ACTION_TYPES.LOGOUT });
    }

    return (
        <AuthContext.Provider 
            value={{ user: state.user, login, logout }}
            {...props}
        />
    )
};

export { AuthProvider, AuthContext };