import React from "react";
import "./body.css"
import MainCard from "../components/main-card.tsx"

import CompareTemp from "../components/compare-temp.tsx";
import MediumCardCarousel from "../components/medium-card-carousel.tsx";


const Body: React.FC = () => {
    return (
        <>
            <div className="main-body">
                <MainCard />
                <MediumCardCarousel 
                carouselType="favorites" 
                />
                <MediumCardCarousel 
                carouselType="recent" 
                />
                <CompareTemp />
            </div>
        </>
    );
}

export default Body;