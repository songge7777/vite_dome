import * as React from "react";
import { connect } from "react-redux";
import { CombinedState, CounterState } from "../store/reducers";
import * as actions from "@/store/actions/counter";
import "@/styles/pages/jobWanted.scss";
import Header from "@/components/home/Header";
import LOGO from "@/img/LOGO.png";
import * as dayjs from "dayjs";
import classnames from "classnames";
import {
  moneyList,
  expectedIndustryData,
  expectedCityData,
  identityStatusData,
  educationData,
  educationalData
} from "@/utils/optionList";
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
type Props = StateProps & DispatchProps 

type LayoutType = Parameters<typeof Form>[0]["layout"];


type TestProps = {
  formMust:FormInstance
  value: [string,string],
  onChange:()=>{}
}

const SalaryExpectation: React.FC = (props:TestProps) => {
  const [_, setIsShow] = useState<[]>();
  const { formMust,value,onChange  } = props;
  return <div className="formItemLine" >
    <Form.Item className="formItemTwo" initialValue={"2"}>
      <Select placeholder="请选择"
        onChange={(e)=>{
          const oldArr = formMust.getFieldValue("salaryExpectation");
          oldArr[0] = e;
          onChange(oldArr);
          setIsShow([]);
        }}
        value={value[0]}>
        {moneyList().map(item => <Select.Option key={`&0_${item.id}`} value={item.id}>{item.value}</Select.Option>)}
      </Select>
    </Form.Item>
  -
    <Form.Item  className="formItemTwo">
      <Select placeholder="请选择" 
        onChange={(e)=>{
          const oldArr = formMust.getFieldValue("salaryExpectation");
          oldArr[1] = e;
          onChange(oldArr);
          setIsShow([]);
        }}
        value={value[1]}
      >
        {moneyList().map(item => <Select.Option key={`&1_${item.id}`} value={item.id}>{item.value}</Select.Option>)}
      </Select>
    </Form.Item>
  </div>;
};

