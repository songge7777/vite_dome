import * as React from "react";
import "@/styles/pages/search.scss";
import Card from "@/components/search/card";
import SearchHeader from "@/components/home/searchHeader";
import Header from "@/components/home/header";
import Login from "@/components/home/loginCard";
import PersonalInfoCard from "@/components/home/personalInfoCard";
import ResumeManagementCard from "@/components/home/resumeManagementCard";
import BrowseInformationCard from "@/components/home/browseInformationCard";
import axios from "@/api/axios";
import { useSelector } from "react-redux";

const Personal = () => { 
  const [info, setInfo] = React.useState({});
  const [getListData,setGetListData] = React.useState([]);
  const [listData,setListData] = React.useState([]);
  const { loginInfo } = useSelector((store: any) => store.login);
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
    console.log("==>1",rs.data);
    setGetListData(rs.data.rows);
  };
  React.useEffect(()=>{
    initData({});
    init();
  },[]);
  const init = async()=>{
    const {data} = await axios.get("/cpe/post/info");
    setInfo(data.data);
    console.log("个人信息",data.data);
  };
  return (
    <div className="search_layout">
      <Header />
      <div className="search_options">
          
      </div> 
      <div className="search_lists">
        <div className="search_lists_content">
          <div className="search_lists_content_left">
            <div className="search_lists_content_left_top">
              <SearchHeader cb={initData}/>
            </div>
            {Array.isArray(getListData) && getListData.map((item,index) => <Card key={index} data={item} />)}

          </div>
          <div className="search_lists_content_right">
            {
              loginInfo.userId ? <React.Fragment>
                <PersonalInfoCard />
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

export default Personal;