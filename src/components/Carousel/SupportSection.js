import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './support.css'

function SupportCarousel() {
    return (
        <div className="demo-bg">
            <div className="demo">
            <Carousel autoPlay infiniteLoop>
                <div>
                    <img alt="turo"  src="https://resources.turo.com/f/81934/920x502/4ef0c8aebb/dennis-b-2x.jpg" />
                </div>
                <div>
                    <img alt="turo" src="https://resources.turo.com/f/81934/920x502/aa535d2a91/michael-c-2x.jpg" />
                </div>
                <div>
                    <img alt="turo" src="https://resources.turo.com/f/81934/920x502/56c9fd10ee/summer-p-2x.jpg" />
                </div>
                <div>
                    <img alt="turo" src="https://resources.turo.com/f/81934/920x502/81e2193486/vernon-b-2x.jpg" />
                </div>
            </Carousel>
            <div className="demo-text">
                <h2>Support aspiring entrepreneurs</h2>
                <p>Discover the GetACar Seed Initiative, a program that empowers historically disenfranchised entrepreneurs with access to wealth-building opportunities, so anyone, regardless of color, gender, or creed, can start building a small business on Turo and pave their own path towards financial wellness.</p>
                <div className="demo-links">
                    <button>Support a Seed Host</button>
                    <a href="/">Learn More</a>
                </div>
            </div>
        </div>
        </div>
    )
}

export default SupportCarousel