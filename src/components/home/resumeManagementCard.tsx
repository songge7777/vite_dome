import * as React from "react";
import "@/styles/pages/resumeManagementCard.scss";
import LOGO from "@/img/LOGO.png";
import offerp from "@/img/offerp.png";
import offerw from "@/img/offerw.png";

import {
  Button,
} from "antd";
const resumeManagementCard = () => {
  return (
    <section className="resumeManagement_layout">
      {/* title */}
      <div className="resumeManagement_title">
        简历管理
      </div>
      {/* 简历列表 */}
      <section  className="resumeManagement_list">
        <div className="resumeManagement_list_item ">
          <img className="resumeManagement_list_item_img" src={offerw} alt="" />
          <span className="resumeManagement_list_item_name">xxxx.word</span>
        </div>
        <div className="resumeManagement_list_item resumeManagement_list_active">
          <img className="resumeManagement_list_item_img" src={offerw} alt="" />
          <span className="resumeManagement_list_item_name">xxxx啊实打实的撒大苏打实打实打算xxxxxxxx.word</span>
        </div>
        <div className="resumeManagement_list_item ">
          <img className="resumeManagement_list_item_img" src={offerw} alt="" />
          <span className="resumeManagement_list_item_name">xxxx.word</span>
        </div>
      </section>
      {/* 按钮 */}
      <section  className="resumeManagement_bottom">
        <Button>上传简历</Button>
      </section>
    </section>
  );
};
export default resumeManagementCard;