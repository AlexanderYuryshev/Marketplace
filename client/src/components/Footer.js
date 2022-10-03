import { BsFacebook, BsInstagram } from "react-icons/bs";
import { NavLink } from "react-router-dom";

export const Footer = () => {
    return (
        <section className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <li>
                        <NavLink to="/">Shop</NavLink>
                    </li>
                    <li>
                        <NavLink to="/">About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/">FAQ</NavLink>
                    </li>
                    <li>
                        <NavLink to="/">Contact</NavLink>
                    </li>
                </div>
                <div className="footer-content">
                    <li>
                        <NavLink to="/">Shipping & Returns</NavLink>
                    </li>
                    <li>
                        <NavLink to="/">Store policy</NavLink>
                    </li>
                    <li>
                        <NavLink to="/">Payment methods</NavLink>
                    </li>
                </div>
                <div className="footer-content">
                    <li>
                        <NavLink to="/">Contact</NavLink>
                    </li>
                    <li>
                        <NavLink to="/">+7-123-456-78-90</NavLink>
                    </li>
                </div>
                <div className="footer-content">
                    <li>
                        <NavLink to="/">
                            <img
                                src="./VK_Monochrome_Compact_Logo.svg"
                                alt="VK_logo"
                                width={30 + "px"}
                                height={30 + "px"}
                            />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/">
                            <BsFacebook className="logo" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/">
                            <BsInstagram className="logo" />
                        </NavLink>
                    </li>
                </div>
            </div>
        </section>
    );
};
