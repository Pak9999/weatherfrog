/* Component for making comparisons between current location and other locations (choosen) */


import React from "react";
import "./compare-temp.css";
import HistoricalWeatherChart from "./HistoricalWeatherChart";

interface CompareTempProps {
    userLatitude: number;
    userLongitude: number;
    selectedLocation: {
        name: string;
        latitude: number;
        longitude: number;
    };
}


const CompareTemp: React.FC<CompareTempProps> = ({ userLatitude, userLongitude, selectedLocation }) => {
    return (
        <>
            <div className="compare-temp">
                <div className="compare-temp-container">
                    <h3>Compare temperatures</h3>
                </div>
                <HistoricalWeatherChart 
                    initialLatitude={userLatitude}
                    initialLongitude={userLongitude}
                    initialLocationName={selectedLocation.name}
                />

                

            </div>
        </>
    );
}

export default CompareTemp;