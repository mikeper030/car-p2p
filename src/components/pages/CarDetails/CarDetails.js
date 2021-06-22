import React, {useEffect} from 'react'
import Nav from '../Home/Nav.js'
import Footer from '../Home/Footer.js'
import DetailsNav from './DetailsNav.js'
import './car-details.css'
import { Avatar } from '@material-ui/core'
import CarDetailForm from './CarDetailForm.js'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import EmailIcon from '@material-ui/icons/Email';
import DescriptionIcon from '@material-ui/icons/Description';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CarDetailCarousel from './CarDetailCarousel.js';
import Map from './Map.js';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import StarRateIcon from '@material-ui/icons/StarRate';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import AirlineSeatReclineExtraIcon from '@material-ui/icons/AirlineSeatReclineExtra';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import EvStationIcon from '@material-ui/icons/EvStationOutlined';
import Features from './Features.js'
import Extras from './Extras.js'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Tabs from './Tabs'
import {useHistory, useLocation} from 'react-router-dom'
import axios from "../../../axios";
import {API_BASE_URL} from "../../../Constants";
import Marker from "./Marker";

const handleScroll = () => {
    if (window.scrollY > 20) {
        document.querySelector(".navbar-top").classList.add("visiblity");
        document.querySelector(".navbar-bottom").classList.remove("visibility");
        document.querySelector(".navbar-bottom").classList.add("navbar-fixed");
    } else {
        document.querySelector(".navbar-top").classList.remove("visibility");
        document.querySelector(".navbar-bottom").classList.add("visibility");
    }
};

