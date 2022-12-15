import * as React from "react";
import "@/styles/pages/browseInformationCard.scss";
import call from "@/img/call.png";
const BrowseInformationCard = () => {
  return (
    <section className="browseInformation_layout">
      {/* tab */}
      <div className="browseInformation_tab">
        <span className="browseInformation_tab_left browseInformation_tab_active">我看过</span>
        <span className="browseInformation_tab_right">看过我</span>
      </div>
      {/* list */}
      <div className="browseInformation_list">
        <section className="browseInformation_list_item">
          <div className="browseInformation_list_item_top">
            <span className="browseInformation_list_item_top_position">软件项目项目经项目经</span>
            <span className="browseInformation_list_item_top_money">1.5万-2.5万·13薪</span>
          </div>
          <div className="browseInformation_list_item_bottom">
            <span className="browseInformation_list_item_bottom_company">爱联电子科技</span>
            <img className="browseInformation_list_item_bottom_img" src={call} alt="" />
            <span className="browseInformation_list_item_bottom_address">武汉-洪山区</span>
          </div>
        </section>
      </div>
      <div className="browseInformation_list">
        <section className="browseInformation_list_item">
          <div className="browseInformation_list_item_top">
            <span className="browseInformation_list_item_top_position">软件项目项目经项目经</span>
            <span className="browseInformation_list_item_top_money">1.5万-2.5万·13薪</span>
          </div>
          <div className="browseInformation_list_item_bottom">
            <span className="browseInformation_list_item_bottom_company">爱联电子科技</span>
            <img className="browseInformation_list_item_bottom_img" src={call} alt="" />
            <span className="browseInformation_list_item_bottom_address">武汉-洪山区</span>
          </div>
        </section>
      </div>
      <div className="browseInformation_list">
        <section className="browseInformation_list_item">
          <div className="browseInformation_list_item_top">
            <span className="browseInformation_list_item_top_position">软件项目项目经项目经</span>
            <span className="browseInformation_list_item_top_money">1.5万-2.5万·13薪</span>
          </div>
          <div className="browseInformation_list_item_bottom">
            <span className="browseInformation_list_item_bottom_company">爱联电子科技</span>
            <img className="browseInformation_list_item_bottom_img" src={call} alt="" />
            <span className="browseInformation_list_item_bottom_address">武汉-洪山区</span>
          </div>
        </section>
      </div>
    </section>
  );
};
export default BrowseInformationCard;