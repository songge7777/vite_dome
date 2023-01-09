import * as React from "react";
import Header from "@/components/home/header";
import People from "@/img/people.png";
import FullTime from "@/img/fullTime.png";
import Experience from "@/img/experience.png";
import Education from "@/img/education.png";
import call from "@/img/call.png";
import Address from "@/img/address.png";
import UnFollow from "@/img/unfollow.png";
import "@/styles/pages/viewPosition.scss";
import AMapLoader from "@amap/amap-jsapi-loader";
import { useNavigate ,useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { workExperience,educationalRequirementsDta } from "@/utils/optionList";

import axios from "@/api/axios";
import { Button,message,Modal } from "antd";

const ViewEnterprise = () => {
  const routeConfig = useLocation();
  const { loginInfo } = useSelector((store: any) => store.login);
  const navigate  = useNavigate();
  const [companySize,setCompanySize] = React.useState([]);
  const [enterpriseType,setEnterpriseType] = React.useState([]);
  const [recruitPostData,setRecruitPostData] = React.useState([]);
  const [positionData,setPositionData] = React.useState({});
  const initMap = async(data) => {
    let map = {};
    const MpInstance = await AMapLoader.load({
      key: "db1560ddcb7db484b9c65f04f60d04ac", // 申请好的Web端Key，首次调用 load 时必填
      version: "2.0"
    });
    map = new MpInstance.Map("mapcontainer",{
      zoom: 15,
      plugins:["AMap.Scale","AMap.ToolBar"],
      center:[data.workAddrLongitude,data.workAddrLatitude]
    });
  };
  const getData = async(recruitPostId) => {
    if(loginInfo.userId){
      const {data} = await axios.get(`/cpe/post/${recruitPostId}/${loginInfo.userId}`);
      console.log("dat=>a",data.data);
      setPositionData(data.data);
      return data.data;
    }else{
      const {data} = await axios.get(`/cpe/post/${recruitPostId}`);
      console.log("dat=>a",data.data);
      setPositionData(data.data);
      return data.data;
    }
  };
  // 相似岗位
  const geiRecruitPostData = async(recruitPostId) => {
    const {data} = await axios.post("/cpe/post/search/resemble/post",{
      pageNum:1,
      pageSize:10,
      query:{recruitPostId}
    });
    setRecruitPostData(data.data.rows);
  };
  // 字典 查数据
  const getT = async(key) => {
    const {data} = await axios.get(`/sys/dict_item/type/${key}`);
    return data.data;
  };
  const getInit = async() => {
    const rs1 = await getT("company_size");
    setCompanySize(rs1);
    const rs2 = await getT("enterprise_type");
    setEnterpriseType(rs2);
    const rs = await getData(routeConfig.state);
    initMap(rs);
    geiRecruitPostData(rs.recruitPostId);
    console.log("routeConfig.state",routeConfig.state);
    console.log("rs.recruitPostId",rs.recruitPostId);
  
  };

  const filter = (data,id) => {
    if(!Boolean(data.length)) return;
    const r = data.filter(i => Number(i.value)===Number(id))[0];
    const label =  r ? r.label : "";
    return label;
  };

  const goToPageCompany = (data) => {
    navigate("/viewEnterprise",{state:data.companyId});
  };

  const send = async() => {
    if(!loginInfo.userId){
      navigate("/login");
      return;
    }
    const {data} = await axios.put("/cpe/post/send",{
      recruitPostId:routeConfig.state
    });
    if(data.code === 200 && data.data){
      message.success("已投递");
      getData(routeConfig.state);
    }
  };
  const concern = async () => {
    if(!loginInfo.userId){
      navigate("/login");
      return;
    }
    const {data} = await axios.put("/cpe/post/concern",{
      recruitPostId:routeConfig.state
    });
    if(data.code === 200 && data.data){
      message.success("已操作");
      getData(routeConfig.state);
    } 
  };
  const cancel = async() => {
    const {data} = await axios.put("/cpe/post/concern/cancel",{
      recruitPostId:routeConfig.state
    });
    if(data.code === 200 && data.data){
      message.success("已操作");
      getData(routeConfig.state);
    } 
  };
  const callFn = async() => {
    if(!loginInfo.userId){
      navigate("/login");
      return;
    }
    const {data:rs} = await axios.put("/cpe/post/interact",{
      recruitPostId:routeConfig.state
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
  const workExperienceFilter =(id)=>{
    const rs = workExperience().filter(item => Number(item.id) === Number(id));
    return rs[0] ? rs[0].value :"";
  };
  const educationalRequirementsDtaFilter = (id)=>{
    const rs = educationalRequirementsDta().filter(item => Number(item.id) === Number(id));
    return rs[0] ? rs[0].value :"";
  };
  const goToPage = () => {
    navigate("/viewPosition",{state:routeConfig.state});
  };
  React.useEffect(()=>{
    getInit();
  },[]);
  return (
    <div className="viewPosition_layout">
      <Header />
      <div className="viewPosition_lists">
        <div className="viewPosition_lists_content">
          <div className="viewPosition_lists_content_left">
            <section className="viewPosition_lists_content_left_title">
              <div className="section_top">
                <span className="section_top_name">{positionData.postName}</span>
                <span className="section_top_money">{positionData.salaryMin/10000}万-{positionData.salaryMax/10000}万*{positionData.salaryNum}薪</span>
              </div>
              <div className="section_bottom">
                <div className="section_icons">
                  <img src={Address} alt="" />
                  <span>{positionData.workAddrCityName}</span>
                  <img src={Experience} alt="" />
                  <span>{workExperienceFilter(positionData.workExperience)}</span>
                  <img src={Education} alt="" />
                  <span>{educationalRequirementsDtaFilter(positionData.education)}</span>
                  <img src={FullTime} alt="" />
                  <span>{positionData.workNature}</span>
                  <img src={People} alt="" />
                  <span>{positionData.recruitNum}人</span>
                </div>
                <div className="section_btns" >
                  {
                    positionData.concernStatus ?
                      
                      <span className="span" onClick={cancel}>
                    取消感兴趣
                      </span>
                      :
                      <div className="section_btns" onClick={concern}>
                        <img src={UnFollow} alt="" />
                        <span className="span">
                          感兴趣
                        </span>
                      </div>
                  }
                  {
                    positionData.sendStatus ? <div  className="btn">已经投递</div>:
                      <Button onClick={send} className="btn">投递</Button>
                  }
                  
                </div>
              </div>
            </section>
            {/* list */}
            <div className="viewPosition_lists_content_left_content">
              <div className="viewPosition_lists_content_left_content_first">职位描述</div>
              <div className="viewPosition_lists_content_left_content_postBtns">
                {positionData.postKeyword && positionData.postKeyword.map((item,index) =><span key={index}>{item}</span>)}
              </div>
              <div className="viewPosition_lists_content_left_content_second">{positionData.postDesc}</div>

              {/* <div className="viewPosition_lists_content_left_content_second">岗位职责</div>
              <div className="viewPosition_lists_content_left_content_secondItem">
              1，配合项目计划
              </div>
              <div className="viewPosition_lists_content_left_content_second">任职要求</div>
              <div className="viewPosition_lists_content_left_content_secondItem">
              1，配合项目计划
              </div> */}
              <div className="viewPosition_lists_content_left_content_first">职位福利</div>
              <div className="viewPosition_lists_content_left_content_welfareBtns">
                {positionData.postWelfare && positionData.postWelfare.map((item,index) =><span key={index}>{item}</span>)}
              </div>
              <div className="viewPosition_lists_content_left_content_first">工作地点</div>
              <div className="viewPosition_lists_content_left_content_second">
                {positionData.workAddrProvinceName}
                {positionData.workAddrCityName}
                {positionData.workAddrCountyName}
                {positionData.workAddrDetail}
              </div>
              <div id="mapcontainer" />
            </div>
          </div>
          <div className="viewPosition_lists_content_right">
            <div className="right_divTop">
              <img src={People} alt="" />
              <span className="right_divTop_name">{positionData.hrName}/HR</span>
              <div className="right_divTop_btn" onClick={callFn}>
                <img src={call}  alt="" />
                <span>立即沟通</span>
              </div>
            </div>
            <div className="right_divTip" onClick={()=>goToPageCompany(positionData)}>
              <img src={positionData.companyLogo} alt="" />
              <span className="span">{positionData.companyName}</span>
              <div>
                <span className="btn">
                  {/* enterprise_type */}
                  {filter(enterpriseType,positionData.enterpriseType)}
                </span>
              </div>
              <div>
                <span  className="btn">
                  {/* company_size */}
                  
                  {filter(companySize,positionData.scale)}
                </span>
              </div>
              <div>
                <span  className="btn">
                  {positionData.companyIndustryCategory}
                </span>
              </div>
              
            </div>
            <div className="right_divList">
              <div className="right_divList_title">相似岗位</div>
              {recruitPostData && recruitPostData.map((item,index)=> <section key={index} className="right_divList_section"  onClick={goToPage} >
                <div className="right_divList_section_top">
                  <span className="right_divList_section_top_name">{item.postName}</span>
                  <span className="right_divList_section_top_money">{item.salaryMin/10000}万-{item.salaryMax/10000}万*${item.salaryNum}薪水</span>
                </div>
                <div className="section_center">
                  {item.postKeywordList && item.postKeywordList.map((i,j)=><span key={j}>{i}</span>)}
                </div>
                <div className="section_bottom">
                  <img src={item.companyLogo} alt="" />
                  <span className="section_bottom_name">{item.companyName}</span>
                  <span className="section_bottom_address">{item.workAddrCityName}-{item.workAddrCountyName}</span>
                </div>
              </section>)}
            </div>
          </div>
        </div> 
      </div> 
    </div>
  );
};

export default ViewEnterprise;