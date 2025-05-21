import React from "react";
import "./footer.css"


const Footer: React.FC = () => {
    return (
        <>
            <footer className="footer-bg">
                <section className="footer-content">
                    <h4>WetterFroch</h4>
                    <p>Data provided by <a href="https://open-meteo.com/">open-meteo-com</a></p>
                    <div className="ad-footer">
                        <p>Additional footer text</p>
                        <a href="#">Visit our Github</a>
                    </div>
                </section>

            </footer>
        </>
    );
}

export default Footer;