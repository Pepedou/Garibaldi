export default {
    getServiceUrl: function(apiConstant) {
        return "https://lagunilla.herokuapp.com" + apiConstant;
    },
    LOGIN: "/api/login/",
    USERS: "/api/users/",
    RESET_PASSWORD: "/api/resetPassword",
    MOSAIC: "/api/mosaic",
    ARTIST_DETAILS: "/api/getArtistDetail",
    ART_DETAIL: "/api/getArtPieceDetail",
    ARTISTS: "/api/artists"
}