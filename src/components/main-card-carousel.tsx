/* Carousel component that holds cards (hourly or weekly) related to location currently active in main-card */


import React from "react";
import HourlyCard from "./hourly-card";
import WeeklyCard from "./weekly-card";

import "./main-card-carousel.css";


const MainCardCarousel: React.FC = () => {
    return (
        <>
            <div className="main-card-carousel-container">
                <h3>Title</h3>
                <div className="carousel-test">
                    <WeeklyCard />
                    <WeeklyCard />
                    <WeeklyCard />
                    <WeeklyCard />

                </div>

            </div>
        </>
    );
}

export default MainCardCarousel