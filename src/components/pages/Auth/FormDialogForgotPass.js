import React from "react";
import {API_BASE_URL} from "../../../Constants";
import axios from "../../../axios";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import ClipLoader from "react-spinners/ClipLoader";
import DialogActions from "@material-ui/core/DialogActions";
import Utils from "../../../Utils";

export default function FormDialogForgotPass(props) {

    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');


    const handleClickOpen = (e) => {
        e.preventDefault()
        props.changeForgotDialog(true)
    };

    const handleClose = (e) => {
        e.preventDefault()
        setMessage('')
        props.changeForgotDialog(false)

    };

    const handleEmail=(event)=>{
        setEmail(event.target.value)
    }



    let navigateToLogin=()=>{
        props.changeLoginDialog(true)
        props.changeForgotDialog(false)
    }


    const resetPass=()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let url = `${API_BASE_URL}/account?action=password-reset&email=${email}`

        axios.get(url,config).then((response)=>{

            if(response.data.code === 200){
                setMessage("Reset password email sent successfully!")
            }else{

            }
        }).catch(err => {
            console.log(err.response)
            props.changeLoginDialog(true)
        })
    }
    return (
        <div>


            <Dialog open={props.forgotPassDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <button onClick={handleClose} className="nav-cross">X</button>

                    <div className="login-form">
                        <h2 className="center">Reset your password</h2>
                        <span>Email</span>
                        <input type="email" placeholder="Email" name="email" onChange={handleEmail} required />
                        <p>{message}</p>

                    </div>

                <DialogActions className="button-stack">

                    {email !== '' ?
                        <button style={{cursor:"pointer"}} onClick={() => {
                            let user={
                                email
                            }
                            if (Utils.isValidEmail(email)){
                                resetPass(user)
                            }else{
                                setMessage("Please provide a valid email!")
                            }

                        }} className="btn-long" >
                            Reset your password
                        </button>

                        :
                        <button  className="btn-long-disabled"  >
                            Reset your password
                        </button>
                    }


                    <p>
                        <a style={{cursor:'pointer'}} onClick={navigateToLogin}>Back to login&nbsp;</a>
                    </p>
                </DialogActions>
            </Dialog>
        </div>
    );



}