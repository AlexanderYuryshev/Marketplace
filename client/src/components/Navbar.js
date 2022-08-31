import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
    const auth = useContext(AuthContext);
    const logoutHandler = (event) => {
        event.preventDefault();
        auth.logout();
    };
    return (
        <nav className="navbar">
            <NavLink to="/">
                <h1 className="app-header">Marketplace</h1>
                </NavLink>
            <NavLink to="/my-orders">
                <h2 className="nav-item">My orders</h2>
            </NavLink>
            <NavLink to="/cart">
                <h2 className="nav-item">Cart</h2>
            </NavLink>
            {auth.isAuthentificated ? (
                <a href="/" onClick={logoutHandler}>
                    <h2 className="nav-item">Logout</h2>
                </a>
            ) : (
                <a href="/login">
                    <h2 className="nav-item">Login</h2>
                </a>
            )}
        </nav>
    );
};
