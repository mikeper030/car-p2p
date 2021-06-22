import { set } from 'date-fns'
import React from 'react'
import './payout.css'

function Payout(props) {
    const [lowest,setlowest] = React.useState('')
    const [highest,sethighest] = React.useState('')

    const handleLowest = (event) => {
        setlowest(event.target.value)
    }

    const handleHighest = (event) => {
        sethighest(event.target.value)
    }

    const submitHandler = ()=>{
        props.priceFormHandler({lowest,highest})
        props.setPayoutExpand(false)
      }

    return (
        <div>
            <h3></h3>
            {/*<span>Use our smart price match algorithm to set an optimal price</span>*/}
            <div className="payout-div">
                <h4>Price</h4>
                <p style={{textAlign:"left"}}>Enter your daily price</p>
                <input type="text" 
                name="lowest_price"
                value={lowest}
                onChange={handleLowest}
                placeHolder="Enter low price bid"/>
                {/*<p style={{textAlign:"left"}}>Highest price</p>*/}
                {/*<input type="text" */}
                {/*name="highest_price"*/}
                {/*value={highest}*/}
                {/*onChange={handleHighest}*/}
                {/*placeHolder="Enter peek price bid"/>*/}
            </div>
            <div>
            <button
            onClick={()=>{submitHandler()}}
             className="primary-btn">
                 NEXT</button></div>

        </div>
    )
}

export default Payout
