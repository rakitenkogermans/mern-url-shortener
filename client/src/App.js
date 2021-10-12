import React, {useState} from "react";
import 'materialize-css';
import useRoutes from "./router";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import Navbar from "./components/Navbar";

function App() {
    // const routes = useRoutes(false);
    const {token, userId, login, logout} = useAuth();
    console.log('Token',token);
    const isAuthenticated = !!token;

    // const [isAuth, setIsAuth] = useState(isAuthenticated);

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
