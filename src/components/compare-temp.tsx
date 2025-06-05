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

// CompareTemp component
const CompareTemp: React.FC<CompareTempProps> = ({ userLatitude, userLongitude, selectedLocation }) => {
    return (
        <>
            <div className="compare-temp-container">
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