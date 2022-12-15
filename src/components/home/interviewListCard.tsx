import * as React from "react";
import LOGO from "@/img/LOGO.png";
import "@/styles/pages/interviewListCard.scss";

import {
  Button,
} from "antd";

/**
 * 我的面试
 * 
 */ 
const InterviewListCard = () =>{
  return (
    <div className="InterviewList_home_lists">
      <section className="InterviewList_content_layout_lists_div">
        <div className="InterviewList_content_layout_lists_div_personnel">
          <img src={LOGO}  alt="" />
          <span>王女士/HR</span>
        </div>
        <span className="InterviewList_content_layout_lists_div_title">软件项目经理</span>
        <span className="InterviewList_content_layout_lists_div_money">1.5万-2.5万·13薪</span>
      </section>
      <div className="InterviewList_content_layout_lists_time">
        <span>
        2022-12-09 10:00
        </span>
        <span>
          线上面试
        </span>
      </div>
      <div className="InterviewList_content_layout_lists_status">
        已经接受
      </div>
      <div className="InterviewList_content_layout_lists_result">
        {/* <span>不通过</span> */}
        {/* <Button type="primary">参加面试</Button> */}
        <Button>接受</Button>
        <Button>拒绝</Button>
      </div>
    </div>
  );
};
export default InterviewListCard;