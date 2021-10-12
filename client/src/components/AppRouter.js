import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
import {AuthContext} from "../context/AuthContext";

function AppRouter() {
    const {isAuthenticated} = useContext(AuthContext);

    return (
        <>
        {isAuthenticated &&
            <Switch>
                {privateRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Redirect to='/create'/>
            </Switch>
        }

        {!isAuthenticated &&
            <Switch>
                {publicRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Redirect to='/'/>
            </Switch>
        }
        </>
    );
}

export default AppRouter;
