import * as React from "react";
import LOGO from "@/img/LOGO.png";
import "@/styles/pages/trenchingCard.scss";
/**
 * 感兴趣
 * 已投递
 * 沟通过
 * 我看过
 * 
 */ 
class Card extends React.Component<{}>{
  render() {
    return (
      <div className="trenching_home_lists">
        <div className="trenching_content_layout_lists_left">
          <section className="trenching_content_layout_lists_div">
            <div className="trenching_content_layout_lists_div_personnel">
              <img src={LOGO}  alt="" />
              <span>王女士/HR</span>
            </div>
            <div className="trenching_content_layout_lists_div_title">
              <span className="trenching_content_layout_lists_div_title_left">软件项目经理</span>
              <span className="trenching_content_layout_lists_div_title_right">1.5万-2.5万·13薪</span>
            </div>
            <div className="trenching_content_layout_lists_div_btns">
              <span className="trenching_content_layout_lists_div_btns_item">武汉</span>
              <span className="trenching_content_layout_lists_div_btns_item">3年</span>
              <span className="trenching_content_layout_lists_div_btns_item">硕士</span>
            </div>
          </section>
        </div>
        <div className="trenching_content_layout_lists_center">
          <img src={LOGO}  alt="" />
          <div>北京飞渡科技有限公222司</div>
        </div>
        <div className="trenching_content_layout_lists_right">
          <div className="trenching_content_layout_lists_right_top">
            <span>已投递</span>
            <span>取消感兴趣</span>
            <span>岗位关闭</span>
          </div>
          <div className="trenching_content_layout_lists_right_call">
            <img src={LOGO}  alt="" />
            <span>立即沟通</span>
          </div>
        </div>
      </div>
    );
  }
}
export default Card;