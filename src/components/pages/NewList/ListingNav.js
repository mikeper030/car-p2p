import React from 'react'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import './listing.css'
import FormDialogLogin from "../Auth/FormDialogLogin"
import FormDialogSignup from "../Auth/FormDialogSignup"
import FormDialogForgotPass from "../Auth/FormDialogForgotPass";
import axios from "../../../axios";
import Avatar from '@material-ui/core/Avatar';
import {API_BASE_URL} from "../../../Constants";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import {Link, useHistory, useLocation} from "react-router-dom";
import FormDialogTerms from "../Auth/FormDialogTerms";


export default function ListingNav(props) {
    const [loginState,setLoginState] = React.useState(false)
    const [registerState,setRegisterState] = React.useState(false)
    const [forgotPassState,setForgotPassState] = React.useState(false)
    const [isLoggedIn,setLoggedIn] = React.useState(false)
    const [termsState,setTermsState] = React.useState(false)
    const [profileData,setProfileData] = React.useState({
      first_name : '',
      last_name : '',
      user_profile_img : null
  
    })
    let location = useLocation()
    console.log(location.state)
    let passedQ = location.state?location.state.params:""
    console.log(passedQ)
    //Query states
    const [query,setQuery] = React.useState({
      where:'',
      from:'',
      to:''
    })
    console.log(props)
    function p(number){return number.toString().padStart(2, '0');}//number to 2 digit, 0 padded string


    const {where,from,until} = query
    const onChange = (e) =>setQuery({ ...query, [e.target.name]: e.target.value })
    const {first_name,last_name} = profileData

    const handleSearch = ()=> {
      props.uriParamsHandler(query)

    }
    let changeTermsState = (value)=>{
        setTermsState(value)
    }
    
    const {user_profile_img} = profileData
    function setP(e) {
        console.log(e.label)
        setQuery({
            where:e.label
        })
    }
  const fetch_UserDetails = async ()=>{
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('access'),
          
      }
  };

  let url = `${API_BASE_URL}/user/details?token=${localStorage.getItem('access')}`
  console.log(url)
   axios.get(url,config).then((response)=>{
    setProfileData({
      user_profile_img:response.data.data.profile_img_url,
       last_name: response.data.data.last_name,
      first_name: response.data.data.first_name,
    })
    
    console.log(user_profile_img)
  }).catch(err => {
    console.log(err.response)
  })
    
}

React.useEffect(() => {


    if (passedQ.from && passedQ.to){
        let a = new Date(passedQ.from)
        let date1=`${a.getFullYear()}-${p(a.getMonth()+1)}-${p(a.getDate())}T${p(a.getHours())}:${p(a.getMinutes())}`;
        let t = new Date(passedQ.to)
        let  date2=`${t.getFullYear()}-${p(t.getMonth()+1)}-${p(t.getDate())}T${p(t.getHours())}:${p(t.getMinutes())}`;

        setQuery({from:date1,until:date2,where: passedQ.where})
        console.log(date1)
    }

  if(isLoggedIn){
    fetch_UserDetails()
  }
  
},[isLoggedIn]);


  let changeForgotState=(value)=>{
    setForgotPassState(value)
  }
  let changeLoginState=(value)=>{
    setLoginState(value)
  }

  let changeRegisterState = (value)=>{
    setRegisterState(value)
  }

  const LogoutHandler = () =>{
    props.handleOpenLogin(true)
    localStorage.removeItem('access')
  }

  const load_user = ()=> {
    
    let token = localStorage.getItem('access')
    if(token){
      setLoggedIn(true)
      let expires = localStorage.getItem("expires")
      let currentDate = new Date()
      let dateNow = currentDate.getTime()
      let result = expires - dateNow
      if(result < 0){
        localStorage.removeItem("access")
        localStorage.removeItem("expires")
        setLoginState(true)
        setLoggedIn(false)
      }
    }
    else{
      setLoggedIn(false)
    } 
  }

  

  React.useEffect(() => {
    {console.log('openLogin',props.openLogin)}
    load_user();
},[isLoggedIn]);

