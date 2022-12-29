import * as React from "react";
import { connect } from "react-redux";
import { CombinedState, CounterState } from "../store/reducers";
import * as actions from "@/store/actions/counter";
import "@/styles/pages/messagenotification.scss";
import Card from "@/components/search/card";
import SearchHeader from "@/components/home/searchHeader";
import Header from "@/components/home/header";
import Login from "@/components/home/loginCard";
import ResumeManagementCard from "@/components/home/resumeManagementCard";
import BrowseInformationCard from "@/components/home/BrowseInformationCard";
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
type Props = StateProps & DispatchProps 
import axios from "@/api/axios";
import { Tabs,Checkbox,Input, Switch, Button } from "antd";
import { useNavigate ,useLocation } from "react-router-dom";

type MessageProps = {
  dataItem:[],
  index: string
}
const MessagePostChildren:React.FC = (props:MessageProps) => {
  const {dataItem,index} = props;
  console.log("dataItem",dataItem,index);
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
  const clickMessage = async(item) => {
    const rs = await axios(`/msg/msg/read?id=${item.msgId}`);
    console.log(item);
  };
  const arrFilter = () => {
    return dataItem.filter(item => {
      if(!index) return true;
      return Number(item.status) === Number(index);
    });
  };
  return <div className="messagePost">
    <div className="messagePost_list">
      { dataItem && arrFilter(dataItem).map((item,index)=><div key={index}
        onClick={()=>clickMessage(item)}
        className="messagePost_list_title">
        【{item.title}】{item.content}
      </div>)}  
    
    </div>
  </div>;
}; 


const MessagePost:React.FC = () => {
  const [userId,setUserId] = React.useState("");
  const routeConfig = useLocation();
  const [dataItem,setDataItem] = React.useState([]);
  const [index,setIndex] = React.useState("");
  const getMessage = async(_userId)=>{
    const {data} = await axios.get(`/msg/msg/all/${userId}`);
    // const data = [{
    //   msgId:"1",
    //   userId:"1",
    //   title:"标题",
    //   content:"内容内容内容内容内容 未读",
    //   jumpUrl:"http://www.baidu.com",
    //   // 是否已读 0 未读 1 已读
    //   status:"0",
    //   sentTime:"2020-1-1"
    // },{
    //   msgId:"2",
    //   userId:"2",
    //   title:"标题1",
    //   content:"内容内容内容内容内容1 已读",
    //   jumpUrl:"http://www.baidu.com",
    //   // 是否已读 0 未读 1 已读
    //   status:"1",
    //   sentTime:"2020-1-1"
    // }];
    if(data.code === 200){
      setDataItem(data);
    }
  };
  const onChange = (num) => {
    switch(num){
      case "1":
        setIndex(undefined);
        break;
      case "2":
        setIndex("1");
        break;
      case "3":
        setIndex("0");
        break;
    }
  };

  const initData = async(searchData:any) => {
    const {search} = routeConfig;
    const _userId = search.slice(1,).split("=")[1];
    getMessage(_userId);
    setUserId(_userId);
  };
  React.useEffect(()=>{
    initData({});
  },[]);
  return <div>
    <Tabs
      defaultActiveKey="1"
      onChange={onChange}
      items={[
        {
          label: "全部",
          key: "1",
          children: <MessagePostChildren dataItem={dataItem} index={index}/>
        },
        {
          label: "已读",
          key: "2",
          children: <MessagePostChildren dataItem={dataItem} index={index} />
        },
        {
          label: "未读",
          key: "3",
          children: <MessagePostChildren dataItem={dataItem} index={index} />
        },
        
      ]}
    />
  </div>;
};

const Counter:React.FC = () =>{

  const onChange = (key: string) => {
    console.log(key);
  };
  
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
                children: <MessagePost  />
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