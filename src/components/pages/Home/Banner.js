import React from 'react'
import './banner.css'
import SearchForm from './SearchForm'

function Banner() {
    return (
        <div className="banner">
            <img className="banner-img" alt="turo" src="http://localhost:3000/uploads/images/profile/road-trip-couple.jpg" />
            <SearchForm />
        </div>
    )
}

export default Banner
