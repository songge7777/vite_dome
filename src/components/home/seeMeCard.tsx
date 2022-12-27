import * as React from "react";
import logoqiye from "@/img/logoqiye.png";
import call from "@/img/call.png";
import "@/styles/pages/seeMeCard.scss";
/**
 * 看过我
 * 
 */ 
type Props = {
  data:{}
}
const seeMeCard = (props:Props) => {
  const {data} = props;
  console.log("看过我",data);
  return (
    <div className="seeMe_home_lists">
      <div className="seeMe_content_layout_lists_left">
        <div className="seeMe_content_layout_lists_personnel">
          <img src={data.hrPicture}  alt="" />
          <span>{data.hrName}/HR</span>
        </div>
       
      </div>
      <div className="seeMe_content_layout_lists_center">
        <img src={data.companyLogo}  alt="" />
        <div className="seeMe_content_layout_lists_center_list">
          <span className="seeMe_content_layout_lists_center_list_company">{data.companyName}</span>
          <section className="seeMe_content_layout_lists_center_btns">
            {data.postKeywordList && data.postKeywordList.map((i,index) => <span key={index}>{i}</span>)}
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