import * as React from "react";
import { connect } from "react-redux";
import { CombinedState, CounterState } from "../store/reducers";
import * as actions from "@/store/actions/counter";
import "@/styles/pages/index.scss";
import banner from "@/img/banner.png";
import Card from "@/components/home/card";
import Header from "@/components/home/Header";
import InputSearch from "@/components/home/inputSearch";
import axios from "@/api/axios";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
type Props = StateProps & DispatchProps 
const Counter = () =>{
  const [listData,setListData] = React.useState([]);
  const getList = async() => {
    // 获取首页列表数据
    const {data} = await axios.post("/cpe/resume/choice",{
      pageNum:1,
      pageSize:10,
      param:{}
    });
    setListData(data.data);
    console.log("data",data);
  };
  const searchList = async(data)=> {
    const {code:workAddrCityCode,value:search} = data;
    const rs = await axios.post("/cpe/resume/search",{
      pageNum:1,
      pageSize:10,
      param:{
        search,
        workAddrCityCode
      }
    });
    console.log("data",rs);
  };
  React.useEffect(()=>{
    getList();
  },[]);
  return (
    <div className="home_layout">
      <Header />
      <div className="home_banner">
        <div className="home_banner_layout">
          <div className="home_banner_layout_search">
            <InputSearch cb={searchList}/>
          </div>
          <div  className="home_banner_layout_form">form</div>
        </div>
      </div>
      <div className="home_content">
        <div className="home_content_layout">
          <span className="home_content_layout_title">精选岗位</span>
          <div className="home_content_layout_lists">
            {listData.map((item,index) => <Card key={index} data={item} />)}
            {/* 下面两个 布局中的 不要动 */}
            <section className="home_content_layout_lists_div empty"></section>
            <section className="home_content_layout_lists_div empty"></section>
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