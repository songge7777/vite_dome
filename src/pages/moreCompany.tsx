import * as React from "react";
import { connect } from "react-redux";
import { CombinedState, CounterState } from "../store/reducers";
import * as actions from "@/store/actions/counter";
import Header from "@/components/home/header";
import People from "@/img/people.png";
import FullTime from "@/img/fullTime.png";
import Experience from "@/img/experience.png";
import Education from "@/img/education.png";
import call from "@/img/call.png";
import Address from "@/img/address.png";
import UnFollow from "@/img/unfollow.png";
import Follow from "@/img/follow.png";
import classnames from "classnames";
import "@/styles/pages/moreCompany.scss";
import AMapLoader from "@amap/amap-jsapi-loader";
import { useNavigate ,useLocation } from "react-router-dom";
import BrowseInformationCard from "@/components/home/browseInformationCard";
import axios from "@/api/axios";

import { Button } from "antd";
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
type Props = StateProps & DispatchProps 

const MoreCompany = () => {
  const routeConfig = useLocation();
  const navigate  = useNavigate();
  const [dataItem,setDataItem] = React.useState({});
  const [companySize,setCompanySize] = React.useState([]);
  const [enterpriseType,setEnterpriseType] = React.useState([]);
  const [dataList,setDataList] = React.useState([]);
 
  const getData = async(companyId) => {
    const {data} = await axios.post("/cpe/post/search/company/post",{
      pageNum:1,
      pageSize:10,
      query:{companyId}
    });
    setDataList(data.data.rows);
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
    console.log("routeConfig",routeConfig);
    setDataItem(routeConfig.state.dataItem);
    const rs = await getData(routeConfig.state.companyId);
  
  };

  const filter = (data,id) => {
    const r = data.filter(i => Number(i.value)===Number(id))[0];
    const label =  r ? r.label : "";
    return label;
  };

  React.useEffect(()=>{
    getInit();
  },[]);
  return (
    <div className="moreCompany_layout">
      <Header />
      <div className="moreCompany_lists">
        <div className="moreCompany_lists_content">
          <div className="moreCompany_lists_content_left">
            <section className="moreCompany_lists_content_left_title">
              <div className="top_title">
                <img src={Address} alt="" />
                <div className="top_title_info">
                  <div className="top_title_info_title">东风汽车</div>
                  <span>{filter(enterpriseType,dataItem.enterpriseType)}</span>
                  <span>{filter(companySize,dataItem.scale)}</span>
                  <span>{dataItem.companyIndustryCategory}</span>
                </div>
              </div>
              <div className="top_tip">
                {dataItem.introduce}
              </div>
            </section>
            {/* list */}
            <div className="moreCompany_lists_content_left_content">
              {dataList && dataList.map((item,index) => {
                return  <div key={index} className="moreCompany_lists_content_left_content_first">
                  <section className="main_left">
                    <div className="main_left_top">
                      <span className="main_left_top_name">{item.postName}</span>
                      <span className="main_left_top_money">{item.salaryMin/10000}万-{item.salaryMax/10000}万·{item.salaryNum}薪</span>
                    </div>
                    <div className="main_left_middle">
                      {item.postKeywordList && item.postKeywordList.map((item,index)=><span key={index}>{item}</span>)}
                    </div>
                    <div className="main_left_bottom">{item.workAddrCityName}-{item.workAddrCountyName}</div>
                  </section>
                  <section className="main_right">
                    <img className="main_right_img" src={item.hrPicture} alt="" />
                    <span className="main_right_hr">{item.hrName}/HR</span>
                    <div className="main_right_call">
                      <img src={call}  alt="" />
                      <span>立即沟通</span>
                    </div>
                  </section>
                </div>;
              })}
            </div>
          </div>
          <div className="moreCompany_lists_content_right">
            <BrowseInformationCard />
          </div>
        </div> 
      </div> 
    </div>
  );
};

const mapStateToProps = function (state: CombinedState): CounterState {
  return state.counter;
};

export default connect(mapStateToProps, actions)(MoreCompany);