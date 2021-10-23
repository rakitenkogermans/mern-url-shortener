import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import Loader from "../components/Loader";
import LinkCard from "../components/LinkCard";

function DetailPage() {
    const {token} = useContext(AuthContext);
    const {request, isLoading} = useHttp();
    const [link, setLink] = useState(null);
    const linkId = useParams().id;

    const getLink = useCallback(async () => {
        try {
            const responseLink = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setLink(responseLink);
        } catch (e) {}
    }, [token, linkId, request]);

    useEffect(() => {
        getLink();
    }, [getLink]);

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <div>
            {!isLoading && link && <LinkCard link={link}/>}
        </div>
    );
}

export default DetailPage;
