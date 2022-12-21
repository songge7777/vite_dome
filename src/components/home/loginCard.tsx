import * as React from "react";
import "@/styles/pages/loginCard.scss";
import { Button, Checkbox, Form, Input,message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "@/api/axios";
let timer = 0;

const LoginCard = () => {
  const [formRef] = Form.useForm();
  const [validCodeReqNo, setValidCodeReqNo] = React.useState("");
  const [show,setShow] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const navigate = useNavigate();
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
      navigate("/search");
    }else{
      message.error(`${rsData.error}`);
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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

  const getCode = async() => {
    const {phone} =await formRef.validateFields(["phone"]);
    
    if(!phone) return; 
    const data = {
      phone,
      smsType:"loginSms"
    };
    const {data:getCodeRs} =  await axios.post("/auth/verify/code",data);
    console.log("getCodeRs",getCodeRs.data);
    if(getCodeRs.code === 200){
      setValidCodeReqNo(getCodeRs.data);
      message.success("成功获取验证码");
      // getSixtymTime();
      setTime(60);
      setShow(true);
    }else{
      message.error(`${getCodeRs.error}`);
    }
  };
  return (
    <section className="loginCard_layout">
      <div className="loginCard_layout_title">注册登录后更多岗位任您选</div>
      <Form
        className="loginCard_layout_div"
        form={formRef}
        name="basic"
        initialValues={{phone:"",validCode:"", remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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

        {/* <span >服务协议</span> 和 <span>隐私政策</span> */}
        <Form.Item>
          <Button style={{width:"100%"}} type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
        <Form.Item
          className="loginCard_layout_div_from"
          name="remember"
          valuePropName="checked">
          <Checkbox>我已阅读并同意 </Checkbox>
        </Form.Item>
      </Form>
    </section>
  );
};
export default LoginCard;