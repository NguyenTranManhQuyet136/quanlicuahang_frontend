import { useEffect, useState } from "react";
import ChangePassword from "../Form/FormChangePassword";
import FormEditProfile from "../Form/FormEditProfile";
import axios from "axios";

interface setVari {
    closeForm: () => void;
}

const UserDetail = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [fullname, setFullname] = useState("")
    const [gender, setGender] = useState("")
    const [birthday, setBirthday] = useState("")
    const [position, setPosition] = useState("")

    useEffect( () => {
        const getDataAccount = () => {
            const username = localStorage.getItem("username") || ""
            const password = localStorage.getItem("password") || ""
            setUsername(username)
            setPassword(password)
        }
        getDataAccount()
    },[])
    


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
                    <ChangePassword closeForm={() => closeForm("pass")} />
                )}

                {editProfileStatus && (
                    <FormEditProfile closeForm={() => closeForm("profile")}/>
                )}

                <div className="card-body bg-white">
                    <div className="row g-3">
                        <div className="col-md-4 text-center ">
                            <h5 className="text-primary mb-3">Ảnh đại diện</h5>
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Avatar"
                                className="rounded-circle border border-3 border-primary mb-3"
                            />
                        </div>

                        <div className="col-md-8">
                            <div className="row">
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

                                <div className="col-md-6 mb-4">
                                    <h5 className="text-primary pb-1">
                                        Thông tin cá nhân
                                    </h5>
                                    <dl className="row mb-0">
                                        <dt className="col-sm-5">Họ và tên:</dt>
                                        <dd className="col-sm-7">
                                            
                                        </dd>

                                        <dt className="col-sm-5">Giới tính:</dt>
                                        <dd className="col-sm-7"></dd>

                                        <dt className="col-sm-5">Ngày sinh:</dt>
                                        <dd className="col-sm-7"></dd>

                                        <dt className="col-sm-5">
                                            Vị trí làm việc:
                                        </dt>
                                        <dd className="col-sm-7">
                                            
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
