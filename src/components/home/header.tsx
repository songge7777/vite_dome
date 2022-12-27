import * as React from "react";
import homelogo from "@/img/homeLogo.png";
import { useNavigate } from "react-router-dom";
import axios from "@/api/axios";

import "@/styles/pages/header.scss";
const Card = ()=>{
  const [info, setInfo] = React.useState({});
  const [dataItem,setDataItem] = React.useState([]);
  const [userInfo,setUserInfo] = React.useState({});
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };
  const goToMessage = () => {
    navigate(`/messagenotification?userId=${userInfo.userId}`);
  };
  // resumeManagement
  const goToResumeManagement = () => {
    navigate(`/resumeManagement?userId=${userInfo.userId}`);
  };
  const getMessage = async(_userId)=>{
    const {data} = await axios.get(`/msg/msg/all/${_userId}`);
    // const data = [{
    //   msgId:"1",
    //   userId:"1",
    //   title:"标题",
    //   content:"内容内容内容内容内容",
    //   jumpUrl:"http://www.baidu.com",
    //   // 是否已读 0 未读 1 已读
    //   status:"0",
    //   sentTime:"2020-1-1"
    // },{
    //   msgId:"2",
    //   userId:"2",
    //   title:"标题1",
    //   content:"内容内容内容内容内容1",
    //   jumpUrl:"http://www.baidu.com",
    //   // 是否已读 0 未读 1 已读
    //   status:"1",
    //   sentTime:"2020-1-1"
    // }];
    setDataItem(data);
  };
  const getUserInfo = async () => {
    const {data} = await axios.get("/auth/client/info");
    return data.data;
  };
  const init = async()=>{
    const data = await getUserInfo();
    console.log("获取用户信息11",data);
    getMessage(data.userId);
    setUserInfo(data);
  };
  const goToAccount = async()=>{
    navigate(`/loginListTab?userId=${userInfo.userId}`);
  };
  React.useEffect(()=>{
    init();
  },[]);
  return (
    <div className="header_top">
      <div className="header_top_layout">
        <img className="header_top_layout_img" src={homelogo} alt="" />
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
            <span className="header_top_layout_myResume_btn" onClick={goToMessage}>
              消息
            </span>
            <span className="header_top_layout_myResume_btn" onClick={goToResumeManagement}>
              简历
            </span>
            <span className="header_top_layout_myResume_btn" onClick={goToResumeManagement}>
              上传
            </span>
          </div>
          <div className="header_top_layout_form"> 
            {userInfo.userId ? <div className="header_top_layout_form_layout"
              onClick={goToAccount}
            >
              <span>{userInfo.username}</span>
              <img className="header_top_layout_form_img" src={userInfo.picture} alt="" />
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