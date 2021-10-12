import React, {useContext} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

function Navbar(props) {
    const history = useHistory();
    let elems = document.querySelectorAll('.sidenav');
    let instances = window.M.Sidenav.init(elems, null);

    const auth = useContext(AuthContext);

    const logoutHandler = (event) => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    }

    return (
        <>
            <nav className="deep-purple darken-1" style={{padding: '0 30px'}}>
                <div className="nav-wrapper" >
                    <NavLink to="/create" className="brand-logo">Link Shortener</NavLink>
                    <span data-target="mobile-demo" className="sidenav-trigger hide-hamburger"><i
                        className="material-icons">menu</i></span>
                    <ul className="right hide-on-med-and-down">
                        <li><NavLink to="/create" activeClassName="deep-purple darken-2">Create <i
                            className="material-icons right">add</i>
                        </NavLink></li>
                        <li><NavLink to="/links" activeClassName="deep-purple darken-2">Links <i
                            className="material-icons right">link</i></NavLink></li>
                        <li><a href="/" onClick={logoutHandler} >Logout <i
                            className="material-icons right">exit_to_app</i></a></li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li><NavLink to="/create" activeClassName="deep-purple darken-2">Create</NavLink></li>
                <li><NavLink to="/links" activeClassName="deep-purple darken-2">Links</NavLink></li>
                <li><NavLink to="/" >Logout</NavLink></li>
            </ul>
        </>
    );
}

export default Navbar;
