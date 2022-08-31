import { useState, useCallback, useEffect } from "react"

const storageName = 'UserId';

export const useAuth = () => {
    const [userId, setUserId] = useState(null);

    const login = useCallback((id) => {
        setUserId(id);
        localStorage.setItem(storageName, id);
    }, []);

    const logout = useCallback(() => {
        setUserId(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = localStorage.getItem(storageName);
        if (data) {
            login(data);
        }
    }, [login]);

    return {login, logout, userId};
}