import * as React from "react";
import "@/styles/pages/personalInfoCard.scss";
import LOGO from "@/img/LOGO.png";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";

type Props = {
  info:{}
}
const PersonalInfoCard = (props:Props) => {
  const [userInfo,setUserInfo] = React.useState({});
  const {info} = props;
  const navigate = useNavigate();
  const goToProfile = (num:number) => {
    console.log("num",num);
    navigate(`/personalTab?userId=${userInfo.userId}&num=${num}`);
  };
  const getUserInfo = async () => {
    const {data} = await axios.get("/auth/client/info");
    return data.data;
  };
  const init = async()=>{
    const data = await getUserInfo();
    setUserInfo(data);
  };

  React.useEffect(()=>{
    init();
  },[]);
  return (
    <section className="personalInfo_layout">
      {/* 头 */}
      <div className="personalInfo_header" onClick={()=>goToProfile()}>
        <img className="personalInfo_header_img" src={info.picture} alt="" />
        <span className="personalInfo_header_name">{info.name}</span>
      </div>
      {/* tip */}
      <div className="personalInfo_tip" onClick={()=>goToProfile()}>
        <span  className="personalInfo_tip_age">{info.age}岁</span>
        <span  className="personalInfo_tip_experience">{info.workExperience}年经验</span>
        <span className="personalInfo_tip_education">{info.education}</span>
      </div>
      {/* offer */}
      <div className="personalInfo_offer">
        <section className="personalInfo_offer_left">
          <span className="personalInfo_offer_left_num">{info.interviewNum}</span>
          <span>我的面试</span>
        </section>
        <section className="personalInfo_offer_right">
          <span  className="personalInfo_offer_left_num">{info.offerNum}</span>
          <span>我的offer</span>
        </section>
      </div>
      {/* 底部 */}
      <div className="personalInfo_bottom">
        <section className="personalInfo_bottom_div" onClick={()=>goToProfile(0)}>
          <span className="personalInfo_bottom_div_num">{info.interactNum}</span>
          <span className="personalInfo_bottom_div_title">已沟通</span>
        </section>
        <section className="personalInfo_bottom_div" onClick={()=>goToProfile(1)}>
          <span className="personalInfo_bottom_div_num">{info.sendNum}</span>
          <span className="personalInfo_bottom_div_title">已投递</span>
        </section>
        <section className="personalInfo_bottom_div" onClick={()=>goToProfile(3)}>
          <span className="personalInfo_bottom_div_num">{info.concernNum}</span>
          <span className="personalInfo_bottom_div_title">感兴趣</span>
        </section>
      </div>
    </section>
  );
};
export default PersonalInfoCard;