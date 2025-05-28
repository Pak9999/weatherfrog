

import React from "react";
import "./medium-card-carousel.css";

import MediumCard from "./medium-card";


interface MediumCardCarouselProps {
    carouselType: "favorites" | "recent";
}

const MediumCardCarousel: React.FC<MediumCardCarouselProps> = ({ carouselType }) => {
    return (
        <div className="medium-card-carousel-container">
            <h3>{carouselType === "favorites" ? "Favorites" : "Recent"}</h3>
            <div className="medium-card-carousel">
                <MediumCard 
                locationName="Eslöv"
                city="Sweden"
                temperature="-20"
                weatherIcon="/src/assets/react.svg"
                maxTemp="25"
                minTemp="15"
                precipitation="12"
                wind="5"
                />
            </div>
        </div>
    );
};

export default MediumCardCarousel;