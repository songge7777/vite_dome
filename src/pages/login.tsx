import * as React from "react";
import { connect } from "react-redux";
import { CombinedState, CounterState } from "../store/reducers";
import * as actions from "@/store/actions/counter";
import loginPc from "@/img/login-pc.png";
import loginVx from "@/img/login-vx.png";
import bgLogin from "@/img/bg-login.png";
import { Button, Checkbox, Form, Input,message } from "antd";
import "@/styles/pages/login.scss";
import type { FormInstance } from "antd/es/form";

import axios from "@/api/axios";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
type Props = StateProps & DispatchProps
type SwtichType = 0 | 1
const Login = () =>{
  const [swtichType, setSwitchType] = React.useState<SwtichType>(1);
  const [validCodeReqNo, setValidCodeReqNo] = React.useState("");
  const [formRef] = Form.useForm();
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
      const { accessToken } = rsData;
      sessionStorage.setItem("accessToken",accessToken);
      message.success("登录成功");
    }else{
      message.error(`${rsData.error}`);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const init = async ()=>{
    const rs =  await axios.get(`
    https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2fd5d6ce6fe56d61&redirect_uri=http%3A%2F%2Fcy.test.whdt.com.cn&response_type=code&scope=snsapi_login&state=STATE&connect_redirect=1#wechat_redirect
    `
    );
    console.log("rs",rs);
  };
  const getCode = async() => {
    const {phone} =await formRef.validateFields(["phone"]);
    if(!phone) return; 
    const data = {
      phone,
      smsType:"loginSms"
    };
    const {data:getCodeRs} =  await axios.post("/auth/verify/code",data);
    console.log("getCodeRs",getCodeRs);
    if(getCodeRs.code === 200){
      setValidCodeReqNo(getCodeRs.data);
      message.success("成功获取验证码");
    }else{
      message.error(`${getCode.error}`);
    }
  };
  React.useEffect(()=>{
    init();
  },[]);
  return (
    <div className="login_layout">
      {/* <img className="login_layout_img" src={bgLogin} alt="" /> */}
      <section className="login_layout_div">
        {/* 切换 */}
        <div className="login_layout_div_switch" onClick={()=>setSwitchType((swtichType^1) as SwtichType)}>
          <span>{"微信登录>"}</span>
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
              initialValues={{phone:"",validCode:"", remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
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
                  <Button onClick={()=>getCode()}>获取验证码</Button>
                } />
              </Form.Item>
              <Form.Item
                className="login_layout_div_from"
                name="remember"
                valuePropName="checked">
                <Checkbox>我已阅读并同意 </Checkbox>
              </Form.Item>
              {/* <span >服务协议</span> 和 <span>隐私政策</span> */}
              <Form.Item>
                <Button style={{width:"100%"}} type="primary" htmlType="submit">
                 登录
                </Button>
              </Form.Item>
            </Form>
          </React.Fragment>
          :
          <section className="login_layout_register">
            <div className="login_layout_register_title">扫码登录</div>
            <div className="login_layout_register_tip">请使用微信扫描二维码</div>
            <div className={"login_container"} id="login_container"></div>
            {/* https://open.weixin.qq.com/connect/qrconnect?appid=wx2fd5d6ce6fe56d61&redirect_uri=http%3A%2F%2Fcy.test.whdt.com.cn&response_type=code&scope=snsapi_login */}
            <img  className="login_layout_register_img" src={"https://open.weixin.qq.com/connect/qrconnect/connect/qrcode/041cthFn2eqh0w3Z"} alt="" />
          </section>
        }
      </section>
    </div>
  );                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
};

const mapStateToProps = function (state: CombinedState): CounterState {
  return state.counter;
};

export default connect(mapStateToProps, actions)(Login);