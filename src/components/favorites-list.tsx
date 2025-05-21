/* Carrousel component that displays cards with favorite locations */
/* Holds medium-card.tsx components */

import React from "react";
import "./favorites-list.css"


const FavoritesList: React.FC = () => {
    return (
        <>
            <div className="favorites-container">
                <h3>Favorites</h3>
                <div className="favorites-carousel">
                    <p>Here is a placeholder</p>
                </div>

            </div>
        </>
    );
}

export default FavoritesList;