function CarDetails() {
    const history = useHistory();
    let location = useLocation()
    const [itemData,setitemData] = React.useState({})
    const [mapData,setMapData] = React.useState({
        center : {lat:0,lng:0},
        title : '',
        marker : {lat:0,lng:0}

    })
    console.log(location.state)
    let item_id = location.state.item_id
    let query = location.state?location.state.params:""
    //Fetching data respective to the ID
    const fetchListing = () => {
        console.log("fetch details")
        let url = `${API_BASE_URL}/cars/listing?id=${item_id}&from=${query.from}&to=${query.to}`

        const config = {
            headers:{

            }
        }

        axios.get(url,config)
            .then(response =>{
                console.log("Response Data for the get listing data by ID")
                console.log(response.data.data.items[0])
                const data = response.data.data.items[0]
                console.log("fetch details")

                //Setting the state of respone data
                console.log(response.data.data.items[0])
                response.data.data.items[0].from=query.from
                response.data.data.items[0].to=query.to
                setitemData(response.data.data.items[0])
                setMapData({
                    title: data.maker_name+", "+data.model_name,
                    center: {lat: Number(data.lat),lng: Number(data.lng)},
                    marker: {lat: Number(data.lat),lng: Number(data.lng)},
                })
            })
            .catch(err=>{
                console.log(err.response)
            })
    }

    //To make sure data is fetched everytime user refreshes the page
    useEffect(()=>{
        fetchListing()

    },[])


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])

    return (
        <div>
            <div className="navbar-top"><Nav /></div>
            <div className="navbar-bottom visibility"><DetailsNav /></div>
            <div>
                <CarDetailCarousel images={itemData.images_json?itemData.images_json:""}/>
            </div>
            <div className="overview" id="overview">
                <div className="overview-left">
                    <table>
                        <tr className="overview-left-info">
                            <td>
                                <h4>The car</h4>
                            </td>
                            <td>
                                <h1>{itemData.maker_name+" "+itemData.model_name+" "+itemData.year}</h1>
                                <p className="features-flex">5.0 <StarRateIcon /> (51 trips)</p>
                                <div className="features-flex">
                                    {/*<table>*/}
                                    {/*<tr>*/}
                                    {/*    <td><LocalGasStationIcon /> <p>26 MPG</p></td>*/}
                                    {/*    <td><EvStationIcon /> <p>Gas (Premium)</p></td>*/}
                                    {/*</tr>*/}
                                    {/*<tr>*/}
                                    {/*    <td><AirlineSeatReclineExtraIcon /> <p>2 seats</p></td>*/}
                                    {/*    <td><DriveEtaIcon /> <p>2 doors</p></td>*/}
                                    {/*</tr>*/}
                                    {/*</table>  */}
                                </div>
                            </td>
                        </tr>
                        <tr className="overview-left-info">
                            <td>
                                <h4>Hosted by</h4>
                            </td>
                            <td className="details-flex">
                                <div className="features-flex">
                                    <Avatar src={itemData.profile_img_url} />
                                    <div className="owner-details">
                                        <h3>{itemData.user}</h3>
                                        {/*<p>Joined Jul 2018 . 4 trips</p>*/}
                                        {/*<p>Typically responds in 8 minutes</p>*/}
                                    </div>
                                </div>
                                <div className="details-flex">
                                    {/*<p>Paul has completed training on enhanced cleaning and disinfection practices.</p>*/}
                                    {/*<a href="/">Learn More</a>*/}
                                </div>
                            </td>
                        </tr>
                        <tr className="overview-left-info">
                            <td>
                                <h4>Description</h4>
                            </td>
                            <td>
                                <p>{itemData.description}</p>
                            </td>
                        </tr>
                        <tr className="overview-left-info" id="features">
                            <td>
                                <h4>Features</h4>
                            </td>
                            <td>
                                <tr>
                                    {/*<td><AddCircleOutlineIcon />Automatic transmission</td>*/}
                                    {/*<td><PlayCircleOutlineIcon />Apple CarPlay</td>*/}
                                </tr>
                                <Features />
                            </td>
                        </tr>
                        {/*<tr className="overview-left-info">*/}
                        {/*    <td>*/}
                        {/*        <h4>Extras</h4>*/}
                        {/*    </td>*/}
                        {/*    <td>*/}
                        {/*        <p>Add optional Extras to your trip at checkout.</p>*/}
                        {/*        <p><Extras /></p>*/}
                        {/*    </td>*/}
                        {/*</tr>*/}
                        <tr className="overview-left-info">
                            <td>
                                <h4>Guidelines</h4>
                            </td>
                            <td>
                                <p>No smoking.</p>
                            </td>
                        </tr>
                        <tr id="ratings" className="overview-left-info">
                            <td>
                                <h4>Ratings and Reviews</h4>
                            </td>
                            <td>
                                <div>
                                    <div className="features-flex">
                                        <h1>5.0</h1>
                                        <StarRateIcon />
                                        <p>(4 ratings)</p>
                                    </div>
                                </div>
                                <div className="overview-left-info">
                                    <Avatar />
                                    <div>
                                        <Box component="fieldset" mb={3} borderColor="transparent">
                                            <Typography component="legend"/>
                                            <Rating
                                                name="simple-controlled"
                                                // value={value}
                                                // onChange={(event, newValue) => {
                                                //     setValue(newValue);
                                                // }}
                                            />
                                        </Box>
                                        <p>Teresa, May 2018</p>
                                        <p>This was our first experience with GetACar and Paul made it an awesome one! We had a blast & will absolutely rent again!</p>
                                    </div>
                                </div>
                                <div className="line-separator"></div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className="overview-right">
                    <div>
                        <h2>{itemData.price? `${itemData.price}$ day`:"Not Available"}</h2>
                        <p>{itemData.total_price? `${itemData.total_price}$ total`:"Not Available"}</p>
                        {/*<div className="line-separator"></div>*/}
                    </div>
                    <div>
                        <CarDetailForm days={itemData.trip_days?itemData.trip_days:0} data={itemData} />
                        {/*<div className="line-separator"></div>*/}
                    </div>
                    <div>
                        <Tabs />
                        {/*<div className="line-separator"></div>*/}
                    </div>
                    <div className="links-flex">
                        <button className="padding-top-bottom nav-btn-outlined features-flex btn-long center">
                            <FavoriteBorderIcon/>
                            <p>Add to favourites</p>
                        </button>
                        <div className="padding-top-bottom">
                            <FacebookIcon/>
                            <TwitterIcon />
                            <EmailIcon />
                            <DescriptionIcon />
                        </div>
                        <div className="line-separator"></div>
                    </div>
                    <div className="links-flex">
                        {/*<a href="/">Report listing</a>*/}
                        {/*<a href="/">Cancellation policy</a>*/}
                    </div>
                </div>
            </div>

            <div id="location">{ mapData.center.lat!==0?
                <Map  zoom={11} data={mapData}/>:null
            }</div>
            <div className="overview-left-info"><Footer /></div>
        </div>
    )
}

export default CarDetails