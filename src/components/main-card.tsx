/* Component for the main card, the location currently being displayed */
/* Holds main-card-head.tsx, main-card-details-list.tsx, hourly-list.tsx. weekly-list.tsx */

import React from "react";
import "./main-card.css";
import MainCardHead from "./main-card-head";
import MainCardDetails from "./main-card-details-list";


const MainCard: React.FC = () => {
    return (
        <>
            <div className="main-card">
                <MainCardHead />
                <MainCardDetails />
                {/* <MainCardCarousel />
                <MainCardCarousel /> */}
                {/* Add relevant to two above components (hourly + weekly) */}
                <br></br>
            </div>
        </>
    );
}

export default MainCard;