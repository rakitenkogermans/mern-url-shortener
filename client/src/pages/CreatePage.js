import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

function CreatePage() {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {isLoading, error, request, clearError} = useHttp();
    const [link, setLink] = useState('');

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const enterHandler = async event => {
        if (event.key === 'Enter' || event.target.value === 'generate') {
            try {
                const data = await request('/api/link/generate', 'POST', { from: link }, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`)
            } catch (e) {}
        }
    }

    return (
        <div className="calc__class">
            <div className="row valign-wrapper" style={{height: '100%'}}>
                <div className="col s8 offset-s2 ">
                    <div className="card deep-purple darken-1 white-text">
                        <div className="card-content">
                            <div className="card-title" style={{ textAlign: 'center'}}>Paste your link here!</div>
                        </div>
                        <div className="card-action">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">link</i>
                                    <input
                                        onKeyPress={enterHandler}
                                        onChange={event => setLink(event.target.value)}
                                        id="email"
                                        type="text"
                                        className="white-text"
                                        name="email"
                                        value={link}/>
                                    <label htmlFor="email" className="white-text">Link</label>
                                </div>
                            </div>
                            <button
                                className="btn waves-effect white black-text hoverable btn-large"
                                value="generate"
                                onClick={enterHandler}
                            >
                                Generate</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default CreatePage;
