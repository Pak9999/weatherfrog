/* Table component that shows detailed weather information about location currently active in main-card */
/* Sunrise, Sunset, Precipitation, Wind, Humidity, UV index */


import React from "react";
import "./main-card-details-list.css";


const MainCardDetails: React.FC = () => {
    return (
        <>
            <div className="main-card-details-container">
                <table className="main-card-details">
                    <tbody>
                        <tr className="sunrise">
                            <td><img src="/src/assets/react.svg" alt="sunrise icon"></img></td>
                            <td><p>Sunrise</p></td>
                            <td><p>05:45</p></td>
                        </tr>
                        <tr className="sunset">
                            <td><img src="/src/assets/react.svg" alt="sunset icon"></img></td>
                            <td><p>Sunset</p></td>
                            <td><p>23:30</p></td>
                        </tr>
                        <tr className="precipitation">
                            <td><img src="/src/assets/react.svg" alt="umbrella icon"></img></td>
                            <td><p>Precipitation</p></td>
                            <td><p>0.02 mm</p></td>
                        </tr>
                        <tr className="wind">
                            <td><img src="/src/assets/react.svg" alt="wind icon"></img></td>
                            <td><p>Wind</p></td>
                            <td><p>12 m/s</p></td>
                        </tr>
                        <tr className="humidity">
                            <td><img src="/src/assets/react.svg" alt="humidity icon"></img></td>
                            <td><p>Humidity</p></td>
                            <td><p>74%</p></td>
                        </tr>
                        <tr className="uv-index">
                            <td><img src="/src/assets/react.svg" alt="uv-index icon"></img></td>
                            <td><p>UV Index</p></td>
                            <td><p>4</p></td>
                        </tr>
                    </tbody>
                    

                </table>

            </div>
        </>
    );
}

export default MainCardDetails;