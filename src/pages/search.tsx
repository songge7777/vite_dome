import * as React from "react";
import "@/styles/pages/search.scss";
import Card from "@/components/search/card";
import SearchHeader from "@/components/home/searchHeader";
import Header from "@/components/home/header";
import Login from "@/components/home/loginCard";
import PersonalInfoCard from "@/components/home/personalInfoCard";
import ResumeManagementCard from "@/components/home/resumeManagementCard";
import BrowseInformationCard from "@/components/home/browseInformationCard";
import { useLocation } from "react-router-dom";

import axios from "@/api/axios";
const Search = () =>{
  const routeConfig = useLocation();
  const [info, setInfo] = React.useState({});
  const [getListData,setGetListData] = React.useState([]);
  const initData = async(searchData:any) => {
    const data = {
      query:{
        workAddrCityCode:searchData.workAddrCityCode,
        search:searchData.inputValue,
        education:searchData.education,
        salaryMin:searchData.salaryMin,
        salaryMax:searchData.salaryMax,
        workExperience:searchData.workExperience,
        postCategory:searchData.postCategory,
        industryCategory:searchData.industryCategory,
        companyScale:searchData.companyScale,
      },
      pageNum:1,
      pageSize:10
    };
    const {data:rs} = await axios.post("/cpe/post/search",data);
    console.log("==>",rs.data);
    setGetListData(rs.data.rows);
  };
  const init = async()=>{
    // console.log("routeConfig",routeConfig);
    const {data} = await axios.get("/cpe/post/info");
    setInfo(data.data);
    console.log("个人信息",data);
  };
  React.useEffect(()=>{
    initData({});
    init();
  },[]);
  return (
    <div className="search_layout">
      <Header />
      <div className="search_options">
        <div className="search_options_layout">
          <SearchHeader cb={initData}/>
        </div>
      </div> 
      <div className="search_lists">
        <div className="search_lists_content">
          <div className="search_lists_content_left">
            {Array.isArray(getListData) && getListData.map((item,index) => <Card key={index} data={item} />)}
            
          </div>
          <div className="search_lists_content_right">
            {
              info ? <React.Fragment>
                <PersonalInfoCard info={info} />
                <ResumeManagementCard />
                <BrowseInformationCard />
              </React.Fragment>
                :
                <Login />
            }
          </div>
        </div> 
      </div> 
    </div>
  );
};


export default Search;