import React from "react";
import "./body.css"
import MainCard from "../components/main-card.tsx"



const Body: React.FC = () => {
    return (
        <>
            <div className="main-body">
                <MainCard />
            </div>
        </>
    );
}

export default Body;