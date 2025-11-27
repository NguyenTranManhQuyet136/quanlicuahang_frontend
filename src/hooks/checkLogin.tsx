const checkLogin = (type: any) => {
    if (type == "user") {
        if (localStorage.getItem("username_user") == null) {
            window.location.replace("/login")
        }
    } else {
        if (localStorage.getItem("username_admin") == null) {
            window.location.replace("/login")
        }
    }
}

export { checkLogin };