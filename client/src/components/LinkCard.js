import React from 'react';

function LinkCard({ link }) {
    console.log(link);
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
                            <a
                                href={link.from}
                                target="_blank"
                                className="btn waves-effect white black-text hoverable btn-large"
                                style={{ 'margin-right': '20px'}}
                            >
                                Base URL</a>
                            <a
                                href={link.to}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn waves-effect lime lighten-1 black-text hoverable btn-large"
                            >
                                Short URL</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LinkCard;
