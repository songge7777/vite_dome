import * as React from "react";
import LOGO from "@/img/LOGO.png";
import "@/styles/pages/interviewListCard.scss";
import { message } from "antd";
import ReactClipboard from "react-clipboardjs-copy";
import {
  Modal,
  Button,
  Row,
  Col
} from "antd";
import axios from "@/api/axios";
import dayjs from "dayjs";

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
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [interviewData, setInterviewData ] = React.useState({});
  // 1 线上   2线下
  const [interviewType, setInterviewType] = React.useState<Number>(1);
  // 接受面试
  const accept = async(recordId:number) => {
    const {data} = await  axios.put("/cpe/post/interview/accept",{recordId});
    ;
    message.success("已接受");
    cb();
  };
 
  // 拒绝面试
  const refuse = async(recordId:number) => {
    const rs =await  axios.put("/cpe/post/interview/refuse",{recordId});
    ;
    message.success("已拒绝");
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
  const handleOkNotice = () => {
    ;
    setIsModalOpen(false);
  };
  const clickOfflineInterviewInfo = async(recordId) => {
    const {data} = await axios.get(`/cpe/post/interview/${recordId}`);
    ;
    setInterviewData(data.data);
    setInterviewType(2);
    setIsModalOpen(true);
  };
  const clickOnlineInterviewInfo = async(recordId) => {
    const {data} = await axios.get(`/cpe/post/interview/${recordId}`);
    ;
    setInterviewData(data.data);
    setInterviewType(1);
    setIsModalOpen(true);
  };
  const copy = () => {
    const content = document.getElementById("copyText");
    content.select();
    document.execCommand("Copy");
    message.success("复制成功");
  };
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
          {Number(data.interviewType) === 1 ? <span onClick={()=>clickOfflineInterviewInfo(data.recordId)}>线下面试</span> :""}
          {Number(data.interviewType) === 2 ? <span onClick={()=>clickOnlineInterviewInfo(data.recordId)}>腾讯会议</span> :""}
        </div>
        <div className="InterviewList_content_layout_lists_address">
          {Number(data.interviewType) === 1 ? data.interviewAddress : "关于支持工程师的面试会议"}
        </div>
        <div className="InterviewList_content_layout_lists_time">
          <span>
            {dayjs(data.employTime).format("YYYY-MM-DD hh:mm")}
          </span>
        </div>
        {
          Number(data.interviewStatus) === 10 ? <div className="InterviewList_content_layout_lists_result">
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
      { isModalOpen && <Modal className="hiddenBtn" title="查看预约" okText="接受" cancelText="拒绝" width={720} open={isModalOpen} onOk={handleOkNotice} onCancel={()=>setIsModalOpen(false)} >
        <Row className="marginTop">
          <Col span={12} >
            <span>姓名:</span>
            <span>{interviewData.name}</span>
          </Col>
          <Col span={12} >
            <span id="textAreas">岗位:</span>
            <span>{interviewData.postName}</span>
          </Col>
        </Row>
        <Row className="marginTop">
          <Col span={12} >
            <span>招聘专员:</span>
            <span>{interviewData.hrName}</span>
          </Col>
          <Col span={12} >
            <span>面试方式:</span>
            <span>{Number(interviewData.interviewType) === 1?"线下面试" :"腾讯会议"}</span>
          </Col>
        </Row>
        <Row className="marginTop">
          <Col span={12} >
            <span>企业联系人:</span>
            <span>{interviewData.contactsName}</span>
          </Col>
          <Col span={12} >
            <span>面试时间:</span>
            <span>{interviewData.interviewTime}</span>
          </Col>
        </Row>
        <Row className="marginTop">
          { Number(interviewType) === 2 &&<Col span={24} >
            <span>面试地点:</span>
            <span>{interviewData.interviewAddress}</span>
          </Col>
          }
          { Number(interviewType) === 1 &&<Col span={24} >
            <span>会议信息:</span>
            <span>{interviewData.meeting}</span>
            <Button onClick={copy}>复制</Button>
          </Col>
          }
          <input id="copyText"  value={interviewData.meeting} />
        </Row>
        <Row className="marginTop">
          <Col span={2} offset={19}>
            <Button onClick={handleOkNotice}>确认</Button>
          </Col>
        </Row>
      </Modal>}
    </div>
  );
};
export default InterviewListCard;