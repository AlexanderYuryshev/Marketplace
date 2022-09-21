import { React, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes.js";
import { useAuth } from "./hooks/auth.hook.js";
import { AuthContext } from "./context/AuthContext.js";
import { Navbar } from "./components/Navbar.js";
import store from "./redux/store.js";
import { ADD_PRODUCTS, SET_CART } from "./redux/actions.js";

import "./App.css";
import { useHttp } from "./hooks/http.hook.js";

function App() {
    const { login, logout, userId, token } = useAuth();
    const { request } = useHttp();
    const isAuthentificated = !!userId;
    const routes = useRoutes(isAuthentificated);
    const url = "http://localhost:5005/";

    const getProducts = async () => {
        try {
            const data = await request(`${url}products`, "GET", null);
            if (data) {
                store.dispatch(ADD_PRODUCTS(data));
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getCartProducts = async () => {
        try {
            const data = await request(`${url}cart`, "GET", null, { UserId: userId });
            if (data) {
                const sortedPurchases = data.Purchases.sort((a, b) => a.ProductId - b.ProductId);
                store.dispatch(SET_CART(sortedPurchases));
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getProducts();
        if (userId) {
            getCartProducts();
        }
    });

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                userId,
                isAuthentificated,
                url,
            }}
        >
            <Router>
                <Navbar />
                <div className="container dark">{routes}</div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
