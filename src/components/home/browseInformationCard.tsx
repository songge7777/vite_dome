import * as React from "react";
import "@/styles/pages/browseInformationCard.scss";
import call from "@/img/call.png";
import axios from "@/api/axios";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { Modal  } from "antd";
import { useNavigate } from "react-router-dom";
const BrowseInformationCard = () => {
  const { loginInfo } = useSelector((store: any) => store.login);
  const [currentIndex,setCurrentIndex] = React.useState(1);
  const [trenchingData,setTrenchingData] = React.useState([]);
  const [tab6List,setTab6List] = React.useState([]);
  const navigate = useNavigate();
  const callFn = async(item) => {
    if(!loginInfo.userId){
      navigate("/login");
      return;
    }
    const {data:rs} = await axios.put("/cpe/post/interact",{
      recruitPostId: item.recruitPostId
    });
    Modal.success({
      title: "联系方式:",
      width: "300px",
      okText: "我知道了",
      content: 
        <div>
          <p>{rs.data}</p>
        </div>
    });
  };
  // 我看过的-列表
  const getTab5List = async () => {
    const data = {
      pageNum:1,
      pageSize:3,
      query:{}
    };
    const {data:rs} = await axios.post("/cpe/post/all/browse",data);
    // console.log("我看过的rs=>>", rs);
    if(Number(rs.code) === 200){
      setTrenchingData(rs.data.rows);
      // console.log("我看过的rs=>>", rs.data);
    }
  }; 
  // 看过我的-列表
  const getTab6List = async () => {
    const data = {
      pageNum:1,
      pageSize:3,
      query:{}
    };
    const {data:rs} = await axios.post("/cpe/post/all/me",data);
    console.log("看过我的rs=>>", rs.data);
    setTab6List(rs.data.rows);
  };
  const clickFn = (n)=>{
    if(n===1){
      setCurrentIndex(1);
      getTab5List();
    }else{
      setCurrentIndex(2);
      getTab6List();

    }
  };
  const goToPage = (item) => {
    const { recruitPostId } = item;
    navigate("/viewPosition",{state:recruitPostId});
  };
  React.useEffect(()=>{
    getTab5List();
  },[]);
  return (
    <section className="browseInformation_layout">
      {/* tab */}
      <div className="browseInformation_tab">
        <span className={classNames("browseInformation_tab_left",{"browseInformation_tab_active":currentIndex===1})}  onClick={()=>clickFn(1)}>我看过</span>
        <span className={classNames("browseInformation_tab_right",{"browseInformation_tab_active":currentIndex===2})} onClick={()=>clickFn(2)}>对我感兴趣</span>
      </div>
      {/* list */}
      { Number(currentIndex) === 1 && trenchingData && trenchingData.map((item,index) => <div key={index} className="browseInformation_list"
        onClick={()=>goToPage(item)}
      >
        <section className="browseInformation_list_item">
          <div className="browseInformation_list_item_top">
            <span className="browseInformation_list_item_top_position">{item.postName}</span>
            <span className="browseInformation_list_item_top_money">{Number(item.salaryMin) /10000}万-{Number(item.salaryMax) / 10000}万·{item.salaryNum}薪</span>
          </div>
          <div className="browseInformation_list_item_bottom">
            <span className="browseInformation_list_item_bottom_company">{item.companyName}</span>
            <img className="browseInformation_list_item_bottom_img" src={call} alt="" />
            <span className="browseInformation_list_item_bottom_address">{item.workAddrCityName}-{item.workAddrCountyName}</span>
          </div>
        </section>
      </div>)}
      {
        Number(currentIndex) === 2 && tab6List && tab6List.map((item,index) => <div className="browseInformation_listMe" key={index}>
          <div className="browseInformation_listMe_left">
            <img src={item.hrPicture} alt="" />
            <span>{item.hrName}</span>
          </div>
          <div className="browseInformation_listMe_right" onClick={()=>callFn(item)}>
            <img src={call}  alt="" />
            <span>立即沟通</span>
          </div>
        </div>)
      }
    </section>
  );
};
export default BrowseInformationCard;