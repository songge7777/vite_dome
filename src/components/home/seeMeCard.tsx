import * as React from "react";
import logoqiye from "@/img/logoqiye.png";
import call from "@/img/call.png";
import "@/styles/pages/seeMeCard.scss";
/**
 * 我的面试
 * 
 */ 
const seeMeCard = () => {
  return (
    <div className="seeMe_home_lists">
      <div className="seeMe_content_layout_lists_left">
        <div className="seeMe_content_layout_lists_personnel">
          <img src={logoqiye}  alt="" />
          <span>王女士11/HR</span>
        </div>
       
      </div>
      <div className="seeMe_content_layout_lists_center">
        <img src={logoqiye}  alt="" />
        <div className="seeMe_content_layout_lists_center_list">
          <span className="seeMe_content_layout_lists_center_list_company">北京飞实打实打算渡科技有限公222司</span>
          <section className="seeMe_content_layout_lists_center_btns">
            <span >武汉</span>
            <span >3年</span>
            <span >硕士</span>
          </section>
        </div>
      </div>
      <div className="seeMe_content_layout_lists_right">
        <img src={call}  alt="" />
        <span>立即沟通</span>
      </div>
    </div>
  );
};
export default seeMeCard;