import * as React from "react";
import Header from "@/components/home/header";
import "@/styles/pages/agreement.scss";
import { useLocation } from "react-router-dom";

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

export default Agreement;