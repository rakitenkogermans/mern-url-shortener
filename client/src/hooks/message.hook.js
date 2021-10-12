import {useCallback} from "react";

export const useMessage = () => {
    return useCallback((text, error) => {
        if (window.M && text) {
            window.M.toast({ html: text, classes: error ? "red darken-2" : "green accent-4" });
        }
    }, [])
}
