import React from "react";
import "./body.css"
import MainCard from "../components/main-card.tsx"
import FavoritesList from "../components/favorites-list.tsx";
import LastViewedList from "../components/last-viewed-list.tsx";


const Body: React.FC = () => {
    return (
        <>
            <div className="main-body">
                <MainCard />
                <FavoritesList />
                <LastViewedList />

            </div>
        </>
    );
}

export default Body;