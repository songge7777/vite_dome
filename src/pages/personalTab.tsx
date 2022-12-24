import * as React from "react";
import { connect } from "react-redux";
import { CombinedState, CounterState } from "../store/reducers";
import * as actions from "@/store/actions/counter";
import TrenchingCard from "@/components/home/trenchingCard";
import InterviewListCard from "@/components/home/interviewListCard";
import SeeMeCard from "@/components/home/seeMeCard";
import Header from "@/components/home/Header";
import Login from "@/components/home/loginCard";
import PersonalInfoCard from "@/components/home/personalInfoCard";
import ResumeManagementCard from "@/components/home/resumeManagementCard";
import BrowseInformationCard from "@/components/home/BrowseInformationCard";
import Axios from "axios";
import goback from "@/img/goback.png";
import classnames from "classnames";
import "@/styles/pages/personalTab.scss";
import axios from "@/api/axios";
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
type Props = StateProps & DispatchProps 

const Personal = () => {
  const [info, setInfo] = React.useState({});
  const [tab,setTab] = React.useState([
    {
      id:0,
      value:"沟通过"
    },
    {
      id:1,
      value:"已投递"
    },
    {
      id:2,
      value:"我的面试"
    },
    {
      id:3,
      value:"感兴趣"
    },
    {
      id:4,
      value:"我看过"
    },
    {
      id:5,
      value:"看过我"
    },
  ]);
  const [currentIndex,setCurrentIndex] = React.useState(0);
  const [trenchingData,setTrenchingData] = React.useState([]);
  const switchTab = () => {
    switch(currentIndex){
      // 沟通过
      case 0:
        return trenchingData ? trenchingData.map((item,index)=><TrenchingCard data={item} key={index}/>): <div>暂无数据</div>;
      // 已投递
      case 1:
        return trenchingData ? trenchingData.map((item,index)=><TrenchingCard data={item} key={index}/>): <div>暂无数据</div>;
      // 我得面试
      case 2:
        return <InterviewListCard/>;
      // 感兴趣
      case 3:
        return trenchingData ? trenchingData.map((item,index)=><TrenchingCard data={item} key={index}/>): <div>暂无数据</div>;
      // 我看过
      case 4:
        return trenchingData ? trenchingData.map((item,index)=><TrenchingCard data={item} key={index}/>): <div>暂无数据</div>;
      // 看过我
      case 5:
        return <SeeMeCard/>;
    }
  };

  // 沟通过-列表
  const getTab1List = async () => {
    const data = {
      pageNum:1,
      pageSize:10,
      query:{}
    };
    const {data:rs} = await axios.post("/cpe/post/all/interact",data);
    console.log("沟通过rs=>>", rs.data);
    setTrenchingData(rs.data.rows);
  }; 
  // 已投递-列表
  const getTab2List = async () => {
    const data = {
      pageNum:1,
      pageSize:10,
      query:{}
    };
    const {data:rs} = await axios.post("/cpe/post/all/send",data);
    setTrenchingData(rs.data.rows);
    console.log("已投递rs=>>", rs.data);
  }; 
  // 感兴趣的-列表
  const getTab4List = async () => {
    const data = {
      pageNum:1,
      pageSize:10,
      query:{}
    };
    const {data:rs} = await axios.post("/cpe/post/all/concern",data);
    setTrenchingData(rs.data.rows);
    console.log("感兴趣的rs=>>", rs.data);
  }; 
  // 我看过的-列表
  const getTab5List = async () => {
    const data = {
      pageNum:1,
      pageSize:10,
      query:{}
    };
    const {data:rs} = await axios.post("/cpe/post/all/browse",data);
    setTrenchingData(rs.data.rows);
    console.log("我看过的rs=>>", rs.data);
  }; 
  // 看过我的-列表
  const getTab6List = async () => {
    const data = {
      pageNum:1,
      pageSize:10,
      query:{}
    };
    const {data:rs} = await axios.post("/cpe/post/all/me",data);
    console.log("看过我的rs=>>", rs.data);
  }; 
  // 我的面试
  const getTab7List = async () => {
    const {data:rs} = await axios.get("/cpe/post/all/interview");
    console.log("我的面试rs=>>", rs.data);
  }; 

  const clickChange = (i:number) => {
    setCurrentIndex(i);
    switch(i){
      // 沟通过
      case 0:
        getTab1List();
        return;
      // 已投递
      case 1:
        getTab2List();
        return;
      // 我得面试
      case 2:
        // getTab3List();
        return;
      // 感兴趣
      case 3:
        getTab4List();
        return;
      // 我看过
      case 4:
        getTab5List();
        return;
      // 看过我
      case 5:
        getTab6List();
        return;
    }
    console.log("i",i);
  };

  const init = async()=>{
    const {data} = await axios.get("/cpe/post/info");
    setInfo(data.data);
    console.log("个人信息",data.data);
  };

  const getInit = () => {
    init();
    getTab1List();
    // getTab2List();
    // getTab3List();
    // getTab4List();
    // getTab5List();
    // getTab6List();
  };
 
  React.useEffect(()=>{
    getInit();
  },[]);
  return (
    <div className="search_layout">
      <Header />
      <div className="search_lists">
        <div className="search_lists_content">
          <div className="search_lists_content_left">
            <div className="search_lists_content_left_top">
              {/* <SearchHeader /> */}
              <section className="tab_layout">
                <div className="tab_layout_goBack">
                  <img src={goback} alt="" />
                  <span>返回</span>
                </div>
                <div className="tab_layout_tabs">
                  {tab.map(item => <div key={item.id} onClick={()=>clickChange(item.id)}
                    className={classnames("tab_layout_tab",{
                      "tab_layout_active":item.id === currentIndex
                    })}
                  >{item.value}</div>)}
                </div>
              </section>
            </div>
            {/* <Card/> */}
            {/* 
              感兴趣
              已投递
              沟通过
              我看过
              currentIndex
            */}
            {
              switchTab()
            }
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