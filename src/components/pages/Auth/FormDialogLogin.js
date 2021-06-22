import React from "react";
import {API_BASE_URL} from "../../../Constants";
import axios from "../../../axios";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import ClipLoader from "react-spinners/ClipLoader";
import DialogActions from "@material-ui/core/DialogActions";
import Utils from "../../../Utils";
import {toast} from "react-toastify";

export default function FormDialogLogin(props) {

        const [open, setOpen] = React.useState(false);
         const [successNotificaiton, setSuccessNotification] = React.useState(false);
        const [email, setEmail] = React.useState('');
        const [notification,setNotification] = React.useState('');
        const [password, setPassword] = React.useState('');
        const [credentialsError, setCredentialsError] = React.useState(false);
        const [loading, setLoading] = React.useState(false);
        const [color, setColor] = React.useState("#000");
        const [errMsg,seterrMsg] = React.useState("")
        const [show,setshow] = React.useState(false);

        const handleClickOpen = (e) => {
            e.preventDefault()
            setCredentialsError(false)
            setSuccessNotification(false)
            props.changeLoginDialog(true)
        };

        const handleClose = (e) => {
            e.preventDefault()
            setEmail('')
            setPassword('')
            props.changeLoginDialog(false)
            setCredentialsError(false)
        };

        const handleEmail=(event)=>{
            setEmail(event.target.value)
        }

        const handlePassword=(event)=>{
            setPassword(event.target.value)
        }

        let navigateToRegister=()=>{
            props.changeLoginDialog(false)
            props.changeRegisterDialog(true)
        }
        let navigateToForgotPass=()=>{
           props.changeLoginDialog(false)
           props.changeForgotDialog(true)
         }
    const sendEmailVerification=()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json'


            }
        }
        let url = `${API_BASE_URL}/account/send-email?email=${email}`
        setLoading(true)
        setCredentialsError(false)
        axios.get(url,config).then((response)=>{
            
            if(response.data.code == 200){
                setSuccessNotification(true)
                setNotification(response.data.response)
            }else{
                setCredentialsError(true)
                seterrMsg(response.data.response)
            }
        }).catch(err => {
            console.log(err.response)
            props.changeLoginDialog(true)
        })
    }
        const login=(user)=>{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    email:user.email,
                    password:user.password
                }
            }
            let url = `${API_BASE_URL}/user`
            setLoading(true)
            setCredentialsError(false)
            setSuccessNotification(false)
            axios.get(url,config).then((response)=>{
                console.log(response);
                if(response.data.code == 200){
                    localStorage.setItem('access', response.data.token);
                    let expireDate = new Date(response.data.expires)
                    let expires = expireDate.getTime()
                    localStorage.setItem('expires',expires)
                    props.setLoggedIn(true)
                    setCredentialsError(false)
                    setOpen(false)
                    setLoading(false)
                    props.changeLoginDialog(false)
                    toast.success("Login success!")
                }else{
                    setCredentialsError(true)
                    props.changeLoginDialog(true)
                    setLoading(false)
                    seterrMsg(response.data.response)
                }
            }).catch(err => {
                console.log(err.response)
                props.changeLoginDialog(true)
            })
        }
        return (
            <div>

                <button onClick={handleClickOpen} className="nav-btn">
                    Log in
                </button>

                <Dialog open={props.loginDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <button onClick={handleClose} className="nav-cross">X</button>
                    {successNotificaiton &&
                    <div className="nav-success">
                        <p>{notification}</p>
                        <CloseIcon className="closeicon" onClick={()=>{setSuccessNotification(false)}}/>
                    </div>
                    }
                    {credentialsError &&
                    <div className="nav-warning">
                        <p>{errMsg}</p>
                        {
                            errMsg==="Email not confirmed!"?<p style={{textAlign:"right",fontSize:"12px",textDecoration:"underline"}}>&nbsp;
                                <a style={{cursor:'pointer'}} onClick={sendEmailVerification} >Resend activation email</a>
                            </p>:null
                        }
                        <CloseIcon className="closeicon" onClick={()=>{setCredentialsError(false)}}/>
                    </div>
                    }


                        <div className="login-form">
                            <h2 className="center">Welcome Back</h2>
                            <span>Email</span>
                            <input type="email" placeholder="Email" name="email" onChange={handleEmail} required />
                            <span>Password</span>
                            <input type="password" placeholder="Password" name="password" onChange={handlePassword} required />
                            <p style={{textAlign:"right"}}>Forgot your password?&nbsp;
                                <a style={{cursor:'pointer',textDecoration:"underline"}} onClick={navigateToForgotPass} >Click here</a>
                            </p>



                        </div>

                    <DialogActions className="button-stack">

                        {email !== '' && password !== '' ?
                            <button onClick={() => {
                                let user={
                                    email,
                                    password
                                }
                                if (Utils.isValidEmail(email)){
                                    if (Utils.isValidPassword(password)){
                                        login(user)
                                        setCredentialsError(false)
                                    }else {
                                        setCredentialsError(true)
                                        seterrMsg("Password must be at least 6 characters!")
                                    }
                                }else {
                                    setCredentialsError(true)
                                    seterrMsg("Please provide a valid email!")
                                }

                            }} className="btn-long" style={{width:"70%"}}>
                                Login
                            </button>

                            :<button onClick={() => {

                            }} className="btn-long-disabled">
                                Login
                            </button>
                        }

                        { <h5>or</h5> }

                        <button onClick={handleClose} className="btn-long-transparent">
                            Continue with Apple
                        </button>

                        <button onClick={handleClose} className="btn-long-transparent">
                            Continue with Google
                        </button>

                        <button onClick={handleClose} className="btn-long-transparent">
                            Continue with Facebook
                        </button>

                        <p>Don't have an account?&nbsp;
                            <a style={{cursor:'pointer'}} onClick={navigateToRegister}>Sign up</a>
                        </p>
                    </DialogActions>
                </Dialog>
            </div>
        );



}