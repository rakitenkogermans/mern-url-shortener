import React, {useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import 'materialize-css';

function App() {
    const {token, userId, login, logout, ready} = useAuth();
    const isAuthenticated = !!token;

    if (!ready) {
        return <Loader/>;
    }
    return (
        <AuthContext.Provider value={{
            token, userId, login, logout, isAuthenticated
        }}>
            <BrowserRouter >
                {isAuthenticated && <Navbar/>}
                <div className="container ">
                    <AppRouter />
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
