import * as React from "react";
import { connect } from "react-redux";
import { CombinedState, CounterState } from "../store/reducers";
import * as actions from "@/store/actions/counter";
import "@/styles/pages/messagenotification.scss";
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
import { Tabs,Checkbox,Input, Switch, Button } from "antd";


const MessagePostChildren:React.FC = () => {
  const [info,SetInfo] = React.useState([
    {
      name:"允许新消息通知",
      id:1
    },
    {
      name:"允许新消息通知",
      id:2
    },
    {
      name:"允许新消息通知",
      id:3
    },
    {
      name:"允许新消息通知",
      id:4
    },
  ]);
  const onChange = () => {
  };
  return <div className="messagePost">
    <div className="messagePost_list">
      { info.map((item,index)=><div key={index} className="messagePost_list_title">{item.name}</div>)}  
    
    </div>
  </div>;
}; 


const MessagePost:React.FC = () => {
  const onChange = () => {};
  return <div>
    <Tabs
      defaultActiveKey="1"
      onChange={onChange}
      items={[
        {
          label: "全部",
          key: "1",
          children: <MessagePostChildren />
        },
        {
          label: "已读",
          key: "2",
          children: <MessagePostChildren />
        },
        {
          label: "未读",
          key: "3",
          children: <MessagePostChildren />
        },
        
      ]}
    />
  </div>;
};

const Counter:React.FC = () =>{
  const [getListData,setGetListData] = React.useState([]);
  const onChange = (key: string) => {
    console.log(key);
  };
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
          <Tabs
            defaultActiveKey="2"
            onChange={onChange}
            items={[
              {
                label: "消息通知",
                key: "1",
                children: <MessagePost />
              },
            ]}
          />
        </div>
      </div> 
    </div>
  );
};

const mapStateToProps = function (state: CombinedState): CounterState {
  return state.counter;
};

export default connect(mapStateToProps, actions)(Counter);