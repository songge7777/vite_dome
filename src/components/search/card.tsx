import * as React from "react";
import LOGO from "@/img/LOGO.png";
import "@/styles/pages/searchCard.scss";
import { useNavigate } from "react-router-dom";
import { workExperience,educationalRequirementsDta } from "@/utils/optionList";
import { useSelector } from "react-redux";
import axios from "@/api/axios";
import { Modal  } from "antd";
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
  const workExperienceFilter =(id)=>{
    const rs = workExperience().filter(item => Number(item.id) === Number(id));
    return rs[0] ? rs[0].value :"";
  };
  const educationalRequirementsDtaFilter = (id)=>{
    const rs = educationalRequirementsDta().filter(item => Number(item.id) === Number(id));
    return rs[0] ? rs[0].value :"";
  };
  const { loginInfo } = useSelector((store: any) => store.login);
  const callFn = async(e,item) => {
    e.stopPropagation();
    if(!loginInfo.userId){
      navigate("/login");
      return;
    }
    const {data:rs} = await axios.put("/cpe/post/interact",{
      recruitPostId: item.recruitPostId
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
  return (
    <div className="search_home_lists" onClick={()=>goToPage(data)} >
      <div className="search_content_layout_lists_left">
        <section className="search_content_layout_lists_div">
          <div className="search_content_layout_lists_div_title">
            <span className="search_content_layout_lists_div_title_left">{data.postName}</span>
            <span className="search_content_layout_lists_div_title_right">{data.salaryMin / 10000}万-{data.salaryMax /10000}万·{data.salaryNum}薪</span>
          </div>
          <div className="search_content_layout_lists_div_btns">
            <span className="search_content_layout_lists_div_btns_item">{data.workAddrCityName}</span>
            <span className="search_content_layout_lists_div_btns_item">{workExperienceFilter(data.workExperience)}</span>
            <span className="search_content_layout_lists_div_btns_item">{educationalRequirementsDtaFilter(data.education)}</span>
          </div>
          <div className="search_content_layout_lists_div_bottom">
            {Array.isArray(data.postKeywordList) && data.postKeywordList.map((i,index) => <span className="search_content_layout_lists_div_bottom_name" key={index}>{i}</span>)}
          </div>
        </section>
      </div>
      <div className="search_content_layout_lists_right">
        <img src={data.companyLogo} className="search_content_layout_lists_right_img" alt="" />
        <div className="search_content_layout_lists_right_info">
          <div className="search_content_layout_lists_right_info_company">{data.companyName}</div>
          <div className="search_content_layout_lists_right_info_personnel">
            <img src={data.hrPicture}  alt="" />
            <span>{data.hrName}/HR</span>
          </div>
          <div className="search_content_layout_lists_right_info_call"
            onClick={(e)=>callFn(e,data)}
          >
            <img src={LOGO}  alt="" />
              立即沟通
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;