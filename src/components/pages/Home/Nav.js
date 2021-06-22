import React from 'react'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import './nav.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import FormDialogLogin from "../Auth/FormDialogLogin";
import FormDialogSignup from "../Auth/FormDialogSignup";
import axios from "../../../axios";
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import FormDialogForgotPass from "../Auth/FormDialogForgotPass";
import ClipLoader from "react-spinners/ClipLoader";
import {API_BASE_URL} from "../../../Constants";
import FormDialogTerms from "../Auth/FormDialogTerms";

export default function Nav() {
  
  const [isLoggedIn,setLoggedIn] = React.useState(false)
  const [errMsg,seterrMsg] = React.useState("")
  const [profileData,setProfileData] = React.useState({
    first_name : '',
    last_name : '',
    user_profile_img : null

  })
  const [loginState,setLoginState] = React.useState(false)
  const [registerState,setRegisterState] = React.useState(false)
  const [forgotPassState,setForgotPassState] = React.useState(false)
  const [termsState,setTermsState] = React.useState(false)

  const ErrorMessage = (value)=>{
    seterrMsg(value)
  }

  let changeForgotState=(value)=>{
    setForgotPassState(value)
  }
  let changeLoginState=(value)=>{
    setLoginState(value)
  }

  let changeRegisterState = (value)=>{
    setRegisterState(value)
  }
  let changeTermsState = (value)=>{
    setTermsState(value)
  }

  const {first_name,last_name,user_profile_img} = profileData

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
      first_name:response.data.data.first_name,
      last_name: response.data.data.last_name,
      user_profile_img:response.data.data.profile_img_url
    })
    
    console.log(user_profile_img)
  }).catch(err => {
    console.log(err.response)
  })
    
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
    
      load_user();
      if(isLoggedIn){
        fetch_UserDetails()
      }
      
},[isLoggedIn]);




const LogoutHandler = () =>{
  setLoggedIn(false)
  localStorage.removeItem('access')
}

return (
  <header className="nav">
    <div className="nav-left-link">
      <a href="/"> <div className="logo"><img src="https://firebasestorage.googleapis.com/v0/b/abpm-c7186.appspot.com/o/logo.png?alt=media&token=c9cf27ed-d9b6-4945-a33f-7c4507131534"/></div></a>
    </div>
 
   { isLoggedIn && profileData?
   <div className="loggedin-items">
     <div className="nav-right-links">
       <a className="custom_a" href="/new-list">List your car</a>
     <div className="nav-dropdown">
       <a href="/" className="custom_a">Hi, {first_name} {last_name}</a>
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

     <Avatar src={user_profile_img}>
     {first_name.slice(0,1).toUpperCase()}{last_name.slice(0,1).toUpperCase()}
  </Avatar>

   </div>
   :
   <div className="nav-right-links">
        <a className="custom_a" href="/new-list">List your car</a>
        <div className="nav-dropdown">
        <a className="custom_a" href="/">Learn More</a>
        <div className="dropdown-content">
        <ul>
        <li>How it works</li>
        <li>Insurance & Protection</li>
        <li>Carculator</li>
        <li>Host Tools</li>
        </ul>
        </div>
        </div>


        <FormDialogLogin 
        errMsg={errMsg}
        ErrorMessage={ErrorMessage}
        setLoggedIn={setLoggedIn} 
        loginDialog={loginState} 
        changeLoginDialog={changeLoginState} 
        registerDialog={registerState} 
        changeForgotDialog={changeForgotState} 
        changeRegisterDialog={changeRegisterState}/>

        <FormDialogSignup 
          errMsg={errMsg}
         ErrorMessage={ErrorMessage}
         loginDialog={loginState}
         changeLoginDialog={changeLoginState}
         registerDialog={registerState}
         changeRegisterDialog={changeRegisterState}
          termsDialog = {termsState}
          changeTermsDialog={changeTermsState}
        />

        <FormDialogForgotPass
        forgotPassDialog={forgotPassState} 
        changeLoginDialog={changeLoginState} 
        changeForgotDialog={changeForgotState}
        />
       <FormDialogTerms
         termsDialog={termsState}
         changeSignupDialog={changeRegisterState}
         changeTermsDialog={changeTermsState}
      />


     <PersonOutlineIcon/>
        
   
    </div>}

    </header>
  )
}





