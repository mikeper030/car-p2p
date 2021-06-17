


module.exports = Object.freeze({
    //All requests must have /api/... prefix
    AUTH_ON: true,
    API_BASE_URL:"http://185.241.5.135:3000",
    //All requests must have /api/... prefix
    WEBSITE_URL:"http://localhost:8080",

    //get all users
    USERS_GET_ENDPOINT:"/users",
    //get a user by email and pass. parameters delivered in request headers
    USER_GET_BY_EMAILPASS_ENDPOINT:"/user",
    USER_GET_BY_UID:"/user/details",
    //post a new user with all data
    USER_POST_BY_DETAILS_ENDPOINT:"/user",
    //Update a user by uid
    USER_PUT_BY_UID:"/user",
    //get all car models by make. must append ?make=..
    CARS_GET_MODELS_BY_MAKE:"/cars/models",
    //get all car makers
    CARS_GET_MAKERS:"/cars/makers",
    //create a new listing
    LISTINGS_CREATE_LIST:"/cars/listings",
    //create a booking
    BOOKINGS_CREATE_BOOKING:"/booking",
    //get booking/s
    BOOKINGS_GET_BOOKINGS:"/bookings",
    //upload single image
    LISTINGS_IMAGE_UPLOAD_SINGLE:"/cars/listings/images/upload-single",
    //upload multiple images
    LISTINGS_IMAGE_UPLOAD_MULTIPLE:"/cars/listings/images/upload-multiple",
    //get all car listings
    LISTINGS_GET:"/cars/listings",
    LISTINGS_GET_FOR_USER:"/cars/listings/user",
    //get a specific listing
    LISTING_GET:"/cars/listing",
    //reset password endpoint"
    ACCOUNT_RESET_PASS:"/account",
    //refresh token for logged in user
    USER_REFRESH_TOKEN:"/user/refresh-token",
    //submit new password
    ACCOUNT_SUBMIT_NEW_PASS:"/account/submit-password",
    //activate new created account
    ACCOUNT_EMAIL_ACTIVATE:"/account/activate-email",
    //send activation email
    ACCOUNT_SEND_EMAIL_ACTIVATE:"/account/send-email"
});