import React from "react";
import "./footer.css"


const Footer: React.FC = () => {
    return (
        <>
            <footer className="footer-bg">
                <section className="footer-content">
                    <h4>WetterFrosch</h4>
                    <p>Weather data provided by <a href="https://open-meteo.com/" target="_blank">open-meteo-com</a></p>
                    <div className="ad-footer">
                        <p>Additional footer text</p>
                        <a href="https://github.com/Pak9999/weatherfrog" target="_blank">Visit our Github</a>
                    </div>
                </section>

            </footer>
        </>
    );
}

export default Footer;