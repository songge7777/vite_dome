import * as React from "react";
import loginVx from "@/img/login-vx.png";
import bgLogin from "@/img/bg-login.png";
import { Button, Checkbox, Form, Input,message } from "antd";
import "@/styles/pages/login.scss";
import config from "@/config";
import axios from "@/api/axios";
import { useDispatch } from "react-redux";
import { setLoginInfo } from "@/store/modules/login";
import { useLocation,useNavigate } from "react-router-dom";
let timer = 0;

const {wxConfig} = config;

type SwtichType = 0 | 1


type AgreementProps = {
  checked?: boolean,
  onChange?:(i:boolean)=>{}
}

const Agreement:React.FC = (props:AgreementProps) => {
  const { checked,onChange } = props;
  const navigate = useNavigate();
  const selfClick = () => onChange(!checked);
  const goToPage = (id:number) => {
    navigate(`/agreement?id=${id}`);
  };
  return <div className="checkbox_layout">
    <Checkbox onClick={(r)=>onChange(r)} checked={checked} />
    <div> 
      <span onClick={selfClick}> 我已阅读并同意 </span>
      <span onClick={()=>goToPage(1)} className="agreement">《服务协议》</span> 
      <span  onClick={selfClick}> 和 </span>
      <span onClick={()=>goToPage(2)} className="agreement">《隐私政策》</span>
    </div>
  </div>;
};

const Login = () =>{
  const dispatch = useDispatch();
  const [swtichType, setSwitchType] = React.useState<SwtichType>(0);
  const [validCodeReqNo, setValidCodeReqNo] = React.useState("");
  const [formRef] = Form.useForm();
  const [show,setShow] = React.useState(false);
  const routeConfig = useLocation();
  const [time, setTime] = React.useState(0);
  const navigate = useNavigate();
  /**
   * 
   * appId  wx2fd5d6ce6fe56d61 
   * redirect_uri http%3A%2F%2Fcy.test.whdt.com.cn
   * response_type=code&scope=snsapi_login
   * 
   */
  const onFinish =async (values: any) => {
    const {validCode,phone} = values;
    const param = {
      phone,
      validCode,
      validCodeReqNo,
      device:"pc"
    };
    const {data:rsData} = await axios.post("/auth/client/login",param);
    if(rsData.code === 200){
      const { data:{accessToken} } = rsData;
      sessionStorage.setItem("accessToken",accessToken);
      message.success("登录成功");
      const data = await isGoToGuide();
      ;
      getUserInfo();
      if(data.data){
        navigate("/jobWanted");
      }else {
        navigate("/index");
      }
    }else{
      message.error(`${rsData.message}`);
    }
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

  // 是否进入个人引导页
  const isGoToGuide = async() => {
    const {data} = await axios.get("/cpe/resume/enter");
    return data;
  };

  const getUserInfo = async () => {
    const {data} = await axios.get("/auth/client/info");
    ;
    const loginInfo = data.data ? data.data : {};
    dispatch(setLoginInfo({loginInfo}));
  };

  const init = async ()=>{
    const { search } = routeConfig;
    const code = search.slice(1,).split("=")[1];
    if(code){
      // 跳转登录
      const {data:rsData} =   await axios.get(`/auth/client?code=${code}`);
      if(rsData.code === 200){
        const { accessToken } = rsData;
        sessionStorage.setItem("accessToken",accessToken);
        // 获取用户信息
        getUserInfo();
        message.success("登录成功");
        navigate("/search");
      }else{
        message.error(`${rsData.message}`);
      }
    }
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
  const validator = (rule, value, callback) =>{
    if(Boolean(value) === true){
      callback();
    }else{
      callback("请勾选协议");
    }
  };
  React.useEffect(()=>{
    init();
  },[]);
  return (
    <div className="login_layout">
      <img className="login_layout_img" src={bgLogin} alt="" />
      <section className="login_layout_div">
        {/* 切换 */}
        <div className="login_layout_div_switch" onClick={()=>setSwitchType((swtichType^1) as SwtichType)}>
          <span>{swtichType === 0 ? "微信登录>" : "手机登录>"}</span>
          <img src={loginVx} alt="" />
        </div>
        { swtichType === 0 ? 
          <React.Fragment>
            <div className="login_layout_div_title">手机号登录</div>
            <Form
              className="login_layout_div_from"
              form={formRef}
              name="basic"
              wrapperCol={{ span: 24 }}
              initialValues={{phone:"",validCode:"", remember: undefined }}
              onFinish={onFinish}
              autoComplete="off"
            >
              {/* form */}
              <Form.Item
                className="login_layout_div_from"
                name="phone"
                rules={[{ required: true, message: "请输入手机号码" }]}
              >
                <Input addonBefore="+86" placeholder="请输入手机号" />
              </Form.Item>
              <Form.Item
                className="login_layout_div_from"
                name="validCode"
                rules={[{ required: true, message: "请输入验证码" }]}
              >
                <Input placeholder="请输入验证码" addonAfter={
                  show ? <div>{time}s</div>:<div className="clickCode" onClick={()=>getCode()}>获取验证码</div>
                } />
              </Form.Item>
              <Form.Item>
                <Button style={{width:"100%"}} type="primary" htmlType="submit">
                 登录
                </Button>
              </Form.Item>
              <Form.Item
                className="login_layout_div_from"
                name="remember"
                rules={[{ validator:validator}]}
                valuePropName="checked"> 
                <Agreement />
              </Form.Item>
            </Form>
          </React.Fragment>
          :
          <section className="login_layout_register">
            <iframe scrolling="no" width="300" height="400" frameBorder="0"
              src={`https://open.weixin.qq.com/connect/qrconnect?appid=${wxConfig.appid}&scope=${wxConfig.scope}&redirect_uri=${wxConfig.redirect_uri}&state=${wxConfig.state}&login_type=jssdk&self_redirect=default&style=${wxConfig.theme}&href=${wxConfig.href}`}
            ></iframe>
          </section>
        }
      </section>
    </div>
  );                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
};

export default Login;