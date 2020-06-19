import { useEffect } from "react";

export default function useInterval (callback, delay) {
    useEffect(() => {
        let id;
        const f = () => {
            callback();
            id = setTimeout(f, delay);
        }
        id = setTimeout(f, delay);
        return () => clearTimeout(id);
    });
}
