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

const Personal = () => { 
  const [info, setInfo] = React.useState({});
  const [listData,setListData] = React.useState([]);
  const getList = async() => {
    // 获取首页列表数据
    const {data} = await axios.post("/cpe/resume/choice",{
      pageNum:1,
      pageSize:10,
      query:{}
    });
    setListData(data.data.rows);
  };
 
  React.useEffect(()=>{
    getList();
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
              <SearchHeader />
            </div>
            {listData && listData.map((item,index) => <Card key={index} data={item} />)}

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

export default Personal;