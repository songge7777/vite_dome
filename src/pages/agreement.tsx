import * as React from "react";
import { connect } from "react-redux";
import { CombinedState, CounterState } from "../store/reducers";
import * as actions from "@/store/actions/counter";
import Header from "@/components/home/header";
import classnames from "classnames";
import "@/styles/pages/agreement.scss";
import { useLocation } from "react-router-dom";

import axios from "@/api/axios";
import { Button } from "antd";
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
type Props = StateProps & DispatchProps 

const Agreement = () => {
  const routeConfig = useLocation();
  const getInit = ()=>{
    console.log(routeConfig);
  };
  React.useEffect(()=>{
    getInit();
  },[]);
  return (
    <div className="viewPosition_layout">
      <Header />
      <div className="viewPosition_lists">
        <div className="viewPosition_lists_content">
          <div className="viewPosition_lists_content_left">
            协议
          </div>
          <div className="viewPosition_lists_content_right">
            {/* 33 */}
          </div>
        </div> 
      </div> 
    </div>
  );
};

const mapStateToProps = function (state: CombinedState): CounterState {
  return state.counter;
};

export default connect(mapStateToProps, actions)(Agreement);