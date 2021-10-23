import React from 'react';
import {useMessage} from "../hooks/message.hook";

const flexStyle = {display: 'flex', alignItems: 'center', justifyContent: 'space-between'}

function LinkCard({ link }) {
    const message = useMessage();

    const copyToClipboard = (copyTxt) => {
        const el = document.createElement('textarea');
        el.value = copyTxt;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        message('Copied to the clipboard!', false);
    }

    return (
        <div className="calc__class">
            <div className="row valign-wrapper" style={{height: '100%'}}>
                <div className="col s8 offset-s2 ">
                    <div className="card deep-purple darken-1 white-text">
                        <div className="card-content">
                            <div className="card-title" style={{ textAlign: 'center'}}>Generated link!</div>
                        </div>
                        <div className="card-action">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">link</i>
                                    <label htmlFor="email" className="white-text">Link was created: {new Date(link.date).toLocaleDateString()}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">launch</i>
                                    <label htmlFor="email" className="white-text">Clicks on link: {link.clicks}</label>
                                </div>
                            </div>
                        </div>
                        <div className="card-action">
                            <div style={flexStyle}>
                                <div>
                                    <button
                                        onClick={() => copyToClipboard(link.from)}
                                        className="btn waves-effect white black-text hoverable"
                                        style={{ 'margin-right': '20px'}}
                                    >
                                        <i className="material-icons prefix">content_copy</i></button>Base URL:
                                </div>
                                <a
                                    href={link.from}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {link.from.length > 40 ? link.from.substr(0, 40) + ' ...' : link.from}</a>
                            </div>
                            <hr/>
                            <div style={flexStyle}>
                                <div>
                                    <button
                                        onClick={() => copyToClipboard(link.to)}
                                        style={{ 'margin-right': '20px'}}
                                        className="btn waves-effect lime lighten-1 black-text hoverable"
                                    >
                                        <i className="material-icons prefix">content_copy</i></button>Short URL:
                                </div>
                                <a
                                    href={link.to}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >  {link.to}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LinkCard;
