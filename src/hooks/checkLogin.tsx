const checkLogin = () => {
    if (localStorage.getItem("username_admin") == null) {
        window.location.replace("/login")
    }
}

export { checkLogin };