import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
} from "antd";
import { FormInstance, RuleObject } from "antd/es/form";
import { StoreValue } from "antd/es/form/interface";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const {useState} = React;
const jobWanted: React.FC = () => {
  const [formMust] = Form.useForm();
  const [_, setIsShow] = useState<[]>();
  const [formMustData,setFormMustData] = React.useState({
    // 姓名
    identityName:"1",
    // 期望职位
    expectedPosition:"2",
    // 出生日期
    dateBirth:[dayjs("2022-12-08"),dayjs("2022-12-11")],
    // 期望薪资
    salaryExpectation:["1","3"],
    // 性别
    identitySex:"",
    // 期望行业
    expectedIndustry:"",
    // 当前状态
    identityStatus: "",
    // 期望城市
    expectedCity:"",
    // 求职身份
    jobSeeking:"",
    // 参加工作时间
    joinWork:"",
    // 个人优势
    identityAdvantage:""
  });
  const [formOptional] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("vertical");

  const onFinish = async() => {
    const r1 = formMust.getFieldsValue();
    const r2 = formOptional.getFieldsValue();
  };
  const inputValidator = (rule: RuleObject, value: StoreValue, callback: (error?: string) => void):Promise<void | any> | void =>{
    if(!value) return callback();
    if(value.length < 2 || value.length >50){
      callback("2-50个字以内");
    }else{
      callback();
    }
  };
  const clickSex = (id:number) => {
    console.log(id);
  };

  return (
    <div className="jobWanted_layout">
      <Header />
      <div className="jobWanted_options">
        <div className="jobWanted_options_layout">
          <div className="jobWanted_options_layout_cartTop">
            <div className="jobWanted_options_layout_cartTop_title">个人求职信息 (必填)</div>
            <div className="jobWanted_options_layout_cartTop_tip">完善您的基本信息后，会遇到更多您感兴趣的工作岗位；在您完成了求职信息后，有 209 个岗位符合您的条件。 (必填)</div>
            <section className="jobWanted_options_layout_cartTop_content">
              <img src={LOGO} alt="" />
              <div className="jobWanted_options_layout_cartTop_content_right">
                {/* form */}
                <Form
                  layout={formLayout}
                  form={formMust}
                  initialValues={{ layout: formLayout,...formMustData }}
                  className="jobWanted_options_layout_cartTop_content_right_form"
                >
                  <Form.Item label="姓名" name="identityName" rules={[{ required: true, message:"请输入姓名"},{validator:inputValidator }]}>
                    <Input placeholder="请输入姓名" />
                  </Form.Item>
                  <Form.Item label="期望职位" name="expectedPosition" rules={[{ required: true, message:"请选择期望职位"}]}>
                    <Select placeholder="请选择职位类型">
                      <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="出生日期" name="dateBirth" rules={[{ required: true, message:"请选择出生日期"}]}>
                    <RangePicker placeholder="请选择出生日期" />
                  </Form.Item>
                  <Form.Item label="期望薪资" name="salaryExpectation" rules={[{ required: true, message:"请选择期望薪资"}]} >
                    <SalaryExpectation formMust={formMust}/>
                  </Form.Item>
                  <Form.Item label="性别" name="identitySex" rules={[{ required: true, message:"请选择性别"}]}>
                    {/* Radio */}
                    {/*  defaultValue="a"  */}
                    <div onChange={()=>{}} className="formRadio">
                      <div className={classnames("formRadio_item",
                        {
                          formRadio_active:true
                        }
                      )} onClick={()=>clickSex(0)}>男</div>
                      <span className="formRadio_empty"></span>
                      <div className="formRadio_item" onClick={()=>clickSex(1)}>女</div>
                    </div>
                  </Form.Item>
                  <Form.Item label="期望行业" name="expectedIndustry"  rules={[{ required: true, message:"请选择行业"}]}>
                    <Select placeholder="请选择行业" >
                      {expectedIndustryData().map(item => <Select.Option key={`&2_${item.id}`} value={item.id}>{item.value}</Select.Option>)}
                    </Select>
                  </Form.Item>
                  <Form.Item label="当前状态" name="identityStatus" rules={[{ required: true, message:"请选择状态"}]}>
                    <Select placeholder="请选择状态">
                      {identityStatusData().map(item => <Select.Option key={`&2_${item.id}`} value={item.id}>{item.value}</Select.Option>)}
                    </Select>
                  </Form.Item>
                  <Form.Item label="期望城市" name="expectedCity" rules={[{ required: true, message:"请选择城市" }]}>
                    <Select placeholder="请选择城市">
                      {expectedCityData().map(item => <Select.Option key={`&2_${item.id}`} value={item.id}>{item.value}</Select.Option>)}
                    </Select>
                  </Form.Item>
                  <Form.Item label="求职身份"  name='jobSeeking' rules={[{ required: true, message:"请选择职身份"  }]}>
                    {/* Radio */}
                    {/* defaultValue="a" */}
                    <div onChange={()=>{}} className="formRadio">
                      <div className="formRadio_item formRadio_active">职场精英</div>
                      <span className="formRadio_empty"></span>
                      <div className="formRadio_item">学生</div>
                    </div>
                  </Form.Item>
                  
                  <Form.Item className="formItemTwo"> </Form.Item>
                  <Form.Item label="参加工作时间" name='joinWork'  initialValue={2} rules={[{ required: true, message:"请填写参加工作时间"  }]}>
                    <Input placeholder="请选择参加工作时间" />
                  </Form.Item>
                  <Form.Item label="个人优势" name="identityAdvantage" className="formFloat">
                    <TextArea rows={5} placeholder="您可以总结一下您的工作成果，向HR展示您的擅长领域 (选填)" />
                  </Form.Item>
                </Form>
              </div>
            </section>
          </div>
          <div className="jobWanted_options_layout_cartBottom">
            <div className="jobWanted_options_layout_cartBottom_title">教育/实习经历 (必填)</div>
            <div className="jobWanted_options_layout_cartBottom_tip">完善学历信息，您将被更多HR相中；学历请填写您的最高学历；填写实习经历，我们会帮您找到更适合的工作岗位。</div>
            <section className="jobWanted_options_layout_cartBottom_content">
              <div className="jobWanted_options_layout_cartBottom_content_right">
                {/* form */}
                <Form
                  layout={formLayout}
                  form={formOptional}
                  defaultValue={{ layout: formLayout }}
                  className="jobWanted_options_layout_cartTop_content_right_form"
                >
                  <Form.Item label="学校名称" name="schoolName">
                    <Input placeholder="如：北京大学" />
                  </Form.Item>
                  <Form.Item label="公司全称"  name="companyName">
                    <Input placeholder="如：武汉德特云才科技有限公司" />
                  </Form.Item>
                  <Form.Item label="学历" name="identityEducation">
                    <Select placeholder="请选择学历" 
                    >
                      {educationData().map(item => <Select.Option key={`&1_${item.id}`} value={item.id}>{item.value}</Select.Option>)}
                    </Select>
                  </Form.Item>
                  <Form.Item label="担任职位" name="positionHeld">
                    <Input placeholder="如：Java工程师" />
                  </Form.Item>
                  <Form.Item label="学制类型" name="typeSchooling">
                    <Select placeholder="请选择制类型" 
                    >
                      {educationalData().map(item => <Select.Option key={`&1_${item.id}`} value={item.id}>{item.value}</Select.Option>)}
                    </Select>
                  </Form.Item>
                  <Form.Item label="在职时间" name="incumbencyType">
                    <div className="formItemLine">
                      <Form.Item className="formItemTwo">
                        <DatePicker onChange={()=>{}} />
                      </Form.Item>
                    -
                      <Form.Item  className="formItemTwo">
                        <DatePicker onChange={()=>{}} />
                      </Form.Item>
                    </div>
                  </Form.Item>
                  <Form.Item label="专业" name="identityMajor">
                    <Input placeholder="如：计算机" />
                  </Form.Item>
                  <Form.Item className="formItemTwo"> </Form.Item>
                  <Form.Item label="时间">
                    <div className="formItemLine">
                      <Form.Item className="formItemTwo" name="entranceTime">
                        <DatePicker onChange={()=>{}} />
                      </Form.Item>
                    -
                      <Form.Item  className="formItemTwo" name="graduationTime">
                        <DatePicker onChange={()=>{}} />
                      </Form.Item>
                    </div>
                  </Form.Item>
                  <Form.Item className="formItemTwo"> </Form.Item>
                  <Form.Item label="在校经历" name="associationActivity" >
                    <TextArea rows={5} placeholder="如：在校期间学习到的主要技能及获得的荣誉" />
                  </Form.Item>
                  <Form.Item className="formItemTwo"> </Form.Item>
                </Form>
              </div>
            </section>
          </div>
          <div className="btn">
            <Button type="primary" onClick={onFinish}>完成</Button>
          </div>
        </div>
      </div> 
    </div>
  );
};

const mapStateToProps = function (state: CombinedState): CounterState {
  return state.counter;
};

export default connect(mapStateToProps, actions)(jobWanted);