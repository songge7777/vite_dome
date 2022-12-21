import * as React from "react";
import { connect } from "react-redux";
import { CombinedState, CounterState } from "../store/reducers";
import * as actions from "@/store/actions/counter";
import Header from "@/components/home/Header";
import People from "@/img/people.png";
import FullTime from "@/img/fullTime.png";
import Experience from "@/img/experience.png";
import Education from "@/img/education.png";
import call from "@/img/call.png";
import Address from "@/img/address.png";
import UnFollow from "@/img/unfollow.png";
import Follow from "@/img/follow.png";
import classnames from "classnames";
import "@/styles/pages/viewPosition.scss";
import AMapLoader from "@amap/amap-jsapi-loader";
import { useLocation } from "react-router-dom";

import axios from "@/api/axios";
import { Button } from "antd";
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
type Props = StateProps & DispatchProps 

const ViewEnterprise = () => {
  const routeConfig = useLocation();
  const [recruitPostData,setRecruitPostData] = React.useState([]);
  const [positionData,setPositionData] = React.useState({});
  const initMap = async(data) => {
    let map = {};
    const MpInstance = await AMapLoader.load({
      key: "db1560ddcb7db484b9c65f04f60d04ac", // 申请好的Web端Key，首次调用 load 时必填
      version: "2.0"
    });
    console.log("positionData",data);
    map = new MpInstance.Map("mapcontainer",{
      zoom: 15,
      plugins:["AMap.Scale","AMap.ToolBar"],
      center:[data.workAddrLongitude,data.workAddrLatitude]
    });
  };
  const getData = async(recruitPostId) => {
    const {data} = await axios.get(`/cpe/post/${recruitPostId}`);
    setPositionData(data.data);
    return data.data;
  };
  const geiRecruitPostData = async(recruitPostId) => {
    const {data} = await axios.post("/cpe/post/search/resemble/post",{
      pageNum:1,
      pageSize:10,
      param:{recruitPostId}
    });
    setRecruitPostData(data.data);
    console.log("data", data.data);
  };
  const getInit = async() => {
    const rs = await getData(routeConfig.state);
    initMap(rs);
    geiRecruitPostData(rs.recruitPostId);
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
                  <span>{positionData.workExperience}年</span>
                  <img src={Education} alt="" />
                  <span>{positionData.education}</span>
                  <img src={FullTime} alt="" />
                  <span>{positionData.workNature}</span>
                  <img src={People} alt="" />
                  <span>{positionData.recruitNum}人</span>
                </div>
                <div className="section_btns">
                  <img src={UnFollow} alt="" />
                  <span className="span">
                   感兴趣
                  </span>
                  <Button className="btn">投递</Button>
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
              <div className="right_divTop_btn">
                <img src={call}  alt="" />
                <span>立即沟通</span>
              </div>
            </div>
            <div className="right_divTip">
              <img src={positionData.companyLogo} alt="" />
              <span className="span">{positionData.companyName}</span>
              <div>
                <span className="btn">
                国企
                </span>
              </div>
              <div>
                <span  className="btn">
                10000人以上
                </span>
              </div>
              <div>
                <span  className="btn">
                汽车
                </span>
              </div>
              
            </div>
            <div className="right_divList">
              <div className="right_divList_title">相似岗位</div>
              {recruitPostData && recruitPostData.map((item,index)=> <section key={index} className="right_divList_section">
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

const mapStateToProps = function (state: CombinedState): CounterState {
  return state.counter;
};

export default connect(mapStateToProps, actions)(ViewEnterprise);