
module.exports = Object.freeze({
    //All requests must have /api/... prefix
    API_BASE_URL:"http://185.241.5.135",
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
    //upload single image
    LISTINGS_IMAGE_UPLOAD_SINGLE:"/cars/listings/images/upload-single",
    //upload multiple images
    LISTINGS_IMAGE_UPLOAD_MULTIPLE:"/cars/listings/images/upload-multiple",
    //get all car listings
    LISTINGS_GET:"/cars/listings",
    //reset password endpoint"
    ACCOUNT_RESET_PASS:"/account/reset-password"
});