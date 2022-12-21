import * as React from "react";
import { connect } from "react-redux";
import { CombinedState, CounterState } from "../store/reducers";
import * as actions from "@/store/actions/counter";
import Header from "@/components/home/Header";
import Axios from "axios";
import goback from "@/img/goback.png";
import classnames from "classnames";
import "@/styles/pages/viewEnterprise.scss";
import axios from "@/api/axios";
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
type Props = StateProps & DispatchProps 

const ViewEnterprise = () => {

  const getInit = () => {
  };
 
  React.useEffect(()=>{
    getInit();
  },[]);
  return (
    <div className="enterprise_layout">
      <Header />
      <div className="enterprise_lists">
        <div className="enterprise_lists_content">
          <div className="enterprise_lists_content_left">
            <section className="enterprise_lists_content_left_title">
              <img className="enterprise_lists_content_left_title_img" src={goback} alt="" />
              <div className="enterprise_lists_content_left_title_right">
                <div className="enterprise_lists_content_left_title_right_name">东风汽车</div>
                <div className="enterprise_lists_content_left_title_right_tips">
                  <span>国企</span>
                  <span>1000人以上</span>
                  <span>汽车</span>
                </div>
              </div>
            </section>
            {/* list */}
            <div className="enterprise_lists_content_left_content">
              <div className="enterprise_lists_content_left_content_top">企业介绍</div>
              
              <div className="enterprise_lists_content_left_content_title">企业简介</div>
              <div className="enterprise_lists_content_left_content_tip">东风汽车集团股份有限公司(以下称“东风汽车集团”)于二零零五年十二月七日在香港联交所上市。东风汽车集团经营业务以整车制造为中心，涵盖汽车研发、零部件及装备生产制造、汽车金融、汽车销售、出行业务等与汽车相关的其他完整业务体系，是我国产业链最为完整的汽车集团之一。</div>
              
              <div className="enterprise_lists_content_left_content_title">工商信息</div>
              <section className="enterprise_lists_content_left_content_row">
                <span className="enterprise_lists_content_left_content_row_title">企业名称</span>
                <span className="enterprise_lists_content_left_content_row_value">东风汽车</span>
              </section>
              <section className="enterprise_lists_content_left_content_row">
                <span className="enterprise_lists_content_left_content_row_title">企业代码（统一社会信用代码）</span>
                <span className="enterprise_lists_content_left_content_row_value">914200001000115161</span>
              </section>
              <section className="enterprise_lists_content_left_content_row">
                <span className="enterprise_lists_content_left_content_row_title">企业类型</span>
                <span className="enterprise_lists_content_left_content_row_value">中央企业</span>
              </section>
              <section className="enterprise_lists_content_left_content_row">
                <span className="enterprise_lists_content_left_content_row_title">注册资本</span>
                <span className="enterprise_lists_content_left_content_row_value">1,560,000万(元)</span>
              </section>
              <section className="enterprise_lists_content_left_content_row">
                <span className="enterprise_lists_content_left_content_row_title">成立日期</span>
                <span className="enterprise_lists_content_left_content_row_value">1991年06月25日</span>
              </section>
              <section className="enterprise_lists_content_left_content_row">
                <span className="enterprise_lists_content_left_content_row_title">住所</span>
                <span className="enterprise_lists_content_left_content_row_value">湖北省武汉市武汉经济技术开发区东风大道特1号</span>
              </section>
              <section className="enterprise_lists_content_left_content_row">
                <span className="enterprise_lists_content_left_content_row_title">公司规模</span>
                <span className="enterprise_lists_content_left_content_row_value">10000人以上</span>
              </section>
              <section className="enterprise_lists_content_left_content_row">
                <span className="enterprise_lists_content_left_content_row_title">营业范围</span>
              </section>
              <div>
              开发、设计、制造、销售汽车及汽车零部件（包括新能源汽车及其电池、电机、整车控制技术）、电子电器、金属机械、铸金锻件、粉末冶金、设备、工具和模具；进出口业务；组织管理本公司直属企业的生产经营活动；对电力、燃气、汽车……
              </div>
              <div className="enterprise_lists_content_left_content_title">公司地址</div>

            </div>
          </div>
          <div className="enterprise_lists_content_right">
            <div className="enterprise_lists_content_right_title">
              <span className="enterprise_lists_content_right_title_name">在招岗位</span>
              <span className="enterprise_lists_content_right_title_more">更多</span>
            </div>
            <div className="enterprise_lists_content_right_lists">
              <div className="enterprise_lists_content_right_lists_top">软件项目经理</div>
              <div className="enterprise_lists_content_right_lists_btns">
                <span>武汉</span>
                <span>3年</span>
                <span>硕士</span>
              </div>
              <div className="enterprise_lists_content_right_lists_bottom">
                <span className="enterprise_lists_content_right_lists_bottom_money">1.5万-2.5万*13薪</span>
                <span className="enterprise_lists_content_right_lists_bottom_address">武汉-洪山区</span>
              </div>
            </div>
            <div className="enterprise_lists_content_right_lists">
              <div className="enterprise_lists_content_right_lists_top">软件项目经理</div>
              <div className="enterprise_lists_content_right_lists_btns">
                <span>武汉</span>
                <span>3年</span>
                <span>硕士</span>
              </div>
              <div className="enterprise_lists_content_right_lists_bottom">
                <span className="enterprise_lists_content_right_lists_bottom_money">1.5万-2.5万*13薪</span>
                <span className="enterprise_lists_content_right_lists_bottom_address">武汉-洪山区</span>
              </div>
            </div>
          </div>
        </div> 
      </div> 
    </div>
  );
};

const mapStateToProps = function (state: CombinedState): CounterState {
  return state.counter;
};

export default connect(mapStateToProps, actions)(ViewEnterprise);