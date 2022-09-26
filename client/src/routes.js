import { React } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage.js";
import { SignupPage } from "./pages/SignupPage.js";
import { Cart } from "./pages/Cart.js";
import { OrdersPage } from "./pages/OrdersPage.js";
import { ProductsPage } from "./pages/ProductsPage.js";

export const useRoutes = (isAuthentificated) => {
    if (isAuthentificated) {
        return (
            <Routes>
                <Route path="/" exact element={<ProductsPage isFiltered={false} />} />
                <Route path="/my-orders" element={<OrdersPage isFiltered={true} />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="login" exact element={<Navigate to="/" replace={true} />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path="/" exact element={<ProductsPage isFiltered={false} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/my-orders" exact element={<Navigate to="/login" replace={true} />} />
            <Route path="*" element={<Navigate to="/login" replace={true} />} />
        </Routes>
    );
};
