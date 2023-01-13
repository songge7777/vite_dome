import * as React from "react";
import homelogo from "@/img/homeLogo.png";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "@/api/axios";
import {Popover} from "antd";
import { useSelector,useDispatch } from "react-redux";
import { setLoginInfo } from "@/store/modules/login";

import "@/styles/pages/header.scss";
const Card = ()=>{
  const { loginInfo } = useSelector((store: any) => store.login);
  const [info, setInfo] = React.useState({});
  const [dataItem,setDataItem] = React.useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };
  React.useEffect(()=>{
    console.log("loginInfo",loginInfo);
  });
  const goToMessage = () => {
    if(loginInfo.userId){
      navigate(`/messagenotification?userId=${loginInfo.userId}`);
    } else{
      navigate("/login");
    }
  };
  // resumeManagement
  const goToResumeManagement = () => {
    if(loginInfo.userId){
      navigate(`/resumeManagement?userId=${loginInfo.userId}`);
    } else{
      navigate("/login");
    }
  };
  const getMessage = async()=>{
    const {data} = await axios.get(`/res/msg/all/${loginInfo.userId}`);
    setDataItem(data);
  };
  const getUserInfo = async () => {
    const {data} = await axios.get("/cpe/post/info");
    if(data.code === 200){
      setInfo(data.data);
    }
  };
  const init = async()=>{
    if(loginInfo.userId){
      getMessage();
      getUserInfo();
    }
  };
  const goToAccount = async()=>{
    if(loginInfo.userId){
      navigate(`/loginListTab?userId=${loginInfo.userId}`);
    } else{
      navigate("/login");
    }
  };
  React.useEffect(()=>{
    init();
    getUserInfo;
  },[location]);
  const signOut = async() => {
    const {data} = await axios.get("/auth/client/logout");
    console.log(data);
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("persist:root");
    navigate("/index");
    dispatch(setLoginInfo({loginInfo:{}}));
  };
  const goToPersonal = () => {
    navigate("/personal");
  };
  const listBtn = () => {
    return <div className="header_top_btns">
      <span  className="header_top_btns_item"  onClick={goToPersonal}>个人中心</span>
      <span  className="header_top_btns_item" onClick={goToAccount}>账号与安全中心</span>
      {/* <span>消息通知</span> */}
      <span  className="header_top_btns_item topLine"  onClick={signOut}>退出登录</span>
    </div>;
  };
  return (
    <div className="header_top">
      <div className="header_top_layout">
        <img className="header_top_layout_img" src={homelogo} alt="" onClick={()=>{navigate("/index");}} />
        <div className="header_top_layout_btns"> 
          <span className="header_top_layout_btns_left header_top_layout_btns_active" onClick={()=>{navigate("/search");}}>
            找工作
          </span>
          {/* <span className="header_top_layout_btns_right">
                找课程
          </span> */}
        </div>
        <div className="header_top_layout_right">
          <div className="header_top_layout_myResume"> 
            {
              loginInfo && loginInfo.userId &&<span className="header_top_layout_myResume_btn" onClick={goToMessage}>
              消息
              </span>
            }
            <span className="header_top_layout_myResume_btn" onClick={goToResumeManagement}>
              简历
            </span>
          </div>
          <div className="header_top_layout_form"> 
            {
              loginInfo && loginInfo && loginInfo.userId ? 
                <Popover placement="bottomRight" content={listBtn} trigger="click">
                  <div className="header_top_layout_form_layout">
                    <span>{info.name}</span>
                    <img className="header_top_layout_form_img" src={info.picture || {}} alt="" />
                  </div>
                </Popover>
                : <span className="header_top_layout_form_login"
                  onClick={()=>goToLogin()}
                >
              登录
                </span>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;