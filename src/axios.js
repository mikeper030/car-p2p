
import axios from "axios";
import {API_BASE_URL} from "./Constants";
import {toast} from "react-toastify";
import {j} from "react-select/dist/index-4bd03571.esm";


// For GET requests
axios.interceptors.request.use(
    (req) => {
        // Add configurations here

        const expiration = Number(localStorage.getItem("expires"))
        const token = localStorage.getItem("access")
        if (expiration){
            let expirationDate = new Date(expiration)
            //if the token should expire request a new one
            const now = new Date()
            if (expirationDate ){
                //10 mins before expiration request for a new token
                 if (expirationDate.getTime() - now.getTime() <= 600000){
                    let url = `${API_BASE_URL}/user/refresh-token?token=`+token
                    fetch(url).then(res => res.json())
                        .then(json => {
                            console.log(json)
                        const code = json.code;
                        if (code === 200) {
                            console.log(new Date(json.expires))
                           localStorage.setItem("access",json.token)
                           localStorage.setItem("expires",json.expires)
                            return Promise.resolve("ok");
                        } else {
                            return Promise.reject("err");
                        }

                    }).catch(err => {
                        console.log(err)
                    })
                 }
            }
        }
        return req;
    },
    (err) => {
        return Promise.reject(err);
    }
);
export default axios