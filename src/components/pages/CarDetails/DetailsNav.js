import React from 'react'
import './details-nav.css'

function DetailsNav() {
    return (
        <header className="scroll-nav">
            <div className="nav-left-link">
                    <div className="logo">
                        <a href="/">GetACar</a>
                    </div>
                    <div className="scroll-left-links">
                        <a href="#overview">OVERVIEW</a>
                        <a href="#features">FEATURES</a>
                        <a href="#ratings">REVIEWS</a>
                        <a href="#location">LOCATION</a>
                    </div>
            </div>
            {/*<div className="nav-right-links">*/}
            {/*    <p><strong>$price</strong>/day</p> */}
            {/*    <button className="scroll-nav-btn">Check Availability</button>   */}
            {/*</div>*/}
        </header>
    )
}

export default DetailsNav
