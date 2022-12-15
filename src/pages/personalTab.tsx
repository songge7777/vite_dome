import * as React from "react";
import { connect } from "react-redux";
import { CombinedState, CounterState } from "../store/reducers";
import * as actions from "@/store/actions/counter";
import Card from "@/components/search/card";
import TrenchingCard from "@/components/home/trenchingCard";
import InterviewListCard from "@/components/home/interviewListCard";
import SeeMeCard from "@/components/home/seeMeCard";
import Header from "@/components/home/Header";
import Login from "@/components/home/login";
import PersonalInfoCard from "@/components/home/personalInfoCard";
import ResumeManagementCard from "@/components/home/resumeManagementCard";
import BrowseInformationCard from "@/components/home/BrowseInformationCard";
import goback from "@/img/goback.png";
import classnames from "classnames";
import "@/styles/pages/personalTab.scss";
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
type Props = StateProps & DispatchProps 

const Personal = () => {
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
      value:"我的面试"
    },
    {
      id:4,
      value:"我的offer"
    },
    {
      id:5,
      value:"感兴趣"
    },
    {
      id:6,
      value:"我看过"
    },
    {
      id:7,
      value:"看过我"
    },
  ]);
  const [currentIndex,setCurrentIndex] = React.useState(0);
  const clickChange = (i:number) => {
    setCurrentIndex(i);
  };
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
            <TrenchingCard/>
            <SeeMeCard/>
            <InterviewListCard/>
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

export default connect(mapStateToProps, actions)(Personal);