React.useEffect(()=>{

    if(localStorage.getItem("access")){
      props.handleOpenLogin(false)
      setLoginState(true)
    }
    else{
        props.handleOpenLogin(true)
        //setLoginState(false)
    }
    

},[localStorage.getItem("access")])


    return (
        <header className="nav">
            
            <div className="nav-left-link">
                <div className="logo"><a href="/">GetACar</a></div>
                <div className="listing-search">
                    <div>Where</div>
                    <GooglePlacesAutocomplete
                        autocompletionRequest={{
                            componentRestrictions: {
                                country: ['us', 'ca'],
                            }
                        }}
                        apiOptions={{ language: 'en', region: 'us' }}
                        selectProps={{
                            onChange:setP,
                            placeholder: where?where:"Where"
                        }}
                        apiKey="AIzaSyDDqsqjB6WrkHlUZgXBPCsHXXpZrBWfL1E"
                    />
                    <div>From</div>
                    <div className="listing-nav-input">
                        <input 
                        name="from"
                        value={from}
                        onChange={e=>onChange(e)}
                        type="datetime-local"
                        placeholder="date"
                         />
                    </div>
                    <div>Until</div>
                    <div className="listing-nav-input">
                        <input 
                        name="until"
                        value={until}
                        onChange={e=>onChange(e)}
                        type="datetime-local" 
                        placeholder="date" />
                    </div>
                    <div className="search-btn">
                        <button onClick={handleSearch}
                            className="search-button"><SearchIcon />
                        </button>
                    </div>
                    {localStorage.getItem("access") == null ? 
                    <div className="nav-right-links">
                        <a className="custom_a" href="/new-list">List your car</a>
                    <FormDialogLogin 
                     handleOpenLogin={props.handleOpenLogin}
                    setLoggedIn={setLoggedIn}
                     loginDialog={loginState}
                     changeLoginDialog={changeLoginState}
                     registerDialog={registerState}
                     changeForgotDialog={changeForgotState}
                     changeRegisterDialog={changeRegisterState}
                    />
                    <FormDialogSignup
                        changeLoginDialog={changeLoginState}
                        registerDialog={registerState}
                        changeTermsDialog={changeTermsState}
                        changeRegisterDialog={changeRegisterState}
                    />
                        <FormDialogTerms
                            termsDialog={termsState}
                            changeSignupDialog={changeRegisterState}
                            changeTermsDialog={changeTermsState}
                        />
                        <FormDialogForgotPass  forgotPassDialog={forgotPassState} changeLoginDialog={changeLoginState} changeForgotDialog={changeForgotState}/>
                    </div>
                    :
                        <div className="loggedin-items">
                            <div className="nav-right-links">
                                <a className="custom_a" href="/new-list">List your car</a>
                                <div className="nav-dropdown">
                                    <a className="custom_a" href="/">Hi, {first_name} {last_name}</a>
                                    <div className="dropdown-content">
                                        <ul>
                                            <a href="/my-bookings" className="a_no_dec"> <li>My Trips</li></a>
                                            <a href="/my-listings" className="a_no_dec"> <li>My Listings</li></a>
                                            <a href="/my-account" className="a_no_dec"> <li>My Account</li></a>
                                            <li onClick={LogoutHandler}>Log out</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/*<Avatar src={user_profile_img}>*/}
                            {/*    {first_name.slice(0,1).toUpperCase()}{last_name.slice(0,1).toUpperCase()}*/}
                            {/*</Avatar>*/}

                        </div>
                    }
                </div>
            </div>
            <div className="nav-right-links">
                {user_profile_img?
                    <Avatar src={user_profile_img}>
                </Avatar>:<PersonOutlineIcon/>
                }
            </div>
        </header>
    )
}