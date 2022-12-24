import * as React from "react";
import homelogo from "@/img/homeLogo.png";
import { useNavigate } from "react-router-dom";

import "@/styles/pages/header.scss";
const Card = ()=>{
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="home_top">
      <div className="home_top_layout">
        <img className="home_top_layout_img" src={homelogo} alt="" />
        <div className="home_top_layout_btns"> 
          <span className="home_top_layout_btns_left home_top_layout_btns_active">
                找工作
          </span>
          <span className="home_top_layout_btns_right">
                找课程
          </span>
        </div>
        <div className="home_top_layout_right">
          <div className="home_top_layout_myResume"> 
            <span className="home_top_layout_myResume_btn">
                  消息
            </span>
            <span className="home_top_layout_myResume_btn">
                  简历
            </span>
            <span className="home_top_layout_myResume_btn">
                  上传
            </span>
          </div>
          <div className="home_top_layout_form"> 
            <span className="home_top_layout_form_login"
              onClick={()=>goToLogin()}
            >
              登录
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;