/* Carousel component that holds cards (hourly or weekly) related to location currently active in main-card */


import React from "react";


const MainCardCarousel: React.FC = () => {
    return (
        <>
            <div className="main-card-carousel-container">
                <h3>Title</h3>
                <div className="carousel">
                    <p>Place hourly or weekly cards here</p>
                </div>

            </div>
        </>
    );
}

export default MainCardCarousel