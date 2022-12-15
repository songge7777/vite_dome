import * as React from "react";
import { connect } from "react-redux";
import { CombinedState, CounterState } from "../store/reducers";
import * as actions from "@/store/actions/counter";
import "@/styles/pages/search.scss";
import Card from "@/components/search/card";
import SearchHeader from "@/components/home/searchHeader";
import Header from "@/components/home/Header";
import Login from "@/components/home/login";
import PersonalInfoCard from "@/components/home/personalInfoCard";
import ResumeManagementCard from "@/components/home/resumeManagementCard";
import BrowseInformationCard from "@/components/home/BrowseInformationCard";
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
type Props = StateProps & DispatchProps 
import axios from "@/api/axios";
const Counter = () =>{
  const [getListData,setGetListData] = React.useState([]);
  const initData = async(searchData:any) => {
    const data = {
      param:{
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
    const {data:rs} = await axios.post("/cpe/resume/search",data);
    console.log("==>",rs.data);
    setGetListData(rs.data);
  };
  React.useEffect(()=>{
    initData({});
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
            <PersonalInfoCard />
            <Login />
            <ResumeManagementCard />
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

export default connect(mapStateToProps, actions)(Counter);