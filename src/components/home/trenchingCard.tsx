import * as React from "react";
import LOGO from "@/img/LOGO.png";
import "@/styles/pages/trenchingCard.scss";
import axios from "@/api/axios";
import { message,Modal  } from "antd";
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
  const {data,type,cb}= props;
  // postStatus 1 生效  2岗位关闭 岗位状态	
  // recruitPostId 招聘岗位ID	
  const { postStatus,recruitPostId } = data;
  const [phone,setPhone] = React.useState("");
  const postedFn = () => {
    console.log("已投递 data",data,type);
    if(Number(type) === 0) return;
    if(Number(type) === 3) return;
    return <span>已投递</span>;
  };
  const disinterestFn = () =>{
    if(Number(type) === 0) return;
    if(Number(type) === 1) return;
    if(Number(postStatus) === 2) return;
    return <span onClick={cancelFn}>取消感兴趣</span>;
  };
  const postClosing = () => {
    if(Number(type) === 0) return;
    if(Number(postStatus) === 2){
      return <span>岗位关闭</span>;
    }
  };
  const cancelFn = async() => {
    const {data:rs} = await axios.put("/cpe/post/concern/cancel",{
      recruitPostId
    });
    if(rs.code === 200){
      cb();
      message.success("操作成功");
    }
  };
  const callFn = async() => {
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

  return (
    <div className="trenching_home_lists">
      <div className="trenching_content_layout_lists_left">
        <section className="trenching_content_layout_lists_div">
          <div className="trenching_content_layout_lists_div_personnel">
            <img src={data.hrPicture}  alt="" />
            <span>{data.hrName}/HR</span>
          </div>
          <div className="trenching_content_layout_lists_div_title">
            <span className="trenching_content_layout_lists_div_title_left">{data.postName}</span>
            <span className="trenching_content_layout_lists_div_title_right">{`${data.salaryMin/10000}万-${data.salaryMax}·${data.salaryNum}薪`}</span>
          </div>
          <div className="trenching_content_layout_lists_div_btns">
            <span className="trenching_content_layout_lists_div_btns_item">{data.workAddrCityName}</span>
            <span className="trenching_content_layout_lists_div_btns_item">{data.workExperience}</span>
            <span className="trenching_content_layout_lists_div_btns_item">{data.education}</span>
          </div>
        </section>
      </div>
      <div className="trenching_content_layout_lists_center">
        <img src={data.companyLogo}  alt="" />
        <div>{data.postName}</div>
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