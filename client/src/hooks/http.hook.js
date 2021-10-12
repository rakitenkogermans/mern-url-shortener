import {useCallback, useState} from "react";

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);
        try {
            //Need to convert body to json, and write into headers that we are sending json
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(url, {method, body, headers})
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!');
            }

            setIsLoading(false);
            return data;
        } catch (e) {
            setIsLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null)
    }, []);
    return { isLoading, error, request, clearError};
}
