import React, {useEffect} from 'react'
import Footer from '../Home/Footer';
import Nav from '../Home/Nav'
import './profile.css'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Rating from '@material-ui/lab/Rating';
import {API_BASE_URL} from "../../../Constants";
import axios from "../../../axios";
import Avatar from "@material-ui/core/Avatar";
import {toast} from "react-toastify";

function UserProfile() {


    const [profileData,setProfileData] = React.useState({
        profile_img_url:"",
        first_name:"",
        last_name:"",
        phone:"",
        id:"",
        file:""
    })
    const onChange = (e) =>setProfileData(
        { ...profileData, [e.target.name]: e.target.value
        })
        const onChange2 = (e) =>setProfileData(
        { ...profileData, ["file"]: e.target.files[0]
        })
    React.useEffect(() => {
        fetchProfile()
    },[]);
    const saveProfile = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('access')
            }
        };
        const data = new FormData()
        let d = {}
        d.phone = profileData.phone
        d.first_name = profileData.first_name
        d.last_name = profileData.last_name
        d.id = profileData.id
        data.append("user",JSON.stringify(d))
        if (profileData.file!==""){
            data.append("file",profileData.file)
        }
        let url = `${API_BASE_URL}/user`
        axios.put(url,data,config).then((response)=>{
           const code = response.data.code
            const msg = response.data.status
            if (code===200){
                toast.success(msg)
            }else {
                toast.error(msg)
            }

        }).catch(err => {
            console.log(err.response)
        })
    }
    const fetchProfile = () =>{
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
                profile_img_url:response.data.data.profile_img_url,
                last_name: response.data.data.last_name,
                first_name: response.data.data.first_name,
                phone: response.data.data.phone,
                id:response.data.data.id,
                createdAt: new Date(response.data.data.createdAt).toLocaleString()
            })

        }).catch(err => {
            console.log(err.response)
        })
    }


    return (
        <div>
            <Nav />
            <div className="profile-bg">
                <div className="profile-btn">
                    <button className="profile-primary-btn" onClick={saveProfile}>Save profile</button>
                    <button className="profile-secondary-btn">Cancel</button>
                </div>
            </div>
            <div className="profile-container">
                <div className="profile-left">
                    <div className="profile-flex-col">
                        <div className="profile-avatar">
                            {profileData.profile_img_url?<Avatar src={profileData.profile_img_url} style={{width:"100px",height:"100px",right:"30px"}}>
                            </Avatar>:<AccountCircleIcon src={profileData.profile_img_url} style={{ fontSize: 100, color:'rgb(137, 137, 137)'}}/>}
                        </div>
                        <div className="profile-btn-section">
                            <input accept="image/*" id="icon-button-file" type="file" name="file" style={{display:'none'}} onChange={onChange2} />
                            <label className="profile-primary-btn" htmlFor="icon-button-file">Change profile photo</label>
                            <p className="small-para">Add a face to the name. It’ll help other hosts and guests recognize you at the beginning of a trip.</p>
                        </div>
                    </div>
                    <div className="profile-flex-col">
                        <h1>User</h1>
                        <label className="small-para text-light">First name</label>
                        <input className="margin-zero" type="text" name="first_name" defaultValue={`${profileData.first_name?profileData.first_name:""}`}  onChange={onChange}/>
                        <label className="small-para text-light">Last name</label>
                        <input className="margin-zero" type="text" name="last_name" defaultValue={`${profileData.last_name?profileData.last_name:""}`}  onChange={onChange} />
                        <label className="small-para text-light" >Phone</label>
                        <input className="margin-zero" type="text" name="phone" defaultValue={`${profileData.phone?profileData.phone:""}`} onChange={onChange} />
                        <p className="small-para">{`Joined ${profileData.createdAt?profileData.createdAt:""}`}</p>
                    </div>


                </div>

            </div>
            <div className="flex footer-bg">
                <Footer />
            </div>
        </div>
    )
}

export default UserProfile
