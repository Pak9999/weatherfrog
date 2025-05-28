/* Carousel component that holds cards (hourly or weekly) related to location currently active in main-card */


import React from "react";
import useEmblaCarousel from 'embla-carousel-react';
import WeeklyCard from "./weekly-card";

import "./main-card-carousel.css";


const MainCardCarousel: React.FC = () => {
    const [emblaRef] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true
    });

    return (
        <div className="main-card-carousel-container">
            <h3>Title</h3>
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    <div className="embla__slide">
                        <WeeklyCard />
                    </div>
                    <div className="embla__slide">
                        <WeeklyCard />
                    </div>
                    <div className="embla__slide">
                        <WeeklyCard />
                    </div>
                    <div className="embla__slide">
                        <WeeklyCard />
                    </div>
                     <div className="embla__slide">
                        <WeeklyCard />
                    </div>
                    <div className="embla__slide">
                        <WeeklyCard />
                    </div>
                    <div className="embla__slide">
                        <WeeklyCard />
                    </div>
                    <div className="embla__slide">
                        <WeeklyCard />
                    </div>
                     <div className="embla__slide">
                        <WeeklyCard />
                    </div>
                    <div className="embla__slide">
                        <WeeklyCard />
                    </div>
                    <div className="embla__slide">
                        <WeeklyCard />
                    </div>
                    <div className="embla__slide">
                        <WeeklyCard />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainCardCarousel;