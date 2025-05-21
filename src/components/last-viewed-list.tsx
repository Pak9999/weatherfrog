/* Carrousel component that displays cards with five latest viewed locations except for current */
/* Holds medium-card.tsx components */

import React from "react";
import "./last-viewed-list.css"


const LastViewedList: React.FC = () => {
    return (
        <>
            <div className="last-viewed-container">
                <h3>Last Viewed</h3>
                <div className="last-viewed-carousel">
                    <p>Here is a placeholder</p>
                </div>

            </div>
        </>
    );
}

export default LastViewedList;