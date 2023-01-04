import * as React from "react";
import LOGO from "@/img/LOGO.png";
import "@/styles/pages/interviewListCard.scss";

import {
  Button,
} from "antd";
import axios from "@/api/axios";

/**
 * 我的面试
 * 
 */
type Props= {
  data:{},
  cb:()=>void
};
const InterviewListCard = (props:Props) =>{
  const {data,cb} = props;
  // 接受面试
  const accept = async(recordId:number) => {
    const rs =await  axios.put("/cpe/post/interview/accept",{recordId});
    cb();
  };
 
  // 拒绝面试
  const refuse = async(recordId:number) => {
    const rs =await  axios.put("/cpe/post/interview/refuse",{recordId});
    console.log("rs",rs);
    cb();
  };
  const filterStatus = (status) => {
    switch(Number(status)){
      case 10:
        return "待确认";
      case 20:
        return "接受面试";
      case 30:
        return "拒绝面试";
      case 40:
        return "面试完成";
      default:
        return "";
    }
  };
  console.log("我的面试",data);
  return (
    <div className="InterviewList_home_lists">
      <section className="InterviewList_content_layout_lists_div">
        <div className="InterviewList_content_layout_lists_div_personnel">
          <img src={data.hrPicture}  alt="" />
          <span>{data.hrName}/HR</span>
          <div className="postName">{data.postName}</div>
          <div className="postClose">{Number(data.postStatus) === 2?"岗位已关闭":""}</div>
        </div>
      </section>
      <section className="InterviewList_content_layout_lists_bottom">
        <div className="InterviewList_content_layout_lists_method">
          {/* 面试类型：1线下面试、2腾讯会议 */}
          {Number(data.interviewType) === 1 ? "线下面试" :"腾讯会议"}
        </div>
        <div className="InterviewList_content_layout_lists_address">
          {Number(data.interviewType) === 1 ? data.interviewAddress : "关于支持工程师的面试会议"}
        </div>
        <div className="InterviewList_content_layout_lists_time">
          <span>
            {data.interviewTime}
          </span>
        </div>
        {
          Number(data.interviewStatus) !== 10 ? <div className="InterviewList_content_layout_lists_result">
            {/* <span>不通过</span> */}
            {/* <Button type="primary">参加面试</Button> */}
            <Button onClick={()=>accept(data.recordId)}>接受</Button>
            <Button onClick={()=>refuse(data.recordId)}>拒绝</Button>
          </div>
            :
            <div className="InterviewList_content_layout_lists_status">
              {filterStatus(data.interviewStatus)}
            </div>
        }
      </section>
    </div>
  );
};
export default InterviewListCard;