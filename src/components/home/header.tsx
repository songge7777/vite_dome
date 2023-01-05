import * as React from "react";
import homelogo from "@/img/homeLogo.png";
import { useNavigate } from "react-router-dom";
import axios from "@/api/axios";
import { useSelector } from "react-redux";

import "@/styles/pages/header.scss";
const Card = ()=>{
  const { loginInfo } = useSelector((store: any) => store.login);
  const [info, setInfo] = React.useState({});
  const [dataItem,setDataItem] = React.useState([]);
  
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };
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
      console.log("个人信息*",data);
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
  },[]);
  return (
    <div className="header_top">
      <div className="header_top_layout">
        <img className="header_top_layout_img" src={homelogo} alt="" onClick={()=>{navigate("/index");}} />
        <div className="header_top_layout_btns"> 
          <span className="header_top_layout_btns_left header_top_layout_btns_active">
                找工作
          </span>
          {/* <span className="header_top_layout_btns_right">
                找课程
          </span> */}
        </div>
        <div className="header_top_layout_right">
          <div className="header_top_layout_myResume"> 
            {
              loginInfo.userId &&<span className="header_top_layout_myResume_btn" onClick={goToMessage}>
              消息
              </span>
            }
            <span className="header_top_layout_myResume_btn" onClick={goToResumeManagement}>
              简历
            </span>
            <span className="header_top_layout_myResume_btn" onClick={goToResumeManagement}>
              上传
            </span>
          </div>
          <div className="header_top_layout_form"> 
            {loginInfo.userId ? <div className="header_top_layout_form_layout"
              onClick={goToAccount}
            >
              <span>{info.name}</span>
              <img className="header_top_layout_form_img" src={info.picture || {}} alt="" />
            </div>: <span className="header_top_layout_form_login"
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