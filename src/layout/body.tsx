import React from "react";
import "./body.css"
import MainCard from "../components/main-card.tsx"
import FavoritesList from "../components/favorites-list.tsx";
import LastViewedList from "../components/last-viewed-list.tsx";
import CompareTemp from "../components/compare-temp.tsx";


const Body: React.FC = () => {
    return (
        <>
            <div className="main-body">
                <MainCard />
                <FavoritesList />
                <LastViewedList />
                <CompareTemp />
            </div>
        </>
    );
}

export default Body;