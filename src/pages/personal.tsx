import * as React from "react";
import { connect } from "react-redux";
import { CombinedState, CounterState } from "../store/reducers";
import * as actions from "@/store/actions/counter";
import "@/styles/pages/search.scss";
import Card from "@/components/search/card";
import SearchHeader from "@/components/home/searchHeader";
import Header from "@/components/home/header";
import Login from "@/components/home/loginCard";
import PersonalInfoCard from "@/components/home/personalInfoCard";
import ResumeManagementCard from "@/components/home/resumeManagementCard";
import BrowseInformationCard from "@/components/home/browseInformationCard";
import axios from "@/api/axios";
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
type Props = StateProps & DispatchProps 

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
  const searchList = async(data)=> {
    const {code:workAddrCityCode,value:search} = data;
    const {data: rs} = await axios.post("/cpe/post/search",{
      pageNum:1,
      pageSize:10,
      query:{
        search,
        workAddrCityCode
      }
    });
    setListData(rs.data.rows);
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

const mapStateToProps = function (state: CombinedState): CounterState {
  return state.counter;
};

export default connect(mapStateToProps, actions)(Personal);