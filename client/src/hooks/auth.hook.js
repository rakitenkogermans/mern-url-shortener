import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";

const localStorageName = 'userData';

export const useAuth = () => {

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);
        // isAuthenticated = true;
        localStorage.setItem(localStorageName, JSON.stringify({token: jwtToken, userId: id}))
    }, []);
    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem(localStorageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(localStorageName));

        if (data && data.token) {
            login(data.token, data.userId);
        }
    }, [login])

    return {login, logout, token, userId};
}
