import * as React from "react";
import LOGO from "@/img/LOGO.png";
import "@/styles/pages/card.scss";
import { useNavigate } from "react-router-dom";
type Props = {
  data:{}
}
const Card:React.FC = (props:Props)=>{
  const {data} = props;
  const navigate = useNavigate();
  const goToPage = (data:{}) => {
    const { recruitPostId } = data;
    navigate("/viewPosition",{state:recruitPostId});
  };
  return (
    <section className="home_content_layout_lists_div" onClick={()=>goToPage(data)} >
      <div className="home_content_layout_lists_div_title">
        <span className="home_content_layout_lists_div_title_left">{data.postName}</span>
        <span className="home_content_layout_lists_div_title_right">{data.salaryMin / 10000}万-{data.salaryMax /10000}万·{data.salaryNum}薪</span>
      </div>
      <div className="home_content_layout_lists_div_btns">
        <span className="home_content_layout_lists_div_btns_item">{data.workAddrCityName}</span>
        <span className="home_content_layout_lists_div_btns_item">{data.workExperience}</span>
        <span className="home_content_layout_lists_div_btns_item">{data.education}</span>
      </div>
      <div className="home_content_layout_lists_div_bottom">
        <img src={data.companyLogo} alt="" className="home_content_layout_lists_div_bottom_img" />
        <span className="home_content_layout_lists_div_bottom_name">{data.companyName}</span>
        <span className="home_content_layout_lists_div_bottom_address">{data.workAddrCityName}-{data.workAddrCountyName}</span>
      </div>
    </section>
  );
};
export default Card;