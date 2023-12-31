import * as React from "react";
import { useNavigate,useLocation } from "react-router-dom";
import "@/styles/pages/index.scss";
import Card from "@/components/home/card";
import Header from "@/components/home/header";
import InputSearch from "@/components/home/inputSearch";
import LoginCard from "@/components/home/loginCard";
import axios from "@/api/axios";
import { useSelector } from "react-redux";

const Counter = () =>{
  const { loginInfo } = useSelector((store: any) => store.login);
  const navigate = useNavigate();
  const [listData,setListData] = React.useState([]);
  const location = useLocation();
  const getList = async() => {
    // 获取首页列表数据
    const {data} = await axios.post("/cpe/post/choice",{
      pageNum:1,
      pageSize:50,
      query:{}
    });
    setListData(data.data.rows);
  };
  const searchList = async(data)=> {
    // 本地存储
    sessionStorage.setItem("searchData", JSON.stringify(data));
    navigate("/search");
  };
 
  React.useEffect(()=>{
    getList();
  },[location]);
  return (
    <div className="home_layout">
      <Header />
      <div className="home_banner">
        <div className="home_banner_layout">
          <div className="home_banner_layout_search">
            <InputSearch cb={searchList}/>
          </div>
          {!loginInfo || !loginInfo.userId && <div className="home_banner_layout_form"><LoginCard /></div>} 
        </div>
      </div>
      <div className="home_content">
        <div className="home_content_layout">
          <span className="home_content_layout_title">精选岗位</span>
          <div className="home_content_layout_lists">
            {listData && listData.map((item,index) => <Card key={index} data={item} />)}
            {/* 下面两个 布局中的 不要动 */}
            <section className="home_content_layout_lists_div empty"></section>
            <section className="home_content_layout_lists_div empty"></section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;