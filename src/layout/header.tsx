import React from "react";
import "./header.css"

const Header: React.FC = () => {
    return (
        <>
            <header className="header-bg">
                <section className="header-content">
                    <a href="#"><h1>Wetterfroch</h1></a>
                    <img src="#" alt="frog icon"></img>
                </section>
            </header>
        </>
    );
}

export default Header;