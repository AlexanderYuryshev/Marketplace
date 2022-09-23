import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { CgLogOut, CgLogIn } from "react-icons/cg";
import { BsListUl } from "react-icons/bs";

export const Navbar = () => {
    const auth = useContext(AuthContext);
    const logoutHandler = (event) => {
        event.preventDefault();
        auth.logout();
    };
    let [navbarMenuClasses, setNavbarMenuClasses] = useState("navbar-menu");

    const clickHandler = () => {
        if (navbarMenuClasses.includes("active")) {
            setNavbarMenuClasses("navbar-menu");
        } else {
            setNavbarMenuClasses("navbar-menu active");
        }
    };

    useEffect(() => {
        const scrollHandler = () => {
            if (navbarMenuClasses.includes("active")) {
                setNavbarMenuClasses("navbar-menu");
                console.log("Removed");
            }
        };
        window.addEventListener("scroll", scrollHandler);
        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    });

    return (
        <nav className="navbar">
            <NavLink to="/">
                <h1 className="app-header">Marketplace</h1>
            </NavLink>
            <AiOutlineMenu id="menu" onClick={clickHandler} />
            <div className={navbarMenuClasses}>
                <NavLink to="/">
                    <button className="nav-item">Shop</button>
                </NavLink>
                <NavLink to="/">
                    <button className="nav-item">About</button>
                </NavLink>
                <NavLink to="/">
                    <button className="nav-item">FAQ</button>
                </NavLink>
                <NavLink to="/">
                    <button className="nav-item">Contact</button>
                </NavLink>
            </div>
            <div className="navbar-icons">
                {auth.isAuthentificated && (
                    <NavLink to="/my-orders">
                        <BsListUl className="nav-button"/>
                    </NavLink>
                )}
                {auth.isAuthentificated && (
                    <NavLink to="/cart">
                        <AiOutlineShoppingCart className="nav-button"/>
                    </NavLink>
                )}
                {auth.isAuthentificated ? (
                    <a href="/" onClick={logoutHandler}>
                        <CgLogIn className="nav-button" />
                    </a>
                ) : (
                    <a href="/login">
                        <CgLogOut className="nav-button" />
                    </a>
                )}
            </div>
        </nav>
    );
};
