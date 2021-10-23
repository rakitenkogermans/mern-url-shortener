import React from 'react';
import {Link} from "react-router-dom";

function LinksList({links}) {

    if (links.length === 0) {
        return <p className="card-title" style={{ textAlign: 'center'}}>Links not found!</p>
    }

    return (
        <>
            <table className="white-text highlight">
                <thead>
                <tr style={{borderBottom: '1px solid rgb(255 255 255 / 12%)'}}>
                    <th>Nr.</th>
                    <th>Base URL</th>
                    <th>Short URL</th>
                    <th/>
                </tr>
                </thead>

                <tbody>
                {links.map((link, id) => {
                    return (
                        <tr key={link._id} style={{borderBottom: '1px solid rgb(255 255 255 / 12%)'}}>
                            <td>{id + 1}</td>
                            <td>{link.from.length > 40 ? link.from.substr(0, 40) + ' ...' : link.from}</td>
                            <td>{link.to}</td>
                            <td>
                                <Link to={`/detail/${link._id}`}>Open</Link>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    );
}

export default LinksList;
