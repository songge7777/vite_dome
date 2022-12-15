import * as React from "react";
import { connect } from "react-redux";
import { CombinedState, CounterState } from "../store/reducers";
import * as actions from "@/store/actions/counter";
import "@/styles/pages/search.scss";
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

class Personal extends React.Component<Props>{
  render() {
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
              <Card/>
              <Card/>
              <Card/>
              <Card/>
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
  }
}

const mapStateToProps = function (state: CombinedState): CounterState {
  return state.counter;
};

export default connect(mapStateToProps, actions)(Personal);