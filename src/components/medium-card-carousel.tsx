import React from "react";
import useEmblaCarousel from 'embla-carousel-react';
import "./medium-card-carousel.css";
import MediumCard from "./medium-card";


interface MediumCardCarouselProps {
    carouselType: "favorites" | "recent";
}

const MediumCardCarousel: React.FC<MediumCardCarouselProps> = ({ carouselType }) => {
    const [emblaRef] = useEmblaCarousel({
            align: 'start',
            containScroll: 'trimSnaps',
            dragFree: true,
            loop: false
        });
    
    return (
        <div className="medium-card-carousel-container">
            <h3>{carouselType === "favorites" ? "Favorites" : "Recent"}</h3>
            <div className="medium-embla" ref={emblaRef}>
                <div className="medium-embla__container">
                    {carouselType === "favorites" ? (
                        <>
                            <div className="medium-embla__slide">
                                <MediumCard
                                    locationName="Eslöv"
                                    city="Sweden"
                                    temperature="100"
                                    weatherIcon="/src/assets/react.svg"
                                    maxTemp="25"
                                    minTemp="15"
                                    precipitation="12"
                                    wind="5"
                                />
                            </div>
                            <div className="medium-embla__slide">
                                <MediumCard
                                    locationName="Eslöv"
                                    city="Sweden"
                                    temperature="20"
                                    weatherIcon="/src/assets/react.svg"
                                    maxTemp="25"
                                    minTemp="15"
                                    precipitation="12"
                                    wind="5"
                                />
                            </div> 
                            <div className="medium-embla__slide">
                                <MediumCard
                                    locationName="Eslöv"
                                    city="Sweden"
                                    temperature="20"
                                    weatherIcon="/src/assets/react.svg"
                                    maxTemp="25"
                                    minTemp="15"
                                    precipitation="12"
                                    wind="5"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="medium-embla__slide">
                                <MediumCard
                                    locationName="Eslöv"
                                    city="Sweden"
                                    temperature="-50"
                                    weatherIcon="/src/assets/react.svg"
                                    maxTemp="25"
                                    minTemp="15"
                                    precipitation="12"
                                    wind="5"
                                />
                            </div>
                            <div className="medium-embla__slide">
                                <MediumCard
                                    locationName="Eslöv"
                                    city="Sweden"
                                    temperature="20"
                                    weatherIcon="/src/assets/react.svg"
                                    maxTemp="25"
                                    minTemp="15"
                                    precipitation="12"
                                    wind="5"
                                />
                            </div>
                            <div className="medium-embla__slide">
                                <MediumCard
                                    locationName="Eslöv"
                                    city="Sweden"
                                    temperature="20"
                                    weatherIcon="/src/assets/react.svg"
                                    maxTemp="25"
                                    minTemp="15"
                                    precipitation="12"
                                    wind="5"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MediumCardCarousel;