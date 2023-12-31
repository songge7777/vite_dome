import * as React from "react";
import "@/styles/pages/messagenotification.scss";
import Header from "@/components/home/header";
import axios from "@/api/axios";
import { Tabs } from "antd";
import { useLocation } from "react-router-dom";

type MessageProps = {
  dataItem:[],
  index: string
}
const MessagePostChildren:React.FC = (props:MessageProps) => {
  const {dataItem,index} = props;
 
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
    const rs = await axios(`/res/msg/read?id=${item.msgId}`);
   
  };
  const arrFilter = () => {
    if(!Array.isArray(dataItem)) return [];
    const arr = dataItem.filter(item => {
      if(!index) return true;
      return Number(item.status) === Number(index);
    });
   
    return arr;
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
    const {data} = await axios.get(`/res/msg/a
      ll/${userId}`);
    if(data.code === 200){
      setDataItem(data.data);
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
export default Counter;