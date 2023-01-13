import * as React from "react";
import LOGO from "@/img/LOGO.png";
import "@/styles/pages/trenchingCard.scss";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { message,Modal  } from "antd";
import { useSelector } from "react-redux";
import { workExperience,educationalRequirementsDta } from "@/utils/optionList";
/**
 * 感兴趣 3
 * 已投递 1
 * 沟通过 0
 * 我看过 4
 * 
 */ 
type Props = {
  data:{},
  type: number,
  cb:()=>void
}
const TrenchingCard:React.FC = (props:Props) =>{
  const { loginInfo } = useSelector((store: any) => store.login);
  const navigate = useNavigate();
  const {data,type,cb}= props;
  // postStatus 1 生效  2岗位关闭 岗位状态	
  // recruitPostId 招聘岗位ID	
  const { postStatus,recruitPostId } = data;
  const [phone,setPhone] = React.useState("");
  const postedFn = () => {
    console.log("已投递 data",data,type);
    const { sendStatus } = data;
    if(Number(type) === 0) return;
    if(Number(type) === 3) return;
    if(sendStatus ){
      return <span>已投递</span>;
    }
    if(Number(type) === 1 ){
      return <span>已投递</span>;
    }
  };
  const disinterestFn = () =>{
    if(Number(type) === 0) return;
    if(Number(type) === 1) return;
    if(Number(type) === 4) return;
    if(Number(postStatus) === 2) return;
    return <span onClick={(e) => cancelFn(e)}>取消感兴趣</span>;
  };
  const postClosing = () => {
    if(Number(type) === 0) return;
    if(Number(postStatus) === 2){
      return <span>岗位关闭</span>;
    }
  };
  const cancelFn = async(e) => {
    e.stopPropagation();
    const {data:rs} = await axios.put("/cpe/post/concern/cancel",{
      recruitPostId
    });
    if(rs.code === 200){
      cb();
      message.success("操作成功");
    }
  };
  const callFn = async(e) => {
    e.stopPropagation();
    if(!loginInfo.userId){
      navigate("/login");
      return;
    }
    const {data:rs} = await axios.put("/cpe/post/interact",{
      recruitPostId
    });
    Modal.success({
      title: "联系方式:",
      width: "300px",
      okText: "我知道了",
      content: 
        <div>
          <p>{rs.data}</p>
        </div>
    });
  };
  const communicateImmediately = () => {
    if(Number(postStatus) === 2) return;
    return <div className="trenching_content_layout_lists_right_call" onClick={callFn}>
      <img src={LOGO}  alt="" />
      <span>立即沟通</span>
    </div>;
  };
  const goToPage = (data:{}) => {
    const { recruitPostId, postStatus } = data;
    if(Number(postStatus) !== 2){
      navigate("/viewPosition",{state:recruitPostId});
    }
  };
  const workExperienceFilter =(id)=>{
    const rs = workExperience().filter(item => Number(item.id) === Number(id));
    return rs[0] ? rs[0].value :"";
  };
  const educationalRequirementsDtaFilter = (id)=>{
    const rs = educationalRequirementsDta().filter(item => Number(item.id) === Number(id));
    return rs[0] ? rs[0].value :"";
  };
  return (
    <div className="trenching_home_lists" onClick={()=>goToPage(data)}>
      <div className="trenching_content_layout_lists_left">
        <section className="trenching_content_layout_lists_div">
          <div className="trenching_content_layout_lists_div_personnel">
            <img src={data.hrPicture}  alt="" />
            <span>{data.hrName}/HR</span>
          </div>
          <div className="trenching_content_layout_lists_div_title">
            <span className="trenching_content_layout_lists_div_title_left">{data.postName}</span>
            <span className="trenching_content_layout_lists_div_title_right">{`${data.salaryMin/1000}万-${data.salaryMax/1000}万·${data.salaryNum}薪`}</span>
          </div>
          <div className="trenching_content_layout_lists_div_btns">
            <span className="trenching_content_layout_lists_div_btns_item">{data.workAddrCityName}</span>
            <span className="trenching_content_layout_lists_div_btns_item">{workExperienceFilter(data.workExperience)}</span>
            <span className="trenching_content_layout_lists_div_btns_item">{educationalRequirementsDtaFilter(data.education)}</span>
          </div>
        </section>
      </div>
      <div className="trenching_content_layout_lists_center">
        <img src={data.companyLogo}  alt="" />
        <div>{data.companyName}</div>
      </div>
      <div className="trenching_content_layout_lists_right">
        <div className="trenching_content_layout_lists_right_top">
          {postedFn()}
          {disinterestFn()}
          {postClosing()}
        </div>
        {communicateImmediately()}
      </div>
    </div>
  );
};
export default TrenchingCard;