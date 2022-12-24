import * as React from "react";
import { connect } from "react-redux";
import { CombinedState, CounterState } from "../store/reducers";
import * as actions from "@/store/actions/counter";
import "@/styles/pages/loginListTab.scss";
import Header from "@/components/home/Header";
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
type Props = StateProps & DispatchProps 
import axios from "@/api/axios";
import { Tabs,Checkbox,Input, Switch, Button } from "antd";


const MessagePostChildren:React.FC = () => {

  const onChange = () => {
  };
  return <div className="messagePostChildren">
    <Checkbox className="messagePostChildren_checkbox" onChange={onChange}></Checkbox>
    <div className="messagePostChildren_list">
      <div className="messagePostChildren_list_title">允许新消息通知</div>
      <div className="messagePostChildren_list_tip">在浏览网页过程中，右上角可以收到新消息提醒</div>
    </div>
  </div>;
}; 


const MessagePost:React.FC = () => {
  const onChange = () => {};
  return <div>
    <Tabs
      defaultActiveKey="1"
      onChange={onChange}
      items={[
        {
          label: "消息通知",
          key: "1",
          children: <MessagePostChildren />
        }
      ]}
    />
  </div>;
};
const PrivacyProtection:React.FC = () => {
  const [getList,setGetListData] = React.useState([
    {
      name:"武汉xx科技技术有限公司",
      id:1,
      isShow: false,
    },{
      name:"武汉xx科技技术有限公司",
      id:2,
      isShow: false,
    },{
      name:"武汉xx科技技术有限公司",
      id:3,
      isShow: false,
    },{
      name:"武汉xx科技技术有限公司",
      id:4,
      isShow: false,
    },{
      name:"武汉xx科技技术有限公司",
      id:5,
      isShow: false,
    }
  ]);
  const { Search } = Input;
  return <div className="privacyProtection">
    <section className="privacyProtection_title line">
      <div className="privacyProtection_title_name">账号管理1</div>
      <div className="privacyProtection_title_tip">在此可查看以及了解您账号的一些绑定设置信息</div>
    </section>
    <section className="privacyProtection_search">
      <div className="privacyProtection_search_input">
        <Search   placeholder="搜索公司全称、简称、邮箱后缀"  />
      </div>
      <div>
        <Button>全部清空</Button>
      </div>
    </section>
    <section className="privacyProtection_btn">
      <span className="privacyProtection_btn_name">简历自动屏蔽 3 家公司</span>
      <span className="privacyProtection_btn_item">批量管理</span>
    </section>
    <section className="privacyProtection_list">
      {getList.map((item,index)=>{
        return (
          <div key={index}  className="privacyProtection_list_item">
            <span className="privacyProtection_list_name">{item.name}--</span>
            <span className="privacyProtection_list_clean">解除屏蔽1</span>
          </div>
        );
      })}
    </section>
    <section className="privacyProtection_title line">
      <div className="privacyProtection_title_name">简历隐藏设置</div>
      <div className="privacyProtection_title_tip">在此可查看以及了解您账号的一些绑定设置信息</div>
    </section>
    <section className="privacyProtection_switch">
      <div className="privacyProtection_switch_layout">
        <Switch defaultChecked onChange={()=>{}} />
        <span className="privacyProtection_switch_layout_name">隐藏简历</span>
      </div>
      <div className="privacyProtection_switch_layout">
        <Switch defaultChecked onChange={()=>{}} />
        <span className="privacyProtection_switch_layout_name">隐藏简历</span>
      </div>

    </section>
  </div>;
};

const AccountSecurityCenter:React.FC = ()=>{
  return <div className="accountSecurityCenter">
    <section className="accountSecurityCenter_title line">
      <div className="accountSecurityCenter_title_name">账号管理</div>
      <div className="accountSecurityCenter_title_tip">在此可查看以及了解您账号的一些绑定设置信息</div>
    </section>
    <section className="accountSecurityCenter_title">
      <div className="accountSecurityCenter_title_name">手机修改</div>
      <div className="accountSecurityCenter_title_tip">修改手机号，每个月可以修改一次手机号，修改时需原手机和新手机验证码确认。</div>
      <div className="accountSecurityCenter_title_btn">
        <Input type="text" />
        <button>修改</button>
      </div>
    </section>
    <section className="accountSecurityCenter_title">
      <div className="accountSecurityCenter_title_name">邮箱绑定</div>
      <div className="accountSecurityCenter_title_tip">修改绑定邮箱，修改时需原邮箱的验证码确认。</div>
      <div className="accountSecurityCenter_title_btn">
        <Input type="text" />
        <button>修改</button>
      </div>
    </section>
    <section className="accountSecurityCenter_title">
      <div className="accountSecurityCenter_title_name">微信绑定</div>
      <div className="accountSecurityCenter_title_tip">修改绑定微信，每个月可以修改一次绑定微信，修改时需手机验证码确认。</div>
      <div className="accountSecurityCenter_title_btn">
        <Input type="text" />
        <button>修改</button>
      </div>
    </section>
  </div>;
};

const Counter:React.FC = () =>{
  const [getListData,setGetListData] = React.useState([]);
  const onChange = (key: string) => {
    console.log(key);
  };
  const initData = async(searchData:any) => {
    const data = {
      query:{
        workAddrCityCode:searchData.workAddrCityCode,
        search:searchData.inputValue,
        education:searchData.education,
        salaryMin:searchData.salaryMin,
        salaryMax:searchData.salaryMax,
        workExperience:searchData.workExperience,
        postCategory:searchData.postCategory,
        industryCategory:searchData.industryCategory,
        companyScale:searchData.companyScale,
      },
      pageNum:1,
      pageSize:10
    };
    const {data:rs} = await axios.post("/cpe/post/search",data);
    console.log("==>",rs.data.rows);
    setGetListData(rs.data.rows);
  };
  React.useEffect(()=>{
    initData({});
  },[]);
  return (
    <div className="search_layout">
      <Header />
      <div className="search_options">
        <div className="search_options_layout">
          <Tabs
            defaultActiveKey="2"
            onChange={onChange}
            items={[
              {
                label: "账户安全中心",
                key: "1",
                children: <AccountSecurityCenter />
              },
              {
                label: "隐私保护",
                key: "2",
                children:<PrivacyProtection />,
              },
              {
                label: "消息通知",
                key: "3",
                children: <MessagePost />,
              },
            ]}
          />
        </div>
      </div> 
    </div>
  );
};

const mapStateToProps = function (state: CombinedState): CounterState {
  return state.counter;
};

export default connect(mapStateToProps, actions)(Counter);