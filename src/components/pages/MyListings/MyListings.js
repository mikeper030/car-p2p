import React from 'react'
import './my-listing.css'
import Nav from '../Home/Nav'
import Footer from '../Home/Footer'
import { Card } from '@material-ui/core'
import {API_BASE_URL} from "../../../Constants";
import axios from "../../../axios";
import {toast} from "react-toastify";

const carInfo = []

const MyListings = () => {
    const [carInfo,setCarInfo] = React.useState([])

    const fetchListings = (e) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('access')
            }
        };
        let url = `${API_BASE_URL}/cars/listings/user`
        axios.get(url, config).then((response) => {
            const code = response.data.code;
            if (code === 200) {
                for (let i = 0; i < response.data.data.length; i++) {
                    if (response.data.data[i].images_json !== "") {
                        const img_src = JSON.parse(response.data.data[i].images_json)["img1"]
                        response.data.data[i]["img"] = "http://185.241.5.135:3000/uploads/images/cars/" + img_src
                    }
                }

                console.log(response.data.data)
                setCarInfo(response.data.data)
            } else {
                toast.error(response.data.status)
            }

        }).catch(err => {
            console.log(err.response)
        })

    }
    React.useEffect(() => {
        fetchListings()
    },[]);
    return (
        <div>
            <Nav />
            <h2 className="flex">Your listings</h2>
            {carInfo.map(car=>(
                <div className="listing-card">
                    <Card>
                        <div className="bookings-container">
                            <div className="bookings-left">
                                <img src={car.img?car.img:"https://i.stack.imgur.com/y9DpT.jpg"} alt="car"/>
                            </div>
                            <div className="bookings-right">
                                <div className="text-light">
                                    <p><span>Price per day: </span>{`${car.price?car.price:""}$`}</p>

                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            ))}
            <div className="flex footer-bg">
                <Footer />
            </div>
        </div>
    )
}

export default MyListings
