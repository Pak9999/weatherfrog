/* Component for the main card, the location currently being displayed */
/* Holds main-card-head.tsx, main-card-details-list.tsx, hourly-list.tsx. weekly-list.tsx */

import React from "react";
import "./main-card.css";
import MainCardHead from "./main-card-head";
import MainCardDetails from "./main-card-details-list";
import MainCardCarousel from "./main-card-carousel";



const MainCard: React.FC = () => {
    return (
        <>
            <div className="main-card-container">
                <MainCardHead />
                <hr></hr>
                <MainCardDetails />
                <hr></hr>
                <MainCardCarousel />
                <hr></hr>
                <MainCardCarousel />
                {/* Add relevant to two above components (hourly + weekly) */}
            </div>
        </>
    );
}

export default MainCard;