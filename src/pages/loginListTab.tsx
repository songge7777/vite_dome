import * as React from "react";
import "@/styles/pages/loginListTab.scss";
import Header from "@/components/home/header";
import axios from "@/api/axios";
import { Tabs,Checkbox,Input, Switch, Button, Modal,Form,message } from "antd";

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
      <div className="privacyProtection_title_name">账号管理</div>
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

let timer = 0;
const AccountSecurityCenter:React.FC = ()=>{
  const [dataItem, setDataItem] = React.useState({});
  const [showThree,setShowThree] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formRef] = Form.useForm();
  const [time, setTime] = React.useState(0);
  const [show,setShow] = React.useState(false);
  const [validCodeReqNo, setValidCodeReqNo] = React.useState("");

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  React.useEffect(()=> {
    if( time === 60 ) {
      timer = setInterval(()=> {
        setTime(time => --time);
      }, 1000);
    }else if ( time === 0 ) {
      setShow(false);
      clearInterval(timer);
    }
  }, [time]);

  const getAccountInfo = async()=>{
    const {data} = await axios.get("/sys/account/setting/info");
    setDataItem(data.data);
  };
  const getCode = async() => {
    const {phone} =await formRef.validateFields(["phone"]);
    if(!phone) return; 
    const data = {
      phone,
      smsType:"loginSms"
    };
    const {data:getCodeRs} =  await axios.post("/auth/verify/code",data);
    if(getCodeRs.code === 200){
      setValidCodeReqNo(getCodeRs.data);
      message.success("成功获取验证码");
      setTime(60);
      setShow(true);
    }else{
      message.error(`${getCodeRs.message}`);
    }
  };
  React.useEffect(()=>{
    getAccountInfo();
  },[]);
  const onFinish =async (values: any) => {
    const {validCode,phone} = values;
    const param = {
      newPhone:phone,
      code:validCode,
      validCodeReqNo
    };
    const {data:rsData} = await axios.post("/sys/account/change_phone",param);
    if(rsData.code === 200){
      message.success("修改成功");
      setIsModalOpen(false);
      getAccountInfo();
    }else{
      message.error(`${rsData.message}`);
    }
  };

  return <div className="accountSecurityCenter">
    <section className="accountSecurityCenter_title line">
      <div className="accountSecurityCenter_title_name">账号管理</div>
      <div className="accountSecurityCenter_title_tip">在此可查看以及了解您账号的一些绑定设置信息</div>
    </section>
    <section className="accountSecurityCenter_title">
      <div className="accountSecurityCenter_title_name">手机修改</div>
      <div className="accountSecurityCenter_title_tip">修改手机号，每个月可以修改一次手机号，修改时需原手机和新手机验证码确认。</div>
      <div className="accountSecurityCenter_title_btn">
        { <div><span>{dataItem.phone}</span> <button onClick={()=>{
          setIsModalOpen(true);
        }}>修改</button></div>}

        {/* :<div  className="accountSecurityCenter_title_btn"><Input type="text" value={dataItem.phone} onInput={(e)=>{
          setDataItem({
            ...dataItem,
            phone:e.target.value
          });
        }} />
        <button onClick={async()=>{
          //
          setShowOne(true);
          //  axios.post("/sys/account/change_phone");
        }}>提交</button>
        </div> */}
        
      </div>
    </section>
    {/* <section className="accountSecurityCenter_title">
      <div className="accountSecurityCenter_title_name">邮箱绑定</div>
      <div className="accountSecurityCenter_title_tip">修改绑定邮箱，修改时需原邮箱的验证码确认。</div>
      <div className="accountSecurityCenter_title_btn">
        { showTwo?<div><span>{dataItem.email}</span> <button onClick={()=>{
          setShowTwo(false);
        }}>修改</button></div>:<div className="accountSecurityCenter_title_btn"><Input type="text" value={dataItem.email} />
          <button onClick={()=>{
            setShowTwo(true);
          }}>提交</button>
        </div>}
      </div>
    </section> */}
    <section className="accountSecurityCenter_title">
      <div className="accountSecurityCenter_title_name">微信绑定</div>
      <div className="accountSecurityCenter_title_tip">修改绑定微信，每个月可以修改一次绑定微信，修改时需手机验证码确认。</div>
      <div className="accountSecurityCenter_title_btn">
        { showThree?<div><span>{dataItem.wxAccount}</span> <button onClick={()=>{
          setShowThree(false);
        }}>修改</button></div>:<div className="accountSecurityCenter_title_btn"><Input type="text" value={dataItem.wxAccount}/>
          <button onClick={()=>{
            setShowThree(true);
          }}>提交</button>
        </div>}
      </div>
    </section>
    <Modal
      className="hiddenBtn"
      title="修改手机号码"
      width={300}
      open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form
        form={formRef}
        name="basic"
        initialValues={{phone:"",validCode:"", remember: false }}
        onFinish={onFinish}
        autoComplete="off"
      >
        {/* form */}
        <Form.Item
          className="loginCard_layout_div_from"
          name="phone"
          rules={[{ required: true, message: "请输入手机号码" }]}
        >
          <Input addonBefore="+86" placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item
          className="loginCard_layout_div_from"
          name="validCode"
          rules={[{ required: true, message: "请输入验证码" }]}
        >
          <Input placeholder="请输入验证码" addonAfter={
            show ? <div>{time}s</div>:<div className="clickCode" onClick={()=>getCode()}>获取验证码</div>
          } />
        </Form.Item>

        <Form.Item>
          <Button style={{width:"100%"}} type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  </div>;
};

const Counter:React.FC = () =>{
  const [getListData,setGetListData] = React.useState([]);
  const onChange = (key: string) => {
   
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
      pageSize:50
    };
    const {data:rs} = await axios.post("/cpe/post/search",data);
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
              // {
              //   label: "隐私保护",
              //   key: "2",
              //   children:<PrivacyProtection />,
              // },
              // {
              //   label: "消息通知",
              //   key: "3",
              //   children: <MessagePost />,
              // },
            ]}
          />
        </div>
      </div> 
    </div>
  );
};

export default Counter;