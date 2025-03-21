const checkTokenInLocalStorage = () => {
    if (localStorage.getItem("token") == null || localStorage.getItem("token") == undefined) {
        return false;
    } else {
        return true;
    }
}

export default checkTokenInLocalStorage;