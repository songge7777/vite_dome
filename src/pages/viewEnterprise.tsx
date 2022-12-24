import * as React from "react";
import { connect } from "react-redux";
import { CombinedState, CounterState } from "../store/reducers";
import * as actions from "@/store/actions/counter";
import Header from "@/components/home/Header";
import Axios from "axios";
import goback from "@/img/goback.png";
import classnames from "classnames";
import AMapLoader from "@amap/amap-jsapi-loader";
import "@/styles/pages/viewEnterprise.scss";
import axios from "@/api/axios";
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
type Props = StateProps & DispatchProps 
import { useLocation,useNavigate } from "react-router-dom";

const ViewEnterprise = () => {
  const [companySize,setCompanySize] = React.useState([]);
  const [enterpriseType,setEnterpriseType] = React.useState([]);
  const routeConfig = useLocation();
  const navigate = useNavigate();
  const [dataItem,setDataItem] = React.useState({});
  const [dataList,setDataList] = React.useState([]);
  const getData = async(companyId) => {
    const {data} = await  axios.get(`/cpe/post/company/${companyId}`);
    setDataItem(data.data);
    return data.data;
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
    const id = routeConfig.state;
    getCompanyPost(id);
    const rs = await getData(id);
    initMap(rs);
  };
  const filter = (data,id) => {
    const r = data.filter(i => Number(i.value)===Number(id))[0];
    const label =  r ? r.label : "";
    return label;
  };
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

  const getCompanyPost = async(companyId) => {
    const {data} = await axios.post("/cpe/post/search/company/post",{
      pageNum:1,
      pageSize:10,
      query:{
        companyId
      }
    });
    setDataList(data.data.rows);
    console.log("dat",data.data);
  };
  const goToPage = (item) => {
    console.log("==>",item);
    const companyId = item.companyId;
    const state = {
      dataItem,
      companyId
    };
    navigate("/moreCompany",{state});

  };
  React.useEffect(()=>{
    getInit();
  },[]);
  return (
    <div className="enterprise_layout">
      <Header />
      <div className="enterprise_lists">
        <div className="enterprise_lists_content">
          <div className="enterprise_lists_content_left">
            <section className="enterprise_lists_content_left_title">
              <img className="enterprise_lists_content_left_title_img" src={dataItem.companyLogo} alt="" />
              <div className="enterprise_lists_content_left_title_right">
                <div className="enterprise_lists_content_left_title_right_name">{dataItem.companyName}</div>
                <div className="enterprise_lists_content_left_title_right_tips">
                  <span>{filter(enterpriseType,dataItem.enterpriseType)}</span>
                  <span>{filter(companySize,dataItem.scale)}</span>
                  <span>{dataItem.companyIndustryCategory}</span>
                </div>
              </div>
            </section>
            {/* list */}
            <div className="enterprise_lists_content_left_content">
              <div className="enterprise_lists_content_left_content_top">企业介绍</div>
              
              <div className="enterprise_lists_content_left_content_title">企业简介</div>
              <div className="enterprise_lists_content_left_content_tip">{dataItem.introduce}</div>
              
              <div className="enterprise_lists_content_left_content_title">工商信息</div>
              <section className="enterprise_lists_content_left_content_row">
                <span className="enterprise_lists_content_left_content_row_title">企业名称</span>
                <span className="enterprise_lists_content_left_content_row_value">{dataItem.companyName}</span>
              </section>
              <section className="enterprise_lists_content_left_content_row">
                <span className="enterprise_lists_content_left_content_row_title">企业代码（统一社会信用代码）</span>
                <span className="enterprise_lists_content_left_content_row_value">{dataItem.creditCode}</span>
              </section>
              <section className="enterprise_lists_content_left_content_row">
                <span className="enterprise_lists_content_left_content_row_title">企业类型</span>
                <span className="enterprise_lists_content_left_content_row_value">{filter(enterpriseType,dataItem.enterpriseType)}</span>
              </section>
              <section className="enterprise_lists_content_left_content_row">
                <span className="enterprise_lists_content_left_content_row_title">注册资本</span>
                <span className="enterprise_lists_content_left_content_row_value">{dataItem.regCapital}(元)</span>
              </section>
              <section className="enterprise_lists_content_left_content_row">
                <span className="enterprise_lists_content_left_content_row_title">成立日期</span>
                <span className="enterprise_lists_content_left_content_row_value">{dataItem.incorporationData}</span>
              </section>
              <section className="enterprise_lists_content_left_content_row">
                <span className="enterprise_lists_content_left_content_row_title">住所</span>
                <span className="enterprise_lists_content_left_content_row_value">{dataItem.residence}</span>
              </section>
              <section className="enterprise_lists_content_left_content_row">
                <span className="enterprise_lists_content_left_content_row_title">公司规模</span>
                <span className="enterprise_lists_content_left_content_row_value">{filter(companySize,dataItem.scale)}</span>
              </section>
              <section className="enterprise_lists_content_left_content_row">
                <span className="enterprise_lists_content_left_content_row_title">营业范围</span>
              </section>
              <div>
                {dataItem.businessScope}
              </div>
              <div className="enterprise_lists_content_left_content_title">公司地址</div>
              <div className="">
                {dataItem.provinceName}
                {dataItem.cityName}
                {dataItem.countyName}
                {dataItem.addr}
              </div>
              <div id="mapcontainer" />

            </div>
          </div>
          <div className="enterprise_lists_content_right">
            <div className="enterprise_lists_content_right_title">
              <span className="enterprise_lists_content_right_title_name">在招岗位</span>
              <span className="enterprise_lists_content_right_title_more" onClick={()=>goToPage(dataItem)}>更多</span>
            </div>
            { dataList && dataList.map((item,index) => <div key={index} className="enterprise_lists_content_right_lists">
              <div className="enterprise_lists_content_right_lists_top">{item.postName}</div>
              <div className="enterprise_lists_content_right_lists_btns">
                {item.postKeywordList && item.postKeywordList.map((i,j) =><span key={j}>{i}</span>) }
              </div>
              <div className="enterprise_lists_content_right_lists_bottom">
                <span className="enterprise_lists_content_right_lists_bottom_money">
                  {item.salaryMin/10000}万-{item.salaryMax/10000}万*{item.salaryNum}薪</span>
                <span className="enterprise_lists_content_right_lists_bottom_address">{item.workAddrCityName}-{item.workAddrCountyName}</span>
              </div>
            </div>)}
            
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