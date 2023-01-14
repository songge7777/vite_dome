import * as React from "react";
import Header from "@/components/home/header";

import call from "@/img/call.png";
import Address from "@/img/address.png";
import "@/styles/pages/moreCompany.scss";
import { useNavigate ,useLocation } from "react-router-dom";
import BrowseInformationCard from "@/components/home/browseInformationCard";
import axios from "@/api/axios";
import { useSelector } from "react-redux";
import { Modal  } from "antd";

const MoreCompany = () => {
  const routeConfig = useLocation();
  const navigate  = useNavigate();
  const [dataItem,setDataItem] = React.useState({});
  const [companySize,setCompanySize] = React.useState([]);
  const [enterpriseType,setEnterpriseType] = React.useState([]);
  const [dataList,setDataList] = React.useState([]);
  const { loginInfo } = useSelector((store: any) => store.login);
 
  const getData = async(companyId) => {
    const {data} = await axios.post("/cpe/post/search/company/post",{
      pageNum:1,
      pageSize:50,
      query:{companyId}
    });
    setDataList(data.data.rows);
  };
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
    ;
    setDataItem(routeConfig.state.dataItem);
    const rs = await getData(routeConfig.state.companyId);
  
  };

  const filter = (data,id) => {
    if(Boolean(data.length)) return;
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
                  <div className="top_title_info_title">{dataItem.companyName}</div>
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
                    <div className="main_right_call"
                      onClick={(e)=>callFn(e,item)}>
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

export default MoreCompany;