import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import Loader from "../components/Loader";
import LinksList from "../components/LinksList";

function LinksPage() {
    const [links, setLinks] = useState([]);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);

    const fethcingLinks = useCallback(async () => {
        try {
            const response = await request('api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setLinks(response);
        } catch (e) {}
    }, [token, request]);

    useEffect(() => {
        fethcingLinks().then();
    }, [fethcingLinks])

    if (loading) {
        return <Loader />
    }
    return (
        <>
            {!loading && <LinksList links={links} />}
        </>
    );
}

export default LinksPage;
