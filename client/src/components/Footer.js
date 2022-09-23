import { BsFacebook, BsInstagram } from "react-icons/bs";

export const Footer = () => {
    return (
        <section className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <li>
                        <a href="/">Shop</a>
                    </li>
                    <li>
                        <a href="/">About</a>
                    </li>
                    <li>
                        <a href="/">FAQ</a>
                    </li>
                    <li>
                        <a href="/">Contact</a>
                    </li>
                </div>
                <div className="footer-content">
                    <li>
                        <a href="/">Shipping & Returns</a>
                    </li>
                    <li>
                        <a href="/">Store policy</a>
                    </li>
                    <li>
                        <a href="/">Payment methods</a>
                    </li>
                </div>
                <div className="footer-content">
                    <li>
                        <a href="/">Contact</a>
                    </li>
                    <li>
                        <a href="/">+7-123-456-78-90</a>
                    </li>
                </div>
                <div className="footer-content">
                    <li>
                        <a href="/">
                            <img src="./VK_Monochrome_Compact_Logo.svg" alt="VK_logo" width={30+"px"} height={30+"px"}/>
                        </a>
                    </li>
                    <li>
                        <BsFacebook className="logo" />
                    </li>
                    <li>
                        <BsInstagram className="logo" />
                    </li>
                </div>
            </div>
        </section>
    );
};
