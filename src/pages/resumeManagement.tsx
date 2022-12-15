import * as React from "react";
import { connect } from "react-redux";
import { CombinedState, CounterState } from "../store/reducers";
import * as actions from "@/store/actions/counter";
import Header from "@/components/home/Header";
import Login from "@/components/home/login";
import PersonalInfoCard from "@/components/home/personalInfoCard";
import ResumeManagementCard from "@/components/home/resumeManagementCard";
import BrowseInformationCard from "@/components/home/BrowseInformationCard";
import "@/styles/pages/resumeManagement.scss";
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
type Props = StateProps & DispatchProps 

const ResumeManagement = () => {
  const [currentIndex,setCurrentIndex] = React.useState(0);
  const clickChange = (i:number) => {
    setCurrentIndex(i);
  };
  return (
    <div className="resumeM_layout1">
      <Header />
      <div className="resumeM_lists">
        <div className="resumeM_lists_content">
          <div className="resumeM_lists_content_left">
            {/* 锚点 */}
            <div className="resumeM_lists_content_left_anchor">1</div>
            <div className="resumeM_lists_content_left_resume">2</div>
          </div>
          <div className="resumeM_lists_content_right">
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

export default connect(mapStateToProps, actions)(ResumeManagement);