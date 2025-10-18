import Menubar from "../../components/Menubar/Menubar";
import Header from "../../components/Header/Header";
import ChangePassword from "../../components/Form/FormChangePassword";
import { useState } from "react";
import "./User.css"

interface setVari{
    closeForm : ()=> void
}

const User = () => {



    const [changePasswordStatus, setChangePasswordStatus] = useState(false)

    const closeForm = () => {
        setChangePasswordStatus(false)
    }

    return ( 
        <div className="d-flex" style={{ minHeight: '100vh' }}>
            <Menubar focus={""}/>
            <div className="flex-grow-1 bg-light">
                <Header name={"Quản lí tài khoản"}/>
                <div className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div></div>
                        <div>
                            <button className="btn btn-primary px-4 "style={{width: '200px'}}>
                            Chỉnh sửa thông tin
                            </button>
                        </div>
                    </div>
                    <div className="card shadow mx-auto" >


                    {changePasswordStatus && <ChangePassword
                        closeForm = {() => closeForm()}    
                    />}
                        

                    <div className="card-body bg-white">
                    <div className="row g-4">
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
                                <dt className="col-sm-5">Tên tài khoản:</dt>
                                <dd className="col-sm-7">nguyenvana</dd>

                                <dt className="col-sm-5">Mật khẩu:</dt>
                                <dd className="col-sm-7">********</dd>
                                <dt className="col-sm-5"></dt>
                                <dd className="col-sm-7">
                                    <button onClick={() => {
                                        setChangePasswordStatus(true)
                                    }} className="btn btn-sm btn-outline-danger btn-secondary text-white "style={{width: '150px'}}>
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
                                <dd className="col-sm-7">Nguyễn Văn A</dd>

                                <dt className="col-sm-5">Giới tính:</dt>
                                <dd className="col-sm-7">Nam</dd>

                                <dt className="col-sm-5">Ngày sinh:</dt>
                                <dd className="col-sm-7">15/06/1995</dd>

                                <dt className="col-sm-5">Vị trí làm việc:</dt>
                                <dd className="col-sm-7">Nhân viên thu ngân</dd>
                            </dl>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
    </div>
     );
}
 
export default User ;