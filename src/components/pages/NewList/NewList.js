import React, {useEffect} from 'react'
import ListingNav from './ListingNav'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';
import './new-car.css'
import Avatar from '@material-ui/core/Avatar';
import AddressForm from './AddressForm';
import CarAvailablity from './CarAvailablity';
import CarDetails from './CarDetails';
import CarPhotos from './CarPhotos';
import Payout from './Payout';
import { Goal } from './Goal';
import Footer from '../Home/Footer.js'
import Select from 'react-select'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import axios from "../../../axios";
import {API_BASE_URL} from "../../../Constants";
import {useHistory} from 'react-router-dom'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewList() {
  const [openLogin,setOpenLogin] = React.useState(false)
  let handleOpenLogin=(value)=>{
    setOpenLogin(value)
  }
    return (
      <div>
      <ListingNav openLogin={openLogin} handleOpenLogin={handleOpenLogin}/>
      <SimpleAccordion handleOpenLogin={handleOpenLogin} />
      </div>
    )
}

export default NewList

const years = [
    { value: 2010, label: '2010' },
    { value: 2011, label: '2011' },
    { value: 2012, label: '2012' },
    { value: 2013, label: '2013' },
    { value: 2014, label: '2014' },
    { value: 2015, label: '2015' },
    { value: 2016, label: '2016' },
    { value: 2017, label: '2017' },
    { value: 2018, label: '2018' },
    { value: 2019, label: '2019' },
    { value: 2020, label: '2020' },
    { value: 2021, label: '2021' },
]
const useStyles = makeStyles((theme) => ({  
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export function SimpleAccordion(props) {
  
  const classes = useStyles();
  const [reload,setreload] = React.useState(false)
  const [makes,setMakes]= React.useState("")
  const [models,setModels]= React.useState("")
  const [model,setModel]= React.useState("")
  let history = useHistory()


    const getMakes = function (){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('access'),
            }
        };
        let url = `${API_BASE_URL}/cars/makers`

      let options = []
        axios.get(url,config).then((response)=>{
            if(response.data.code === 200){
                let arr = response.data.data.items

                for(let i=0;i<arr.length;i++){

                    options.push({value:arr[i].title,label:arr[i].title,id:arr[i].id})
                }
                setMakes(options)
            }else{

            }
        }).catch(err => {

        })
    }

    const getModels = function (e){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('access'),
            }
        };
        console.log(e)
        let url = `${API_BASE_URL}/cars/models?make_id=${e.id}`
        let options = []
        axios.get(url,config).then((response)=>{
            if(response.data.code === 200){
                let arr = response.data.data.items
                for(let i=0;i<arr.length;i++){
                    options.push({id:arr[i].id,value:arr[i].title,label:arr[i].title})
                }

                setModels(options)
            }else{

            }
        }).catch(err => {

        })
  }

  const [carModel,setCarModel] = React.useState("")
  const [carMake,setCarMake] = React.useState("")
  const [carLocation,setCarLocation] = React.useState("")
  const [year,setCarYear] = React.useState("")

  const [mobile_number,setmobile_number] = React.useState('')
  const onChange_mobile_number = e => setmobile_number(e.target.value)

  const [carAvailablityForm,setcarAvailabilityForm] = React.useState({
    advance_notice:'',
    min_trip_duration:'',
    max_trip_duration:''
  })

  const carAvailabilityHandler = (object) =>{
    
    setcarAvailabilityForm(
      {
    advance_notice:object.notice,
    min_trip_duration:object.min,
    max_trip_duration:object.max
      }
    )

    
  }

  const [carDetailsForm,setcarDetailsForm] = React.useState({
    car_features:'',
    car_desc:''
  })

  const carDetailsHandler = (object) =>{
    
    setcarDetailsForm(
      {
        car_features:object.featuresData,
        car_desc:object.description
      }
    )
    
  }

  const [photos,setphotos] = React.useState(null)

  const photosHandler = (pics) =>{
    console.log("INside handler")
    console.log(pics)
    setphotos(pics)
  }



  const [priceForm,setpriceForm] = React.useState({
    lowest_price:'',
    highest_price:0
  })

  const priceFormHandler = (object) =>{
    
    setpriceForm(
      {
        lowest_price:object.lowest,
        highest_price:object.highest
      }
    )

  }


