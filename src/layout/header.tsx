import React from "react";
import "./header.css"

const Header: React.FC = () => {
    return (
        <>
            <header className="header-bg">
                <section className="header-content">
                    <a href="/"><h1>Wetterfr<img className="WF" src="src/assets/WF_logo.webp" alt="frog icon"></img>sch</h1></a>
                </section>
            </header>
        </>
    );
}

export default Header;