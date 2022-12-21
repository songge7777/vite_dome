import * as React from "react";
import { connect } from "react-redux";
import { CombinedState, CounterState } from "../store/reducers";
import * as actions from "@/store/actions/counter";
import "@/styles/pages/search.scss";
import Card from "@/components/search/card";
import SearchHeader from "@/components/home/searchHeader";
import Header from "@/components/home/Header";
import Login from "@/components/home/loginCard";
import PersonalInfoCard from "@/components/home/personalInfoCard";
import ResumeManagementCard from "@/components/home/resumeManagementCard";
import BrowseInformationCard from "@/components/home/BrowseInformationCard";
import { useLocation } from "react-router-dom";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
type Props = StateProps & DispatchProps 
import Axios from "axios";
import axios from "@/api/axios";
const Counter = () =>{
  const routeConfig = useLocation();
  const [info, setInfo] = React.useState({});
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
    const {data:rs} = await axios.post("/cpe/post/search",data);
    console.log("==>",rs.data);
    setGetListData(rs.data);
  };
  const init = async()=>{
    console.log("routeConfig",routeConfig);
    const {data} = await axios.get("/cpe/post/info");
    setInfo(data.data);
    console.log("个人信息",data.data);
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

const mapStateToProps = function (state: CombinedState): CounterState {
  return state.counter;
};

export default connect(mapStateToProps, actions)(Counter);