import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);

    const login = useCallback((id, jwtToken) => {
        setUserId(id);
        setToken(jwtToken);
        localStorage.setItem(
            storageName,
            JSON.stringify({
                userId: id,
                token: jwtToken,
            })
        );
    }, []);

    const logout = useCallback(() => {
        setUserId(null);
        setToken(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = localStorage.getItem(storageName);
        if (data && data.token) {
            login(data.userId, data.token);
        }
    }, [login]);

    return { login, logout, userId, token };
};
