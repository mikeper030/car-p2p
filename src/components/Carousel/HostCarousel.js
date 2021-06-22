import React from 'react'
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import './host-carousel.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const hosts = [
    { src: "https://d1zgdcrdir5wgt.cloudfront.net/media/driver/KiCmpor0QKyuAOo6SVHyAA.160x160.jpg", host_name: "Jackie D." },
    { src: "https://d1zgdcrdir5wgt.cloudfront.net/media/driver/5ipCHZgrQP-ONaMXoUr8oA.160x160.jpg", host_name: "Ernest P." },
    { src: "https://d1zgdcrdir5wgt.cloudfront.net/media/driver/RJw2wy5jS5eOTBDKnR2_bw.160x160.jpg", host_name: "Andrey K." },
    { src: "https://d1zgdcrdir5wgt.cloudfront.net/media/driver/tLxklNayTzWFKQLuBJcqPQ.160x160.jpg", host_name: "Manoosh A." },
    { src: "https://d1zgdcrdir5wgt.cloudfront.net/media/driver/awuNfOauRQKZYgzhuD_JRg.160x160.jpg", host_name: "Daren J." },
    { src: "https://d1zgdcrdir5wgt.cloudfront.net/media/driver/pHUSth-_TGGivQCL7QUVeQ.160x160.jpg", host_name: "Sarven Y." },
];


function HostCarousel() {
    return (
        <>
        <div>
          <h2>Top hosts on GetACar</h2>
          <Carousel itemsToShow={3}>
            {hosts.map((host) => (
                   <Item key={host.name}>
                       <Card>
                            <CardContent>
                                <div className="host-card">
                                    <div className="host">
                                        <img src={host.src} alt="turo hosts"/>
                                        <div className="host-info">
                                            <h3>{host.host_name}</h3>
                                            <span><strong>All-star host</strong></span>
                                            <span>Joined - May 2019</span>
                                        </div>
                                    </div>
                                    <div className="host-card-footer">
                                        <p>RATING</p>
                                        <span>Very easy to pick up and drop off, would definitely <strong>rent a car</strong> here again!</span>
                                        <span className="host-footer-info"><strong>Timethy H. - May 2021</strong></span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                   </Item> 
                ))}
          </Carousel>
        </div>
      </>
        
    );
}


export default HostCarousel
