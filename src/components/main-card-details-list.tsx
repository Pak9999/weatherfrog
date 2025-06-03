/* Table component that shows detailed weather information about location currently active in main-card */
/* Sunrise, Sunset, Precipitation, Wind, Humidity, UV index */


import React from "react";
import "./main-card-details-list.css";

interface MainCardDetailsProps {
    sunrise: string;
    sunset: string;
    precipitation: string;
    wind: string;
    humidity: string;
    uvIndex: string;
};


const MainCardDetails: React.FC<MainCardDetailsProps> = ({ sunrise, sunset, precipitation, wind, humidity, uvIndex }) => {
    return (
        <>
            <div className="main-card-details-container">
                <table className="main-card-details">
                    <tbody>
                        <tr className="sunrise">
                            <td><img src="/src/assets/sunrise.svg" alt="sunrise icon" className="detail-icon" id="sunrise-icon"></img></td>
                            <td><p>Sunrise</p></td>
                            <td><p>{sunrise}</p></td>
                        </tr>
                        <tr className="sunset">
                            <td><img src="/src/assets/sunset.svg" alt="sunset icon" className="detail-icon" id="sunset-icon"></img></td>
                            <td><p>Sunset</p></td>
                            <td><p>{sunset}</p></td>
                        </tr>
                        <tr className="precipitation">
                            <td><img src="src/assets/v4/umbrella.svg" alt="precipitation icon" className="detail-icon" id="umbrella-icon"></img></td>
                            <td><p>Precipitation</p></td>
                            <td><p>{precipitation} mm</p></td>
                        </tr>                        
                        <tr className="wind">
                            <td><img src="src/assets/v4/windy.svg" alt="wind icon" className="detail-icon" id="wind-icon"></img></td>
                            <td><p>Wind</p></td>
                            <td><p>{wind}</p></td>
                        </tr>
                        <tr className="humidity">
                            <td><img src="src/assets/humidity.svg" alt="humidity icon" className="detail-icon" id="humidity-icon"></img></td>
                            <td><p>Humidity</p></td>
                            <td><p>{humidity}%</p></td>
                        </tr>
                        <tr className="uv-index">
                            <td><img src="src/assets/v4/clear_day.svg" alt="uv-index icon" className="detail-icon" id="uv-index-icon"></img></td>
                            <td><p>Max UV Index</p></td>
                            <td><p>{uvIndex}</p></td>
                        </tr>
                    </tbody>
                    

                </table>

            </div>
        </>
    );
}

export default MainCardDetails;