const submitForm = ()=>{

    const data = new FormData()
    const  body = {}
    body["make_id"]=carMake
    body["year"]=year
    body["model_id"]=carModel
    body["car_location"]=carLocation
    body["mobile_number"]=mobile_number
    body["car_availability"]=carAvailablityForm
    body["car_description"]=carDetailsForm
    body["price_form"]=priceForm
    console.log(body)
    data.append("data",JSON.stringify(body))


    const config = {
        headers: {
            Authorization: localStorage.getItem("access"),


        }
    }


    let url = `${API_BASE_URL}/cars/listings`
    let imageUrlSingle = `${API_BASE_URL}/cars/listings/images/upload-single`
    let imageUrlMultiple = `${API_BASE_URL}/cars/listings/images/upload-multiple`


    console.log("DATA to be posted:")
  console.log({
    carAvailablityForm,carDetailsForm,priceForm,mobile_number,photos
  })
    console.log(body)
    axios.post(url,{data:body},config)
        .then((res)=>{
            const fileArr = Array.from(photos)
            console.log(fileArr)
            const code = res.data.code;
            const msg = res.data.status;
            if (code===200){
                toast.success(msg)
            }else {
                toast.error(msg)
            }
            if (fileArr){
                const data = new FormData()
                data.append("id",res.data.id)
                config.headers["Content-Type"]="multipart/form-data"
                if (fileArr.length===1){
                    console.log(fileArr.length===1)
                    data.append("file", photos[0])
                    axios.post(imageUrlSingle,data,config)
                        .then((resultData)=>{
                            const code = resultData.data.code;
                            const msg = resultData.data.status;
                            if (code===200){
                                toast.success(msg)
                                history.push("/")
                            }else {
                                toast.error(msg)
                            }
                        })
                }else {
                    if(fileArr.length>1){
                        for (let i=0;i<fileArr.length;i++){
                            data.append("files", photos[i])
                        }
                        axios.post(imageUrlMultiple,data,config)
                            .then((res)=>{
                                const code = res.data.code;
                                const msg = res.data.status;
                                if (code===200){
                                    toast.success(msg)
                                    history.push("/")
                                }else {
                                    toast.error(msg)
                                }
                            })
                    }
                }
            }
            console.log(res.data.data.id)
        })
        .catch(err => {
            console.log(err.response)
        })
  // axios.post(url,{data:data},config)
  //     .then((res)=>{
  //       console.log(res)
  //      // history.push("/")
  //     })
  //     .catch(err => {
  //       console.log(err.response)
  //
  // })
  
  //window.location.reload(false)

}
    useEffect(()=>{
        getMakes({})
    },[])

const [expanded,setExpanded] = React.useState({
  car:true,
  mobile_number:false,
  carAvailablity:false,
  carDetails:false,
  carPhotos:false,
  payout:false
})

