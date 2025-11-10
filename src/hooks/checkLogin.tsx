const checkLogin = () => {
    if (localStorage.getItem("username") == null) {
        window.location.replace("/login")
    }
}
 
export {checkLogin};