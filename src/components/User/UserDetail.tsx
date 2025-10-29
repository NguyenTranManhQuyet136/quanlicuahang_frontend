import { useEffect, useState, useContext } from "react";
import ChangePassword from "../Form/FormChangePassword";
import FormEditProfile from "../Form/FormEditProfile";
import axios from "axios";
import { ThemeContext } from "../../contexts/ThemeProvider";

interface setVari {
    closeForm: () => void;
    fullname: string
    gender: string
    birthday: string
    position: string
    phoneNumber: string
    email: string
}

const UserDetail:React.FC = () => {
    const themeContext = useContext(ThemeContext)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [fullname, setFullname] = useState("")
    const [gender, setGender] = useState("")
    const [birthday, setBirthday] = useState("")
    const [position, setPosition] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")  
    const [image, setImage] = useState("")

    useEffect( () => {
        const getDataAccount = async () => {
            const username = localStorage.getItem("username") || ""
            const password = localStorage.getItem("password") || ""

            const res = await axios.post("http://localhost:5000/api/users_detail",{
                username: username
            })
            const profile = (res.data)[0]
            setFullname(profile.fullname)
            setGender(profile.gender)
            setBirthday(profile.birthday.slice(0,10))
            setPosition(profile.position)
            setPhoneNumber(profile.phone_number)
            setEmail(profile.email)

            setUsername(username)
            setPassword(password)
        }
        getDataAccount()
    },[])

    async function resetData() {
        console.log("123")
        const username = localStorage.getItem("username") || ""
        const password = localStorage.getItem("password") || ""
        const res = await axios.post("http://localhost:5000/api/users_detail",{
            username: username
        })
        const profile = (res.data)[0]
        setFullname(profile.fullname)
        setGender(profile.gender)
        setBirthday(profile.birthday.slice(0,10))   
        setPosition(profile.position)
        setPhoneNumber(profile.phone_number)
        setEmail(profile.email)

        setUsername(username)
        setPassword(password)
    }
    


    const [changePasswordStatus, setChangePasswordStatus] = useState(false);

    const [editProfileStatus, setEditProfileStatus] = useState(false)

    const closeForm = (type: string) => {
        switch (type) {
            case "pass" :
                setChangePasswordStatus(false)
                break
            case "profile" :
                setEditProfileStatus(false)
                break
        }
    };

    const handleEdit = async (fullname: string,gender:string,birthday:string,position:string,phoneNumber:string,email:string) => {
        const res = await axios.post("http://localhost:5000/api/user/fix", {
            username: localStorage.getItem("username"),
            fullname: fullname,
            gender: gender,
            birthday: birthday,
            position: position,
            phoneNumber: phoneNumber,
            email: email,
        })
        closeForm("profile")
        resetData()
    }

    const handleChangePassword = async (password: string,passwordChange: string,confirmPasswordChange: string) => {
        const username = localStorage.getItem("username")
        const res = await axios.post("http://localhost:5000/api/findUser", {username: username, password: password})
        if ( res.data.status == false) {
            alert("sai mat khau")
            return
        } else {
            if (passwordChange  != confirmPasswordChange) {
                alert("xac nhan mat khau sai")
            } else {
                const res = await axios.post("http://localhost:5000/api/user/change_password", {passwordChange: passwordChange, username: username})
                if (res.data.status == true) {
                    let passStar = ""
                    for ( let i =0; i < passwordChange.length; i++) {
                        passStar += "*"
                    }
                    localStorage.setItem("password", passStar)
                    closeForm("pass")
                    resetData()
                }
            } 
        }
    }

    const changeAvatar = (file: File) => {
        const imageUrl = URL.createObjectURL(file);
        console.log(imageUrl)
        setImage(imageUrl);
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div></div>
                <div>
                    <button
                        className="btn btn-primary px-4 "
                        style={{ width: "200px" }}
                        onClick={() => setEditProfileStatus(true)}
                    >
                        Chỉnh sửa thông tin
                    </button>
                </div>
            </div>
            <div className="card shadow mx-auto">



                {changePasswordStatus && (
                    <ChangePassword
                        closeForm={() => closeForm("pass")}
                        handleChangePassword={handleChangePassword}
                    />
                )}

                {editProfileStatus && (
                    <FormEditProfile
                        closeForm={() => closeForm("profile")}
                        handleEdit={handleEdit}   
                        fullname={fullname}
                        gender={gender}
                        birthday={birthday}
                        position={position}
                        phoneNumber={phoneNumber}
                        email={email}
                    />
                )}

                <div className={`card-body bg-white ${themeContext.theme}`}>
                    <div className="row g-3">
                        <div className="col-md-4 text-center">
                            <h5 className="text-primary mb-3">Ảnh đại diện</h5>
                            <div  className="rounded-circle border border-3 border-primary mb-3" style={{ width: "150px", height: "150px", display: "inline-block", overflow: "hidden"}}>
                            <img 
                                src={image}
                                alt="Avatar"
                                style={{width: "150px", minHeight: "150px"}}
                            />
                            </div>
                            <input onChange={(e) =>  {
                                const files = e.target.files
                                if (!files) {
                                    return
                                }

                                const file = files[0]
                                changeAvatar(file)
                            }} className="form-control" type="file" />  
                        </div>

                        <div className="col-md-8">
                            <div className="row">                                
                                <div className="col-md-6 mb-4">
                                    <h5 className="text-primary pb-1">
                                        Thông tin cá nhân
                                    </h5>
                                    <dl className="row mb-0">
                                        <dt className="col-sm-5">Họ và tên:</dt>
                                        <dd className="col-sm-7">{fullname}</dd>

                                        <dt className="col-sm-5">Giới tính:</dt>
                                        <dd className="col-sm-7">{gender}</dd>

                                        <dt className="col-sm-5">Ngày sinh:</dt>
                                        <dd className="col-sm-7">{birthday}</dd>

                                        <dt className="col-sm-5">
                                            Vị trí làm việc:
                                        </dt>
                                        <dd className="col-sm-7">{position}</dd>

                                        <dt className="col-sm-5">Số điện thoại:</dt>
                                        <dd className="col-sm-7">{phoneNumber}</dd>

                                        <dt className="col-sm-5">Email:</dt>
                                        <dd className="col-sm-7">{email}</dd>
                                            
                    
                                    </dl>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <h5 className="text-primary pb-1">
                                        Thông tin tài khoản
                                    </h5>
                                    <dl className="row mb-0">
                                        <dt className="col-sm-5">
                                            Tên tài khoản:
                                        </dt>
                                        <dd className="col-sm-7">
                                            {username}
                                        </dd>

                                        <dt className="col-sm-5">Mật khẩu:</dt>
                                        <dd className="col-sm-7">{password}</dd>
                                        <dt className="col-sm-5"></dt>
                                        <dd className="col-sm-7">
                                            <button
                                                onClick={() => {
                                                    setChangePasswordStatus(
                                                        true,
                                                    );
                                                }}
                                                className="btn btn-sm btn-outline-danger btn-secondary text-white "
                                                style={{ width: "150px" }}
                                            >
                                                Đổi mật khẩu
                                            </button>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