let setCarAvailabilityExpand = (previousTab,currentTab)=>{
  setExpanded({carAvailablity:previousTab,carDetails:currentTab}) //false,true
  }
  
  let setCarDetailsExpand = (previousTab,currentTab)=>{
    setExpanded({carDetails:previousTab,carPhotos:currentTab}) //false,true
  }
  
  let setCarPhotosExpand = (previousTab,currentTab)=>{
    setExpanded({carPhotos:previousTab,payout:currentTab}) //false,true
  }
  
  let setPayoutExpand = (lastTab)=>{
    setExpanded({payout:lastTab}) //false,true
  }


  return (
    <div className="root" >

        {localStorage.getItem("access") ? 
        <>
        <h1>List your car</h1>
      <Accordion
      onChange={() => setExpanded({car:!expanded.car})}
       expanded={expanded.car}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}><h4>Your car</h4></Typography>
        </AccordionSummary>
        <AccordionDetails style={{display:"block",textAlign:"left"}}>
            <p>Make</p>
            <Select options={makes} onChange={(e)=>getModels(e)}/>
            <p>Model</p>
            {/*<Select options={models}  />*/}
           <Select options={models} onChange={(e)=>setCarModel(e)}/>
            <p>Year</p>
            <Select options={years} onChange={(e)=>setCarYear(e.label)}/>
            <Typography>
              <h5>Where is your car located?</h5>
                <GooglePlacesAutocomplete

                    autocompletionRequest={{
                        componentRestrictions: {
                            country: ['us', 'ca'],
                        }
                    }}
                    apiOptions={{ language: 'en', region: 'us' }}
                    selectProps={{
                        placeholder:"Type a location...",
                        value:carLocation,
                        onChange:setCarLocation
                    }}
                    apiKey="AIzaSyDDqsqjB6WrkHlUZgXBPCsHXXpZrBWfL1E"
                />
        

              {/*<AddressForm />*/}
              <button 
              onClick={()=>{
                setExpanded({car:false,mobile_number:true})
              }}
              className="btn-listing">
                Next
              </button>

          </Typography>
        </AccordionDetails>
      </Accordion>
      {/*<Accordion>*/}
      {/*  <AccordionSummary*/}
      {/*    expandIcon={<ExpandMoreIcon />}*/}
      {/*    aria-controls="panel2a-content"*/}
      {/*    id="panel2a-header"*/}
      {/*  >*/}
      {/*    <Typography className={classes.heading}><h4>MyProfile photo</h4></Typography>*/}
      {/*  </AccordionSummary>*/}
      {/*  <AccordionDetails>*/}
      {/*    <Typography className="flex">*/}
      {/*      <p><Avatar /></p>*/}
      {/*      <button className="btn-listing-photo">upload photo</button><p>or</p>*/}
      {/*      <button className="btn-listing-fb">use Facebook photo</button>*/}
      {/*    </Typography>*/}
      {/*  </AccordionDetails>*/}
      {/*</Accordion>*/}
      <Accordion 
      expanded={expanded.mobile_number}
      onChange={() => setExpanded({mobile_number:!expanded.mobile_number})}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}><h4>Mobile number</h4></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="form-flex-col">
              <p>Enter your phone number</p>
              <input type="text" name="mobile_number" onChange={e => onChange_mobile_number(e)} placeholder="Enter number"/>
            </div>
            <button 
            onClick={()=>{
              setExpanded({mobile_number:false,carAvailablity:true})
            }}
            className="btn-listing">Next</button>
            <a href="/">Change your number</a>
          </Typography>
        </AccordionDetails>
      </Accordion>
      {/*<Accordion>*/}
      {/*  <AccordionSummary*/}
      {/*    expandIcon={<ExpandMoreIcon />}*/}
      {/*    aria-controls="panel2a-content"*/}
      {/*    id="panel2a-header"*/}
      {/*  >*/}
      {/*    <Typography className={classes.heading}><h4>Driver's license</h4></Typography>*/}
      {/*  </AccordionSummary>*/}
      {/*  <AccordionDetails>*/}
      {/*    <Typography>*/}
      {/*      <div className="form-flex-row car-license">*/}
      {/*        <div className="form-flex-col">*/}
      {/*          <p>Issuing country</p>*/}
      {/*          <input type="text" />*/}
      {/*        </div>*/}
      {/*        <div className="form-flex-col">*/}
      {/*          <p>License number</p>*/}
      {/*          <input type="number" />*/}
      {/*        </div>*/}
      {/*        <div className="form-flex-col">*/}
      {/*          <p>State</p>*/}
      {/*          <input type="text" />*/}
      {/*        </div> */}
      {/*      </div>*/}
      {/*      <h5>Enter your name exactly as it appears on your driver's license</h5>*/}
      {/*      <div className="form-flex-row car-license">*/}
      {/*      <div className="form-flex-col">*/}
      {/*        <p>First name</p>*/}
      {/*        <input type="text" />*/}
      {/*      </div>*/}
      {/*        <div className="form-flex-col">*/}
      {/*          <p>Last name</p>*/}
      {/*          <input type="text" />*/}
      {/*        </div>*/}
      {/*        <div className="form-flex-col">*/}
      {/*          <p>Middle name</p>*/}
      {/*          <input type="text" />*/}
      {/*        </div>*/}
      {/*        */}
      {/*      </div>*/}
      {/*      <div className="form-flex-row car-license">*/}
      {/*      <div className="form-flex-col">*/}
      {/*        <h5>Expiration date</h5>*/}
      {/*        <input type="date" />*/}
      {/*      </div>*/}
      {/*      <div className="form-flex-col">*/}
      {/*        <h5>Date of birth</h5>*/}
      {/*        <input type="date" />*/}
      {/*      </div>*/}
      {/*        */}
      {/*      </div>*/}
      {/*      <button className="btn-listing">Next</button>*/}
      {/*    </Typography>*/}
      {/*  </AccordionDetails>*/}
      {/*</Accordion>*/}
      {/*<Accordion>*/}
      {/*  <AccordionSummary*/}
      {/*    expandIcon={<ExpandMoreIcon />}*/}
      {/*    aria-controls="panel2a-content"*/}
      {/*    id="panel2a-header"*/}
      {/*  >*/}
      {/*    <Typography className={classes.heading}><h4>Your goals</h4></Typography>*/}
      {/*  </AccordionSummary>*/}
      {/*  <AccordionDetails>*/}
      {/*    <Typography>*/}
      {/*      <Goal />*/}
      {/*    </Typography>*/}
      {/*  </AccordionDetails>*/}
      {/*</Accordion>*/}
      <Accordion 
      expanded={expanded.carAvailablity}
      onChange={() => setExpanded({carAvailablity:!expanded.carAvailablity})}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}><h4>Car availablity</h4></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <CarAvailablity 
            setCarAvailabilityExpand={setCarAvailabilityExpand}
            carAvailabilityHandler={carAvailabilityHandler} />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion 
      expanded={expanded.carDetails}
      onChange={() => setExpanded({carDetails:!expanded.carDetails})}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}><h4>Car Details</h4></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <CarDetails 
            setCarDetailsExpand={setCarDetailsExpand}
            carDetailsHandler={carDetailsHandler}/>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion 
      expanded={expanded.carPhotos}
      onChange={() => setExpanded({carPhotos:!expanded.carPhotos})}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}><h4>Car Photos</h4></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           <CarPhotos 
           setCarPhotosExpand={setCarPhotosExpand}
           photosHandler={photosHandler}/>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion 
      expanded={expanded.payout}
      onChange={() => setExpanded({payout:!expanded.payout})}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}><h4>Payout</h4></Typography>
        </AccordionSummary>
        <AccordionDetails style={{display:"block"}}>
          <Typography>
            <Payout 
            setPayoutExpand={setPayoutExpand}
            priceFormHandler={priceFormHandler} />
          </Typography>
        </AccordionDetails>
      </Accordion>
        <button 
        className={"btn-long"} 
        
        onClick = {() => 
          submitForm()
      }
        style={{width:"100%"}}>Continue</button>

        <Footer />
    

        </> : <h1>Please Login to host your car</h1>}

      </div>
  );
}



