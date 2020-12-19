module.exports = Object.freeze({
    //All requests must have /api/... prefix
    //get all users
    USERS_GET_ENDPOINT:"/users",
    //get a user by email and pass. parameters delivered in request headers
    USER_GET_BY_EMAILPASS_ENDPOINT:"/user",
    //post a new user with all data
    USER_POST_BY_DETAILS_ENDPOINT:"/user",
    //Update a user by uid
    USER_PUT_BY_UID:"/user"
});