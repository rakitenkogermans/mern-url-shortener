import React, {useContext, useEffect, useState} from 'react';
import 'material-icons/iconfont/material-icons.css';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

function AuthPage() {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {isLoading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    });

    useEffect(() => {
        message(error, true);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    //Send request to our backend to register new user using custom hook
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            console.log('Data', data);
            message(data.message, false);
        } catch (e) {}
    }

    //Send request to our backend to login into system using custom hook
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            // console.log('Data', data);
            auth.login(data.token, data.userId);
            message(data.message, false);
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1 className="white-text">Link Shortener</h1>
                <div className="card deep-purple darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">email</i>
                                <input
                                    onChange={changeHandler}
                                    id="email"
                                    type="text"
                                    className="white-text"
                                    name="email"
                                    value={form.email}/>
                                    <label htmlFor="email" className="white-text">E-mail</label>
                            </div>
                            <div className="input-field col s12">
                                <i className="material-icons prefix">lock</i>
                                <input
                                    onChange={changeHandler}
                                    id="password"
                                    type="password"
                                    className="white-text"
                                    name="password"
                                    value={form.password}/>
                                    <label htmlFor="password" className="white-text">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn waves-effect white black-text hoverable btn-large"
                            style={{ 'margin-right': '20px'}}
                            onClick={loginHandler}
                            disabled={isLoading}
                        >
                            Login</button>
                        <button
                            className="btn waves-effect lime lighten-1 black-text hoverable btn-large"
                            onClick={registerHandler}
                            disabled={isLoading}
                        >Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
