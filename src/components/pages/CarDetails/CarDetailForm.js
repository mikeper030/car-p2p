import React from 'react'
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import DialogActions from "@material-ui/core/DialogActions";
import Utils from "../../../Utils";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import axios from "../../../axios";
import {toast} from "react-toastify";
import {API_BASE_URL} from "../../../Constants";


function CarDetailForm(props) {
    const [open,setOpen]=React.useState(false)
    const [confirmed,setConfirmed]=React.useState(false)



    const book = () => {
        if (!confirmed){
            toast.error("You must accept the terms of service!")
            return
        }
        let url = `${API_BASE_URL}/booking`
        let data = props.data
        console.log(data)
        const config = {
            headers: {
                'Authorization': localStorage.getItem('access'),
                'Content-Type': 'application/json'
            }

        }
        let body={
            from:data.from,
            to:data.to,
            listing_id:data.listing_id
        }
        axios.post(url,{data:body},config)
            .then((res)=>{
                const data = res.data
                if(data.code===200){
                    toast.success(data.status)
                }else {
                    toast.error(data.status)
                }
                handleClose()
            })
            .catch(err => {
                console.log(err.response)
            })
    };
    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };
    const handleChange = (e) => {
        setConfirmed(e.target.value)
    };

    return (
        <div className="car-details-form">
           {/* <div>*/}
           {/*     <label>Trip start</label>*/}
           {/*     <input type="datetime-local"/>*/}
           {/* </div>*/}
           {/*<div>*/}
           {/*     <label>Trip end</label>*/}
           {/*     <input type="datetime-local" />*/}
           {/*</div>*/}
            {/*<div>*/}
            {/*    <label>Pickup & return location</label>*/}
            {/*    <input type="text" />*/}
            {/*</div>*/}
            <button className="scroll-nav-btn btn-long" onClick={() => {
                handleOpen()
            }}>Book now</button>
            <Dialog open={open} aria-labelledby="form-dialog-title" >
                <button onClick={handleClose} className="nav-cross">X</button>
                <div style={{padding:"50px"}}>

                    <FormControlLabel
                        value="top"
                        control={
                            <Checkbox
                                value="confirm"
                                onChange={handleChange}
                                inputProps={{ 'aria-label': '' }}
                            />
                        }
                        label="I agree to the terms and aware that i am responsible for insurance."
                        labelPlacement="left"
                    />

                    <DialogActions className="button-stack">
                        <button className="btn-long" onClick={book}> Book now for {props.days} days</button>

                    </DialogActions>
                </div>

            </Dialog>
        </div>
    )
}

export default CarDetailForm
