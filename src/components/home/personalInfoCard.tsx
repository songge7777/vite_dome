import * as React from "react";
import "@/styles/pages/personalInfoCard.scss";
import LOGO from "@/img/LOGO.png";

const PersonalInfoCard = () => {
  return (
    <section className="personalInfo_layout">
      {/* 头 */}
      <div className="personalInfo_header">
        <img className="personalInfo_header_img" src={LOGO} alt="" />
        <span className="personalInfo_header_name">李先生</span>
      </div>
      {/* tip */}
      <div className="personalInfo_tip">
        <span  className="personalInfo_tip_age">26岁</span>
        <span  className="personalInfo_tip_experience">3年经验</span>
        <span className="personalInfo_tip_education">本科</span>
      </div>
      {/* offer */}
      <div className="personalInfo_offer">
        <section className="personalInfo_offer_left">
          <span className="personalInfo_offer_left_num">20</span>
          <span>我的面试</span>
        </section>
        <section className="personalInfo_offer_right">
          <span  className="personalInfo_offer_left_num">20</span>
          <span>我的offer</span>
        </section>
      </div>
      {/* 底部 */}
      <div className="personalInfo_bottom">
        <section className="personalInfo_bottom_div">
          <span className="personalInfo_bottom_div_num">392</span>
          <span className="personalInfo_bottom_div_title">已沟通</span>
        </section>
        <section className="personalInfo_bottom_div">
          <span className="personalInfo_bottom_div_num">392</span>
          <span className="personalInfo_bottom_div_title">已投递</span>
        </section>
        <section className="personalInfo_bottom_div">
          <span className="personalInfo_bottom_div_num">392</span>
          <span className="personalInfo_bottom_div_title">感兴趣</span>
        </section>
      </div>
    </section>
  );
};
export default PersonalInfoCard;