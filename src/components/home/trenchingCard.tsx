import * as React from "react";
import LOGO from "@/img/LOGO.png";
import "@/styles/pages/trenchingCard.scss";
/**
 * 感兴趣
 * 已投递
 * 沟通过
 * 我看过
 * 
 */ 
type Props = {
  data:{}
}
const TrenchingCard:React.FC = (props:Props) =>{
  const {data}= props;
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
          <span>已投递</span>
          <span>取消感兴趣</span>
          {/* postStatus  */}
          <span>岗位关闭</span>
        </div>
        <div className="trenching_content_layout_lists_right_call">
          <img src={LOGO}  alt="" />
          <span>立即沟通</span>
        </div>
      </div>
    </div>
  );
};
export default TrenchingCard;