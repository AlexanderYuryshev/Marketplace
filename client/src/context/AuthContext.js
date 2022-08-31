import { createContext } from "react";

function def() {}

export const AuthContext = createContext({
    userId: null,
    login: def,
    logout: def,
    isAuthentificated: false,
    role: null,
    url: "",
});
