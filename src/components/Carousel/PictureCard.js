import React from 'react'
import './picture-card.css'
import Carousel from "react-elastic-carousel";
import Item from "./Item";

const cars = [
    { src: "http://resources.turo.com/f/81934/386x308/9bf274f19e/image_make_jeep-2x.jpg", name: "Jeep" },
    { src: "http://resources.turo.com/f/81934/386x308/7dcf9bff19/image_make_tesla-2x.jpg", name: "Tesla" },
    { src: "http://resources.turo.com/f/81934/386x308/ef857a4438/image_make_subaru-2x.jpg", name: "Subaru" },
    { src: "http://resources.turo.com/f/81934/386x308/7e7ce60797/image_make_porsche-2x.jpg", name: "Porche" },
    { src: "http://resources.turo.com/f/81934/386x308/0c4f5f5186/image_make_bmw-2x.jpg", name: "BMW" },
    { src: "http://resources.turo.com/f/81934/386x308/065308f2c4/image_make_mb-2x.jpg", name: "Benz" },
];

function PictureCard() {
    return (
            <>
            <div>
              {/*<h2>Browse by make</h2>*/}
              <Carousel itemsToShow={5}>
                {cars.map((car) => (
                       <Item key={car.name}>
                           <div className="pic-card">
                            <img src={car.src} alt="turo"/>
                            <p>{car.name}</p>
                        </div>
                       </Item> 
                    ))}
              </Carousel>
            </div>
          </>
    )
}

export default PictureCard
