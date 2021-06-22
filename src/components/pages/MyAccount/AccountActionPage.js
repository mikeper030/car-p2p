import Announcement from "../Home/Announcement";
import Nav from "../Home/Nav";
import Banner from "../Home/Banner";
import {Heading1, Heading2} from "../Home/Heading";
import PictureCard from "../../Carousel/PictureCard";
import DestinationCarousel from "../../Carousel/DestinationCarousel";
import ImageDesign from "../Home/ImageDesign";
import Experience from "../../Carousel/Experience";
import HostCarousel from "../../Carousel/HostCarousel";
import SupportCarousel from "../../Carousel/SupportSection";
import Footer from "../Home/Footer";
import {API_BASE_URL} from "../../../Constants";
import axios from "../../../axios";
import React from "react";
import Utils from "../../../Utils";

export default function AccountActionPage({ match, location }){

    console.log(location)
    const [pass1,setPass1] = React.useState("")
    const [pass2,setPass2] = React.useState("")
    const [message,setMessage] = React.useState("")
    const t = location.search.replace("?","").split("&");
    const action = t[0].split("=")[1]

    const handlePass1=(event)=>{
        setPass1(event.target.value)
    }

    const handlePass2=(event)=>{
        setPass2(event.target.value)
    }
    function submitNewPassword(hash) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }

        }

        let url = `${API_BASE_URL}/account/submit-password`

        axios.post(url,
            JSON.stringify({hash: hash,
                   password:pass1
             })
        ,config).then((response)=>{
            if(response.data.code === 200){
                setMessage("Password reset success!")
            }else{

            }
        }).catch(err => {

        })
    }

    if (action==="password-reset"){
        let hash = t[1].replace("token=","")

        return( <div >

                <input required placeholder="New password" type="password" onChange={handlePass1}
                       name="confirmPassword" />
                <input required placeholder="Confirm Password" type="password" onChange={handlePass2}

                       name="confirmPassword" />
                <button onClick={()=>{submitNewPassword(hash)}}> Reset password</button>
                <h2>{message}</h2>
            </div>


        )
    }else
      if (action==="verify-email"){

        let token = t[1].replace("token=","")
          console.log(token)
          const config = {
              headers: {
                  'Content-Type': 'application/json',

              }
          }
          let url = `${API_BASE_URL}/account/activate-email?token=${token}`

          axios.get(url,config).then((response)=>{
              console.log(response);
              if(response.data.code === 200){

              }else{

              }
          }).catch(err => {

          })
          return( <div className="App">

              <h2 style={{margin:"40px"}}>Thank you for verifying your email!</h2>
              <h2 style={{margin:"40px"}}>You can now access your account!</h2>

          </div>)
    }



}