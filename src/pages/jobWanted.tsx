import * as React from "react";
import * as dayjs from "dayjs";
import SingleTree from "@/components/home/singleTree";
import "@/styles/pages/jobWanted.scss";
import Header from "@/components/home/header";
import classnames from "classnames";
import DoubleTree from "@/components/home/doubleTree";
import Picture from "@/img/picture.png";
import axios from "@/api/axios";
import { FormInstance, RuleObject } from "antd/es/form";
import { StoreValue } from "antd/es/form/interface";
import Upload from "@/components/home/upload";
import { useNavigate } from "react-router-dom";
import {
  moneyList,
  expectedIndustryData,
  expectedCityData,
  identityStatusData,
  educationData,
  educationalData
} from "@/utils/optionList";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
} from "antd";

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


const { RangePicker } = DatePicker;
const { TextArea } = Input;

const {useState} = React;
const jobWanted: React.FC = () => {
  const navigate = useNavigate();
  const [update,setUpdate] = useState(false);
  const [formMust] = Form.useForm();
  const [_, setIsShow] = useState<[]>();
  const [formMustData,setFormMustData] = React.useState({
    // 姓名
    name:undefined,
    // 期望职位
    postCategoryCode:undefined,
    // 出生日期
    birthday:undefined,
    // 期望薪资
    salaryExpectation:[],
    // 性别
    sex:"2",
    // 期望行业
    industryCategoryCode:undefined,
    // 当前状态
    identityStatus: undefined,
    // 期望城市
    workCityCode:undefined,
    // 求职身份
    jobMent:"2",
    // 参加工作时间
    workTime	:undefined,
    // 个人优势
    merit:undefined
  });
  const [formOptional] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("vertical");
  const [postCategoryData, setPostCategoryData]=React.useState([]);
  const [industryCategoryData, setIndustryCategoryData]=React.useState([]);
  const [url,setUrl] = React.useState("");
  const onFinish = async() => {
    const r1 = formMust.getFieldsValue();
    if(r1.salaryExpectation){
      r1.salaryMin = r1.salaryExpectation[0];
      r1.salaryMax = r1.salaryExpectation[1];
    }
    r1.birthday = dayjs(r1.birthday).format("YYYY-MM-DD");
    r1.workTime = dayjs(r1.workTime).format("YYYY-MM-DD");
    const r2 = formOptional.getFieldsValue();
    if(r2.workDate){
      r1.workDateStart = r1.salaryExpectation[0].format("YYYY-MM-DD");
      r1.workDateEnd = r1.salaryExpectation[1].format("YYYY-MM-DD");
    }
    if(r2.educationDate){
      r1.educationDataStart = r1.salaryExpectation[0].format("YYYY-MM-DD");
      r1.educationDataEnd = r1.salaryExpectation[1].format("YYYY-MM-DD");
    }
    if(url){
      r1.picture = url;
    }
    const _data = {
      resumeReq:r1,
      educationReq:r2,
    };
    console.log(_data);
    const {data} =  await axios.post("/cpe/resume/job",_data);
    if(data.data){
      navigate("/search");
    }
  };
  const getIndustryCategory = async() => {
    const {data} = await axios.get("/sys/industry_category/get_cache_tree");
    setIndustryCategoryData(data.data);
  };
  const getPostCategory = async() => {
    const {data} = await axios.get("/sys/post_category/cache_tree");
    console.log("data=>>",data);
    setPostCategoryData(data.data);
  };
  // 获取数据
  const getData = async()=>{
    getPostCategory();
    getIndustryCategory();
  };
  React.useEffect(()=>{
    getData();
  },[]);
  const inputValidator = (rule: RuleObject, value: StoreValue, callback: (error?: string) => void):Promise<void | any> | void =>{
    if(!value) return callback();
    if(value.length < 2 || value.length >50){
      callback("2-50个字以内");
    }else{
      callback();
    }
  };
  const clickSex = (id:string) => {
    formMust.setFieldsValue({
      sex:id
    });
    setUpdate(!update);
  };
  const clickJob = (id:string) => {
    formMust.setFieldsValue({
      jobMent:id
    });
    setUpdate(!update);
  };
  const postCategoryDataCb = (item:{}) => {
    console.log("ITEM",item);
  };
  const industryCategoryDataCb = (item:{}) => {
    console.log("ITEM",item);
  };
  const cbResult = async(data) => {
    const picture = data.data.fileUrl;
    // 新增
    setUrl(picture);
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
              {/* <img src={LOGO} alt="" /> */}
              <Upload cbResult={cbResult} src={url?url:Picture} />
              <div className="jobWanted_options_layout_cartTop_content_right">
                {/* form */}
                <Form
                  layout={formLayout}
                  form={formMust}
                  initialValues={{ layout: formLayout,...formMustData }}
                  className="jobWanted_options_layout_cartTop_content_right_form"
                >
                  <Form.Item label="姓名" name="name" rules={[{ required: true, message:"请输入姓名"},{validator:inputValidator }]}>
                    <Input placeholder="请输入姓名" />
                  </Form.Item>
                  <Form.Item label="期望职位" name="postCategoryCode" rules={[{ required: true, message:"请选择期望职位"}]}>
                    <DoubleTree data={postCategoryData} cb={postCategoryDataCb} />
                  </Form.Item>
                  <Form.Item label="出生日期" name="birthday" rules={[{ required: true, message:"请选择出生日期"}]}>
                    <DatePicker placeholder="请选择出生日期" />
                  </Form.Item>
                  <Form.Item label="期望薪资" name="salaryExpectation" rules={[{ required: true, message:"请选择期望薪资"}]} >
                    <SalaryExpectation formMust={formMust}/>
                  </Form.Item>
                  <Form.Item label="性别" name="sex" rules={[{ required: true, message:"请选择性别"}]}>
                    {/* Radio */}
                    {/*  defaultValue="a"  */}
                    <div onChange={()=>{}} className="formRadio">
                      <div
                        className={classnames("formRadio_item",
                          {
                            formRadio_active:formMust.getFieldValue("sex") === "1"
                          }
                        )}
                        onClick={()=>clickSex("1")}
                      >男</div>
                      <span className="formRadio_empty"></span>
                      <div 
                        className={classnames("formRadio_item",
                          {
                            formRadio_active:formMust.getFieldValue("sex") === "2"
                          }
                        )}
                        onClick={()=>clickSex("2")}
                      >女</div>
                    </div>
                  </Form.Item>
                  <Form.Item label="期望行业" name="industryCategoryCode"  rules={[{ required: true, message:"请选择行业"}]}>
                    <SingleTree data={industryCategoryData} cb={industryCategoryDataCb} />
                  </Form.Item>
                  <Form.Item label="当前状态" name="identityStatus" rules={[{ required: true, message:"请选择状态"}]}>
                    <Select placeholder="请选择状态">
                      {identityStatusData().map(item => <Select.Option key={`&2_${item.id}`} value={item.id}>{item.value}</Select.Option>)}
                    </Select>
                  </Form.Item>
                  <Form.Item label="期望城市" name="workCityCode" rules={[{ required: true, message:"请选择城市" }]}>
                    <Select placeholder="请选择城市">
                      {expectedCityData().map(item => <Select.Option key={`&2_${item.id}`} value={item.id}>{item.value}</Select.Option>)}
                    </Select>
                  </Form.Item>
                  <Form.Item label="求职身份"  name='jobMent' rules={[{ required: true, message:"请选择职身份"  }]}>
                    {/* Radio */}
                    {/* defaultValue="a" */}
                    <div onChange={()=>{}} className="formRadio">
                      <div
                        className={classnames("formRadio_item",{
                          "formRadio_active":formMust.getFieldValue("jobMent") === "1"
                        })}
                        onClick={()=>{clickJob("1");}}
                      >职场精英</div>
                      <span className="formRadio_empty"></span>
                      <div
                        className={classnames("formRadio_item",{
                          "formRadio_active":formMust.getFieldValue("jobMent") === "2"
                        })}
                        onClick={()=>{clickJob("2");}}
                      >学生</div>
                    </div>
                  </Form.Item>
                  
                  <Form.Item className="formItemTwo"> </Form.Item>
                  <Form.Item label="参加工作时间" name='workTime' rules={[{ required: true, message:"请填写参加工作时间"  }]}>
                    <DatePicker placeholder="请选择参加工作时间" />
                  </Form.Item>
                  <Form.Item label="个人优势" name="merit" className="formFloat">
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
                  <Form.Item label="学历" name="educationCode">
                    <Select placeholder="请选择学历" 
                    >
                      {educationData().map(item => <Select.Option key={`&1_${item.id}`} value={item.id}>{item.value}</Select.Option>)}
                    </Select>
                  </Form.Item>
                  <Form.Item label="担任职位" name="postCategoryCode">
                    <Input placeholder="如：Java工程师" />
                  </Form.Item>
                  <Form.Item label="学制类型" name="educationType">
                    <Select placeholder="请选择制类型" 
                    >
                      {educationalData().map(item => <Select.Option key={`&1_${item.id}`} value={item.id}>{item.value}</Select.Option>)}
                    </Select>
                  </Form.Item>
                  <Form.Item label="在职时间" name="workDate">
                    <div className="formItemLine">
                      <Form.Item className="formItemTwo" name="workDateStart">
                        <DatePicker onChange={()=>{}} />
                      </Form.Item>
                    -
                      <Form.Item  className="formItemTwo" name="workDateEnd">
                        <DatePicker onChange={()=>{}} />
                      </Form.Item>
                    </div>
                  </Form.Item>
                  <Form.Item label="专业" name="major">
                    <Input placeholder="如：计算机" />
                  </Form.Item>
                  <Form.Item className="formItemTwo"> </Form.Item>
                  <Form.Item label="时间" name="educationDate">
                    <div className="formItemLine">
                      <Form.Item className="formItemTwo" name="entranceTime">
                        <DatePicker onChange={()=>{}} placeholder="入学时间" />
                      </Form.Item>
                    -
                      <Form.Item  className="formItemTwo" name="graduationTime">
                        <DatePicker onChange={()=>{}}  placeholder="毕业时间" />
                      </Form.Item>
                    </div>
                  </Form.Item>
                  <Form.Item className="formItemTwo"> </Form.Item>
                  <Form.Item label="在校经历" name="career" >
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


export default jobWanted;