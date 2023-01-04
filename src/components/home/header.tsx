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
  const init = async()=>{
    if(loginInfo.userId){
      getMessage();
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
              <span>{loginInfo.username}</span>
              <img className="header_top_layout_form_img" src={loginInfo.picture || {}} alt="" />
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