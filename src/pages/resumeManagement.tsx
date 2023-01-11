import * as React from "react";
import Header from "@/components/home/header";
import Login from "@/components/home/loginCard";
import PersonalInfoCard from "@/components/home/personalInfoCard";
import ResumeManagementCard from "@/components/home/resumeManagementCard";
import BrowseInformationCard from "@/components/home/browseInformationCard";
import SingleTree from "@/components/home/singleTree";
import DoubleTree from "@/components/home/doubleTree";
import Upload from "@/components/home/upload";
import "@/styles/pages/resumeManagement.scss";
import dayjs from "dayjs";
import Picture from "@/img/picture.png";
import LOGO from "@/img/LOGO.png";
import classnames from "classnames";
import { FormInstance, RuleObject } from "antd/es/form";
import { useLocation } from "react-router-dom";
import axios from "@/api/axios";
import { useSelector } from "react-redux";

import {
  moneyList,
  expectedCityData,
  identityStatusData,
  educationData
} from "@/utils/optionList";
const {useState} = React;
import {
  Form,
  Input,
  Col,
  Select,
  DatePicker,
  Button,
  Row,
  Anchor,
  message
} from "antd";
const { Link } = Anchor;
const { RangePicker } = DatePicker;
const { TextArea } = Input;


type TestProps = {
  formOne:FormInstance
  value: [string,string],
  onChange:()=>{}
}

const SalaryExpectation: React.FC = (props:TestProps) => {
  const [_, setIsShow] = useState<[]>();
  const { formData,value,onChange  } = props;
  return <div className="formItemLine" >
    <Form.Item className="formItemTwo">
      <Select placeholder="请选择"
        onChange={(e)=>{
          const oldArr = formData.getFieldValue("salaryExpectation");
          oldArr[0] = e;
          onChange(oldArr);
          formData.setFieldsValue({
            salaryMin:e
          });
          setIsShow([]);
        }}
        value={formData.getFieldValue("salaryMin")}>
        {moneyList().map(item => <Select.Option key={`&0_${item.id}`} value={item.id}>{item.value}</Select.Option>)}
      </Select>
    </Form.Item>
  -
    <Form.Item  className="formItemTwo">
      <Select placeholder="请选择" 
        onChange={(e)=>{
          const oldArr = formData.getFieldValue("salaryExpectation");
          oldArr[1] = e;
          formData.setFieldsValue({
            salaryMax:e
          });
          onChange(oldArr);
          setIsShow([]);
        }}
        value={formData.getFieldValue("salaryMax")}
      >
        {moneyList().map(item => <Select.Option key={`&1_${item.id}`} value={item.id}>{item.value}</Select.Option>)}
      </Select>
    </Form.Item>
  </div>;
};


const initData1 = () => ({
  name:undefined,
  jobMent:undefined,
  birthday:undefined,
  sex:undefined,
  wx:undefined,
  email:undefined,
  phone:undefined,
  workTime:undefined,
  jobIdentity:undefined,
  educationName:undefined,
  stampdiffTime:undefined,
  educationDesc:undefined,
  jobMentName:undefined,
  picture:undefined,
});


const initData3= () => ({
  wantedType: undefined,
  workCityCode: undefined,
  postCategoryCode: undefined,
  industryCategoryCode: undefined,
  salaryExpectation: [undefined,undefined],
  postCategoryName: undefined,
  workCityName: undefined,
});

const initData4 = () => ({
  companyName:undefined,
  industryCategoryCode:undefined,
  postCategoryCode:undefined,
  workDate:[],
  postCategoryName:undefined,
  reportingObject:undefined,
  workDateEnd:undefined,
  workDateStart:undefined,
  workContent:undefined,
});

const ResumeManagement = () => {
  const routeConfig = useLocation();

  const [info, setInfo] = React.useState({});

  const [OnlyShowFormOneData,setOnlyShowFormOneData] = React.useState(initData1());
  
  const [formOneData,setFormOneData] = React.useState(initData1());
  
  // 个人优势
  const [merit, setMerit] = React.useState(""); 

  // 期望职位
  const [formTwoData,setFormTwoData] = React.useState({});
  const [formTwoDataList,setFormTwoDataList] = React.useState([]);
  // 工作经历
  const [formThreeDataList,setFormThreeDataList] = React.useState([]);
  const [formThreeData,setFormThreeData] = React.useState({});

  // 项目经历
  const [formFourDataList,setFormFourDataList] = React.useState([]);

  // 项目经历
  const [formFourData,setFormFourData] = React.useState({});
  const [formFiveData,setFormFiveData] = React.useState({});

  // 教育经历
  const [formFiveDataList,setFormFiveDataList] = React.useState([]);
  const [formSixData,setFormSixData] = React.useState({});

  // 资格证书
  const [formSixDataList,setFormSixDataList] = React.useState([]);

  const [currentIndex,setCurrentIndex] = React.useState(0);
  const [postCategoryData, setPostCategoryData]=React.useState([]);
  const [industryCategoryData, setIndustryCategoryData]=React.useState([]);
  const [edit1,setEdit1] = React.useState<boolean>(false);
  const [edit2,setEdit2] = React.useState<boolean>(false);
  const [edit3,setEdit3] = React.useState<boolean>(false);
  const [edit4,setEdit4] = React.useState<boolean>(false);
  const [edit5,setEdit5] = React.useState<boolean>(false);
  const [edit6,setEdit6] = React.useState<boolean>(false);
  const [edit7,setEdit7] = React.useState<boolean>(false);
  const [resumeId,setResumeId] = React.useState<string|number>("");
  const { loginInfo } = useSelector((store: any) => store.login);

  const [formOne] = Form.useForm();
  const [formTwo] = Form.useForm();
  const [formThree] = Form.useForm();
  const [formFour] = Form.useForm();
  const [formFive] = Form.useForm();
  const [formSix] = Form.useForm();
  const getIndustryCategory = async() => {
    const {data} = await axios.get("/sys/industry_category/get_cache_tree");
    setIndustryCategoryData(data.data);
  };
  const getPostCategory = async() => {
    const {data} = await axios.get("/sys/post_category/cache_tree");
    setPostCategoryData(data.data);
  };
  // 获取数据
  const getData = async()=>{
    getPostCategory();
    getIndustryCategory();
  };
  const clickChange = (i:number) => {
    setCurrentIndex(i);
  };
  React.useEffect(()=>{
    getData();
    console.log("routeConfig",routeConfig);
  },[]);
  const inputValidator = (rule: RuleObject, value: StoreValue, callback: (error?: string) => void):Promise<void | any> | void =>{
    // if(!value) return callback();
    callback();
    // if(value.length < 2 || value.length >2000){
    //   callback("2000个字以内");
    // }else{
    //   callback();
    // }
  };
  const submitFormData1 = async () => {
    try {
      const rs = await formOne.validateFields(["name","jobMent","sex","phone","birthday","wx","jobIdentity","email","workTime"]);
      console.log("------1",rs);
      const data = await formOne.getFieldsValue();
      data.birthday = dayjs(data.birthday).format("YYYY-MM-DD");
      data.workTime = dayjs(data.workTime).format("YYYY-MM-DD");
      // 新增
      // type c端口 type 默认为1
      if(!resumeId){
        const {data:rs} = await axios.post("/cpe/resume/single",{...data,type:1});
        if(rs.code === 200 ){
          message.success("新增成功");
        }else{
          message.success(rs.data);
        }
      } else {
        const {data:rs} = await axios.put("/cpe/resume/single",{
          ...data,
          type:1,
          resumeId
        });
        if(rs.code === 200 ){
          message.success("修改成功");
        }else{
          message.success(rs.data);
        }
      }
      // 清空 没写
      setEdit1(false);
      getData1();
    } catch (error) {
      console.log("error1",error);
    }
  };
  const submitFormData2 = async () => {       
    const {data:rs} =await axios.put("/cpe/resume/single",{merit,resumeId, type:1});
    if(rs.code === 200 ){
      message.success("修改成功");
    }else{
      message.success(rs.data);
    }
    // 清空 
    setMerit("");
    getData2();
    setEdit2(false);
  };
  const submitFormData3 = async(id:number|string)=>{
    const data = await formTwo.getFieldsValue();
    await formTwo.validateFields();
    if(data.salaryExpectation){
      data["salaryMin"] = data.salaryExpectation[0];
      data["salaryMax"] = data.salaryExpectation[1];
    }
    // 新增
    if(!id){
      const {data:rs} = await axios.post("/cpe/resume/post",{
        ...data,
        workCityName:cityFilter(data.workCityCode),
        resumeId
      });
      if(rs.code === 200 ){
        message.success("修改成功");
      }else{
        message.success(rs.data);
      }
    } else {
      const {data:rs} = await axios.put("/cpe/resume/post",{
        ...data,
        workCityName:cityFilter(data.workCityCode),
        id,
        resumeId
      });
      if(rs.code === 200 ){
        message.success("修改成功");
      }else{
        message.success(rs.data);
      }
    }
    // 刷新
    getData3(resumeId);
    setEdit3(false);
  };
  const submitFormData4 = async(id?: number | string)=>{
    const data1 = await formThree.getFieldsValue();
    console.log("data",data1);
    await formThree.validateFields();
    const data = await formThree.getFieldsValue();
    data.workDateStart = dayjs(data.workDate[0]).format("YYYY-MM-DD");
    data.workDateEnd = dayjs(data.workDate[1]).format("YYYY-MM-DD");
    // 新增
    if(!id){
      const {data:rs}  = await axios.post("/cpe/resume/work",{
        ...data,
        resumeId
      });
      if(rs.code === 200 ){
        message.success("修改成功");
      }else{
        message.success(rs.data);
      }
    } else {
      const {data:rs}  = await axios.put("/cpe/resume/work",{
        ...data,
        resumeId,
        id
      });
      if(rs.code === 200 ){
        message.success("修改成功");
      }else{
        message.success(rs.data);
      }
    }
    getData4(resumeId);
    setEdit4(false);
  };
  const remoteDelete3 = async(id?:number | string,resumeId?:number | string) => {
    const {data} = await axios.delete(`/cpe/resume/post?id=${id}&resumeId=${resumeId}`);
    message.success("删除成功");
    // 刷新
    getData3(resumeId);
  };
  const remoteDelete4 = async(id?:number | string,resumeId?:number | string) => {
    const rs = await axios.delete(`/cpe/resume/work?id=${id}&resumeId=${resumeId}`);
    getData4(resumeId);
  };
  const remoteDelete5 = async(id?:number | string,resumeId?:number | string) => {
    const rs = await axios.delete(`/cpe/resume/project?id=${id}&resumeId=${resumeId}`);
    getData5(resumeId);
  };
  const remoteDelete6 = async(id?:number | string,resumeId?:number | string) => {
    const rs = await axios.delete(`/cpe/resume/education?id=${id}&resumeId=${resumeId}`);
    getData6(resumeId);
  };
  const remoteDelete7 = async(id?:number | string,resumeId?:number | string) => {
    const rs = await axios.delete(`/cpe/resume/certificate?id=${id}&resumeId=${resumeId}`);
    getData7(resumeId);
  };
  
  const submitFormData5 = async(id?: number | string)=>{
    await formFour.validateFields();
    const data = await formFour.getFieldsValue();
    // data.projectDate = [dayjs(data.projectDate[0]).format("YYYY-MM-DD"),dayjs(data.projectDate[1]).format("YYYY-MM-DD")];
    // projectDateStart projectDateEnd
    if(data.projectDate){
      data.projectDateStart = dayjs(data.projectDate[0]).format("YYYY-MM-DD");
      data.projectDateEnd = dayjs(data.projectDate[1]).format("YYYY-MM-DD");
    }
    // 新增
    if(!id){
      const {data:rs} = await axios.post("/cpe/resume/project",{
        resumeId,
        ...data,
      });
      if(rs.code === 200 ){
        message.success("修改成功");
      }else{
        message.success(rs.data);
      }
    } else {
      const {data:rs} = await axios.put("/cpe/resume/project",{
        ...data,
        resumeId,
        id
      });
      if(rs.code === 200 ){
        message.success("修改成功");
      }else{
        message.success(rs.data);
      }
    }
    getData5(resumeId);
    setEdit5(false);
  };
  const submitFormData6 = async(id?: number | string)=>{
    await formFive.validateFields();
    const data = await formFive.getFieldsValue();
    console.log(data);
    if(data.educationDate){
      data.educationDataStart = dayjs(data.educationDate[0]).format("YYYY-MM-DD");
      data.educationDataEnd = dayjs(data.educationDate[1]).format("YYYY-MM-DD");
    }
    // 新增
    if(!id){
      const {data:rs}  = await axios.post("/cpe/resume/education",{
        resumeId,
        ...data,
      });
      if(rs.code === 200 ){
        message.success("修改成功");
      }else{
        message.success(rs.data);
      }
    } else {
      const {data:rs}  = await axios.put("/cpe/resume/education",{
        ...data,
        resumeId,
        id
      });
      if(rs.code === 200 ){
        message.success("修改成功");
      }else{
        message.success(rs.data);
      }
    }
    getData6(resumeId);
    setEdit6(false);
  };
  const submitFormData7 = async(id?: number | string)=>{
    await formSix.validateFields();
    const data = await formSix.getFieldsValue();
    if(data.gainDate){
      data.gainDate = dayjs(data.gainDate).format("YYYY-MM-DD");
    }
    // 新增
    if(!id){
      const {data:rs}  = await axios.post("/cpe/resume/certificate",{
        ...data,
        resumeId,
      });
      if(rs.code === 200 ){
        message.success("修改成功");
      }else{
        message.success(rs.data);
      }
    } else {
      const {data:rs}  = await axios.put("/cpe/resume/certificate",{
        ...data,
        resumeId,
        id
      });
      if(rs.code === 200 ){
        message.success("修改成功");
      }else{
        message.success(rs.data);
      }
    }
    getData7(resumeId);
    setEdit7(false);
  };
  const postCategoryDataCb = (item) => {
  };
  const industryCategoryDataCb = () => {};
  // 设置form data
  const setFormData1 = (type: string, value: string | number) => {
    formOne.setFieldValue(type,value);
    setFormOneData({
      ...formOneData,
      [type]:value
    });
  };
  const setFormData2 = (type: string, value: string | number) => {
    formTwo.setFieldValue(type,value);
    setFormTwoData({
      ...formTwoData,
      [type]:value
    });
  };
  const setFormData6 = (type: string, value: string | number) => {
    formFive.setFieldValue(type,value);
    setFormFiveData({
      ...formFiveData,
      [type]:value
    });
  };
  
  const init = async()=>{
    const {data} = await axios.get("/cpe/post/info");
    setInfo(data.data);
  };

  const getInit = async ()=>{
    const resumeId =  await getData1();
    getData2();
    getData3(resumeId);
    getData4(resumeId);
    getData5(resumeId);
    getData6(resumeId);
    getData7(resumeId);
    init();
  };
  React.useEffect(()=>{
    getInit();
  },[]);
  // 查看个人
  const getData1 = async()=>{
    const {data:_rs} = await axios.get("/cpe/resume/single");
    const rs = _rs.data;
    if(!rs) return;
    const newR = {
      name:rs.name,
      jobMent:Number(rs.jobMent),
      birthday:dayjs(`${rs.birthday}`),
      sex:rs.sex,
      wx:rs.wx,
      email:rs.email,
      phone:rs.phone,
      workTime:dayjs(`${rs.workTime}`),
      jobIdentity:rs.jobIdentity,
      educationName:rs.educationName,
      stampdiffTime:rs.stampdiffTime,
      educationDesc:rs.educationDesc,
      jobMentName:rs.jobMentName,
      picture:rs.picture,
    };
    setResumeId(rs.resumeId);
    setFormOneData(newR);
    setOnlyShowFormOneData(newR);
    return rs.resumeId;
  };
  const getData2 = async()=>{
    const {data:_rs} = await axios.get("/cpe/resume/single");
    const rs = _rs.data;
    setMerit(rs.merit);
  };
  const getData3 = async(id)=>{
    const {data:_rs} = await axios.get(`/cpe/resume/post/${id}`);
    if(_rs.code === 200){
      const rs = _rs.data;
      setFormTwoDataList(rs);
    }
  };
  const getData4 = async(id)=>{
    const {data:_rs} = await axios.get(`/cpe/resume/work/${id}`);
    if(_rs.code === 200){
      const rs = _rs.data;
      setFormThreeDataList(rs);
    }
  };
  const getData5 = async(id)=>{
    const {data:_rs} = await axios.get(`/cpe/resume/project/${id}`);
    if(_rs.code === 200){
      const rs = _rs.data;
      setFormFourDataList(rs);
    }
  };
  const getData6 = async(id)=>{
    const {data:_rs} = await axios.get(`/cpe/resume/education/${id}`);
    if(_rs.code === 200){
      const rs = _rs.data;
      console.log("教育经历", rs);
      setFormFiveDataList(rs);
    }
  };
  const getData7 = async(id)=>{
    const {data:_rs} = await axios.get(`/cpe/resume/certificate/${id}`);
    if(_rs.code === 200){
      const rs = _rs.data;
      console.log("资格证书", rs);
      setFormSixDataList(rs);
    }
  };
  const cityFilter = (code) => {
    const r =  expectedCityData().filter(i => Number(i.id) === Number(code));
    return r[0]? r[0].value :"";
  };
  const moneyFilter = (code) => {
    const r =  moneyList().filter(i => Number(i.id) === Number(code));
    return r[0]? r[0].value :"";
  };
  const handleTextarea = (text) => {
    return text?text.split("\n"):[];
  };
  const cbResult = async(data) => {
    const picture = data.data.fileUrl;
    // 新增
    console.log("---->>", picture);
    const {data:rs} = await axios.put("/cpe/resume/single",{
      type:1,
      picture,
      resumeId
    });
    if(rs.code === 200 ){
      message.success("修改成功");
    }else{
      message.success(rs.data);
    }
    getData1();
  };
  return (
    <div className="resumeM_layout1">
      <Header />
      <div className="resumeM_lists">
        <div className="resumeM_lists_content">
          <div className="resumeM_lists_content_left">
            {/* 锚点 */}
            <Anchor onClick={(e)=>{
              e.preventDefault();
            }} className="resumeM_lists_content_left_anchor">
              <div className="resumeM_lists_content_left_anchor_title">简历目录</div>
              <Link className="resumeM_lists_content_left_anchor_item" href="#part-1" title="个人信息" />
              <Link className="resumeM_lists_content_left_anchor_item" href="#part-2" title="个人优势" />
              <Link className="resumeM_lists_content_left_anchor_item" href="#part-3" title="期望职位" />
              <Link className="resumeM_lists_content_left_anchor_item" href="#part-4" title="工作经历" />
              <Link className="resumeM_lists_content_left_anchor_item" href="#part-5" title="项目经历" />
              <Link className="resumeM_lists_content_left_anchor_item" href="#part-6" title="教育经历" />
              <Link className="resumeM_lists_content_left_anchor_item" href="#part-7" title="资格证书" />
              <div className="resumeM_lists_content_left_anchor_title">自定义添加</div>
              <Link className="resumeM_lists_content_left_anchor_item" href="#part-7" title="培训经历" />
              <Link className="resumeM_lists_content_left_anchor_item" href="#part-8" title="志愿者服务经历" />
              <Link className="resumeM_lists_content_left_anchor_item" href="#part-9" title="社交主页" />
            </Anchor>
            <div className="resumeM_lists_content_left_resume">
              <span className="resumeM_lists_content_left_resume_title">我的在线简历</span>
              {/* 个人信息 */}
              <section id="part-1" className="resumeM_lists_content_left_resume_card">
                {
                  !edit1 && <React.Fragment>
                    <div className="resumeM_lists_content_left_resume_card_left">
                      {/* keng */}
                      <span className="part-1_title">{OnlyShowFormOneData.name}</span>
                      <div className="part-1_workInfo">
                        <span>{OnlyShowFormOneData.stampdiffTime}年工作经验</span>
                        <span>{OnlyShowFormOneData.educationDesc}</span>
                        <span>{OnlyShowFormOneData.jobMentName}</span>
                        <span>{ dayjs(OnlyShowFormOneData.workTime).format("YYYY-MM")}参加工作</span>
                      </div>
                      <div  className="part-1_call">
                        {OnlyShowFormOneData.phone &&<img src={LOGO} alt="" />}
                        {OnlyShowFormOneData.phone &&<span>{OnlyShowFormOneData.phone}</span>}
                        {OnlyShowFormOneData.wx && <img src={LOGO} alt="" />}
                        {OnlyShowFormOneData.wx && <span>{OnlyShowFormOneData.wx}</span>}
                        
                        {OnlyShowFormOneData.email && <img src={LOGO} alt="" />}
                        {OnlyShowFormOneData.email && <span>{OnlyShowFormOneData.email}</span>}
                      </div>
                    </div>
                    <div className="resumeM_lists_content_left_resume_card_right">
                      {/* <img className="part-1_logo" src={OnlyShowFormOneData.picture} alt="" /> */}
                      <Upload cbResult={cbResult} src={OnlyShowFormOneData.picture?OnlyShowFormOneData.picture:Picture} />
                      <div className="part-1_span" onClick={()=>setEdit1(true)}><img className="part-1_icon" src={LOGO} alt="" />编辑</div>
                    </div>
                  </React.Fragment>
                }
                {
                  edit1 && 
                  <div className="resumeM_lists_content_left_resume_card_left">
                    <span className="part-1_title">编辑个人信息</span>
                    {/* form */}
                    <Form
                      layout={"vertical"}
                      form={formOne}
                      initialValues={{ layout: "vertical",...formOneData }}
                      className="resumeM_options_layout_cartTop_content_right_form"
                    >
                      <Form.Item label="姓名" name="name" rules={[{ required: true, message:"请输入姓名"},{validator:inputValidator }]}>
                        <Input placeholder="请输入姓名" />
                      </Form.Item>
                      <Form.Item label="当前状态" name="jobMent" rules={[{ required: true, message:"请选择状态"}]}>
                        <Select placeholder="请选择状态">
                          {identityStatusData().map(item => <Select.Option key={`&2_${item.id}`} value={item.id}>{item.value}</Select.Option>)}
                        </Select>
                      </Form.Item>
                      <Form.Item label="性别" name="sex" rules={[{ required: true, message:"请选择性别"}]}>
                        {/* Radio */}
                        {/*  defaultValue="a"  */}
                        <div onChange={()=>{}} className="formRadio">
                          <div
                            className={classnames("formRadio_item",
                              {
                                formRadio_active:formOneData.sex === "1"
                              }
                            )}
                            onClick={()=>setFormData1("sex","1")}
                          >男</div>
                          <span className="formRadio_empty"></span>
                          <div 
                            className={classnames("formRadio_item",
                              {
                                formRadio_active:formOneData.sex === "2"
                              }
                            )}
                            onClick={()=>setFormData1("sex","2")}
                          >女</div>
                        </div>
                      </Form.Item>
                      <Form.Item label="手机号码" name="phone" rules={[{ required: true, message:"请输入手机号码"},{validator:inputValidator }]}>
                        <Input placeholder="请输入手机号码" />
                      </Form.Item>
                      <Form.Item label="出生日期" name="birthday"rules={[{ required: true, message:"请选择出生日期"}]}>
                        <DatePicker placeholder="请选择时间" />
                      </Form.Item>
                      <Form.Item label="微信" name="wx" rules={[{ required: true, message:"请输入微信"},{validator:inputValidator }]}>
                        <Input placeholder="请输入微信" />
                      </Form.Item>
                      <Form.Item label="求职身份"  name='jobIdentity' rules={[{ required: true, message:"请选择职身份"  }]}>
                        {/* Radio */}
                        {/* defaultValue="a" */}
                        <div className="formRadio">
                          <div
                            onClick={()=> setFormData1("jobIdentity","1")}
                            className={classnames("formRadio_item",{
                              "formRadio_active":formOneData.jobIdentity ==="1"
                            })}
                          >职场精英</div>
                          <span className="formRadio_empty"></span>
                          <div
                            onClick={()=> setFormData1("jobIdentity","2")}
                            className={classnames("formRadio_item",{
                              "formRadio_active":formOneData.jobIdentity==="2"
                            })}
                          >学生</div>
                        </div>
                      </Form.Item>
                      <Form.Item label="邮箱" name="email" rules={[{ required: true, message:"请输入微信"},{validator:inputValidator }]}>
                        <Input placeholder="请输入微信" />
                      </Form.Item>
                  
                      <Form.Item label="参加工作时间" name='workTime' rules={[{ required: true, message:"请填写参加工作时间"  }]}>
                        <DatePicker placeholder="请选择参加工作时间" />
                      </Form.Item>
                      <Form.Item className="formItemTwo">
                        <Button onClick={()=>{
                          setEdit1(false);
                          formOne.resetFields();
                        }}>取消</Button>
                        <Button onClick={()=>submitFormData1()}>完成</Button>
                      </Form.Item>
                    </Form>
                  </div>
                }
              </section>
              {/* 个人优势 */}
              <section id="part-2" className="resumeM_lists_content_left_resume_card">
                { 
                  !edit2 &&
                <React.Fragment>
                  <div className="resumeM_lists_content_left_resume_card_left">
                    <span className="part-2_title">个人优势</span>
                    <div  className="part-2_workInfo">
                      {merit}
                    </div>
                  </div>
                  <div className="resumeM_lists_content_left_resume_card_right">
                    <div className="part-2_span" onClick={()=>setEdit2(true)}><img className="part-1_icon" src={LOGO} alt="" />编辑</div>
                  </div>
                </React.Fragment>
                }
                { 
                  edit2 &&
                  <div className="resumeM_lists_content_left_resume_card_left">
                    <span className="part-2_title">个人优势</span>
                    <div>
                      <TextArea autoSize={{ minRows: 3, maxRows: 10 }} value={merit} onChange={(e)=>setMerit(e.target.value)} />
                      <Button onClick={()=>setEdit2(false)}>取消</Button>
                      <Button onClick={()=>submitFormData2()}>完成</Button>
                    </div>
                  </div>
                }
                
              </section>
              {/* 期望职位 */}
              <section id="part-3" className="resumeM_lists_content_left_resume_card">
                {
                  !edit3 && <React.Fragment>
                    <div className="resumeM_lists_content_left_resume_card_left">
                      <span className="part-3_title">期望职位</span>
                      {
                        formTwoDataList && formTwoDataList.map((item,index) => {
                          return <div key={index} className="part-3_workInfo">
                            <span>{item.postCategoryName}</span>
                            <span>{moneyFilter(item.salaryMin)} - {moneyFilter(item.salaryMax)}</span>
                            {/* 需要后端转换 */}
                            <span>{item.industryCategoryName}</span>
                            <span>{cityFilter(item.workCityCode)}</span>
                            <div className="resumeM_lists_content_left_resume_card_right right_absolute">
                              <div className="part-3_list">
                                <div className="part-3_list_span" onClick={()=>{
                                  setEdit3(true);
                                  console.log(item);
                                  formTwo.setFieldsValue({
                                    wantedType:item.wantedType,
                                    workCityCode:item.workCityCode,
                                    industryCategoryCode: item.industryCategoryCode,
                                    postCategoryCode:item.postCategoryCode,
                                    salaryExpectation:[item.salaryMin,item.salaryMax],
                                    id:item.id
                                  });
                                  setFormTwoData(item);
                                }}><img className="part-3_icon" src={LOGO} alt="" />编辑</div>
                                <div className="part-3_list_span"
                                  onClick={()=>{
                                    remoteDelete3(item.id,item.resumeId);
                                  }}
                                ><img className="part-3_icon" src={LOGO} alt="" />删除</div>
                              </div>
                            </div>
                          </div>;
                        })
                      }
                    </div>
                    <div className="resumeM_lists_content_left_resume_card_right">
                      <div className="part-3_span" onClick={()=>{
                        setFormTwoData({});
                        formTwo.setFieldsValue({
                          wantedType:undefined,
                          workCityCode:undefined,
                          industryCategoryCode: undefined,
                          postCategoryCode:undefined,
                          salaryExpectation:[],
                          salaryMin:undefined,
                          salaryMax:undefined,
                          id:undefined
                        });
                        setEdit3(true);
                      }}><img className="part-3_icon" src={LOGO} alt="" />添加</div>
                    </div>
                  </React.Fragment>
                }
                {
                  edit3 && 
                  <div className="resumeM_lists_content_left_resume_card_left">
                    <span className="part-3_title">期望职位</span>
                    <div>
                      <Form
                        layout={"vertical"}
                        form={formTwo}
                        initialValues={{ layout: "vertical",...formTwoData }}
                        className="jobWanted_options_layout_cartTop_content_right_form"
                      >
                        <Form.Item label="求职类型" name="wantedType" rules={[{ required: true, message:"请选择求职类型"}]}>
                          <div onChange={()=>{}} className="formRadio">
                            <div
                              className={classnames("formRadio_item",
                                {
                                  formRadio_active:Number(formTwoData.wantedType) === 1
                                }
                              )}
                              onClick={()=>setFormData2("wantedType","1")}
                            >全职</div>
                            <span className="formRadio_empty"></span>
                            <div 
                              className={classnames("formRadio_item",
                                {
                                  formRadio_active:Number(formTwoData.wantedType) === 2
                                }
                              )}
                              onClick={()=>setFormData2("wantedType","2")}
                            >兼职</div>
                          </div>
                        </Form.Item>
                        <Form.Item label="期望城市" name="workCityCode" rules={[{ required: true, message:"请选择城市" }]}>
                          <Select placeholder="请选择城市">
                            {expectedCityData().map(item => <Select.Option key={`&2_${item.id}`} value={String(item.id)}>{item.value}</Select.Option>)}
                          </Select>
                        </Form.Item>
                        <Form.Item label="期望岗位" name="postCategoryCode" rules={[{ required: true, message:"请选择期望职位"}]}>
                          <DoubleTree placeholder="请选择期望岗位" data={postCategoryData} cb={postCategoryDataCb} name={formTwoData.postCategoryName} />
                        </Form.Item>
                        <Form.Item label="期望行业" name="industryCategoryCode"  rules={[{ required: true, message:"请选择行业"}]}>
                          <SingleTree data={industryCategoryData} cb={industryCategoryDataCb} name={formTwoData.industryCategoryName} />
                        </Form.Item>
                        {/*  salaryMin  salaryMax */}
                        <Form.Item label="期望薪资" name="salaryExpectation" rules={[{ required: true, message:"请选择期望薪资"}]} >
                          <SalaryExpectation formData={formTwo} onChange={(i:any) => {console.log("------->>");}}/>
                        </Form.Item>
                      </Form>
                      <Button onClick={()=>setEdit3(false)}>取消</Button>
                      <Button onClick={()=>{
                        submitFormData3(formTwoData.id);
                      }}>完成</Button>
                    </div>
                  </div>
                }
                
              </section>
              {/* 工作经历 */}
              <section id="part-4" className="resumeM_lists_content_left_resume_work">
                <div className="part-4_title">
                  <span>工作经历</span>
                  {!edit4 && <div className="part-4_title_span" onClick={()=>{
                    formThree.setFieldsValue({
                      companyName:undefined,
                      industryCategoryCode:undefined,
                      postCategoryCode:undefined,
                      workContent:undefined,
                      reportingObject:undefined,
                      workDate:[],
                      workDateEnd:undefined,
                      workDateStart:undefined,
                    });
                    setFormThreeData({});
                    setEdit4(true);
                  }}><img className="part-4_title_span_icon" src={LOGO} alt="" />添加</div>}
                </div>
                {
                  !edit4 && <React.Fragment>
                    {/* list */}
                    {formThreeDataList && formThreeDataList.map((item,index) =><div key={index} className="part-4_card">
                      <div className="part-4_card_title">
                        <span className="part-4_card_title_name">{item.companyName}</span>
                        <span className="part-4_card_title_time">{item.workDateStart}-{item.workDateEnd}</span>
                        <div className="part-4_card_title_list">
                          <div className="part-4_card_title_list_span"
                            onClick={()=>{
                              setEdit4(true);
                              formThree.setFieldsValue({
                                companyName:item.companyName,
                                postCategoryName:item.postCategoryName,
                                workContent:item.workContent,
                                reportingObject:item.reportingObject,
                                workDate:[dayjs(item.workDateStart),dayjs(item.workDateEnd)],
                              });
                              setFormThreeData(item);
                            }}
                          ><img className="part-4_card_title_list_span_icon" src={LOGO} alt="" />编辑</div>
                          <div className="part-4_card_title_list_span"
                            onClick={()=>{
                              remoteDelete4(item.id,item.resumeId);
                            }}
                          ><img className="part-4_card_title_list_span_icon" src={LOGO} alt="" />删除</div>
                        </div>
                      </div>
                      <div className="part-4_card_post">{item.postCategoryName}</div>
                      <div className="part-4_card_workList">工作内容</div>
                      <div className="part-4_card_workContent">
                        {handleTextarea(item.workContent).map((item,index) => <div key={index}>{item}</div>)}
                      </div>
                    </div>
                    )}
                  </React.Fragment>
                }
                {
                  edit4 && 
                  <div className="resumeM_lists_content_left_resume_card_left">
                    <div>
                      <Form
                        layout={"vertical"}
                        form={formThree}
                        initialValues={{ layout: "vertical",...formThreeData }}
                        className="jobWanted_options_layout_cartTop_content_right_form"
                      >
                        <Form.Item label="公司名称	" name="companyName" rules={[{ required: true, message:"请输入公司名称"},{validator:inputValidator }]}>
                          <Input placeholder="请输入姓名" />
                        </Form.Item>
                        <Form.Item label="所属行业" name="industryCategoryCode"  rules={[{ required: true, message:"请选择所属行业"}]}>
                          <SingleTree placeholder="请选择所属行业" data={industryCategoryData} cb={industryCategoryDataCb} name={formThreeData.industryCategoryName}/>
                        </Form.Item>
                        <Form.Item label="担任职位" name="postCategoryCode" rules={[{ required: true, message:"请选择担任职位"}]}>
                          <DoubleTree data={postCategoryData} cb={postCategoryDataCb} name={formThreeData.postCategoryName}/>
                        </Form.Item>
                        <Form.Item label="在职时间" name="workDate" rules={[{ required: true, message:"请选择职时间"}]}>
                          <RangePicker />
                        </Form.Item>
                        <Form.Item label="汇报对象" name="reportingObject" >
                          <Input placeholder="请输入汇报对象" />
                        </Form.Item>
                        <Form.Item>
                        </Form.Item>
                        <Form.Item label="工作内容" className="full" name="workContent" rules={[{ required: true, message:"请输入工作内容"},{validator:inputValidator }]}>
                          <TextArea  autoSize={{ minRows: 3, maxRows: 10 }} placeholder="请输入工作内容"/>
                        </Form.Item>
                      </Form>
                      <Button onClick={()=>setEdit4(false)}>取消</Button>
                      <Button onClick={()=>{
                        submitFormData4(formThreeData.id);
                      }}>完成</Button>
                    </div>
                  </div>
                }
              </section>
              {/* 项目经历 */}
              <section id="part-5" className="resumeM_lists_content_left_resume_work">
                <div className="part-5_title">
                  <span>项目经历</span>
                  {!edit5 && <div className="part-4_title_span" onClick={()=>{
                    formFour.setFieldsValue({
                      projectName:undefined,
                      projectPost:undefined,
                      projectDesc:undefined,
                      workDate:[]
                    });
                    setFormFourData({});
                    setEdit5(true);
                  }}><img className="part-4_title_span_icon" src={LOGO} alt="" />添加</div>}
                </div>
                {!edit5  && <React.Fragment>
                  {/* list */}
                  {
                    formFourDataList && formFourDataList.map((item,index) => <div key={index} className="part-5_card">
                      <div className="part-5_card_title">
                        <span className="part-5_card_title_name">{item.projectName}</span>
                        <span className="part-5_card_title_time">{item.projectDateStart}-{item.projectDateEnd}</span>
                        <div className="resumeM_lists_content_left_resume_card_right right_absolute">
                          <div className="part-3_list">
                            <div className="part-3_list_span" onClick={()=>{
                              const projectDateStart = item.projectDateStart ? dayjs(item.projectDateStart) : undefined;
                              const projectDateEnd = item.projectDateEnd ? dayjs(item.projectDateEnd) : undefined;
                              formFour.setFieldsValue({
                                projectName:item.projectName,
                                projectPost:item.projectPost,
                                projectDesc:item.projectDesc,
                                projectDate:[projectDateStart,projectDateEnd]
                              });
                              item["projectDate"] = [projectDateStart,projectDateEnd];
                              setFormFourData(item);
                              setEdit5(true);
                            }}><img className="part-3_icon" src={LOGO} alt="" />编辑</div>
                            <div
                              className="part-3_list_span"
                              onClick={()=>{
                                remoteDelete5(item.id,item.resumeId);
                              }}
                            ><img className="part-3_icon" src={LOGO} alt="" />删除</div>
                          </div>
                        </div>
                      </div>
                      <div className="part-5_card_post">{item.projectPostName}</div>
                      <div className="part-5_card_workList">工作内容</div>
                      <div className="part-5_card_workContent">
                        {handleTextarea(item.projectDesc).map((item,index) => <div key={index}>{item}</div>)}
                      </div>
                    </div>
                    )} 
                </React.Fragment>
                }
                {edit5 && <div className="part-5_card">
                  <Form
                    layout={"vertical"}
                    form={formFour}
                    initialValues={{ layout: "vertical",...formFourData }}
                    className="jobWanted_options_layout_cartTop_content_right_form"
                  >
                    <Form.Item label="项目名称" name="projectName" rules={[{ required: true, message:"请输入项目名称"},{validator:inputValidator }]}>
                      <Input placeholder="请输入项目名称" />
                    </Form.Item>
                    <Form.Item label="项目角色" name="projectPost"  rules={[{ required: true, message:"请选择项目角色"}]}>
                      <DoubleTree placeholder="请输入项目角色" data={postCategoryData} cb={postCategoryDataCb} name={formFourData.projectPostName}/>
                    </Form.Item>
                    {/* projectDateStart projectDateEnd  */}
                    <Form.Item label="项目时间" name="projectDate" rules={[{ required: true, message:"请选择项目时间"}]}>
                      <RangePicker placeholder="请选择项目时间" />
                    </Form.Item>
                    <Form.Item >
                    </Form.Item>
                    <Form.Item label="项目描述" name="projectDesc" className="full" rules={[{ required: true, message:"请输入项目描述"},{validator:inputValidator }]}>
                      <TextArea autoSize={{ minRows: 3, maxRows: 10 }} placeholder="请输入项目描述"/>
                    </Form.Item>
                  </Form>
                  <Button onClick={()=>setEdit5(false)}>取消</Button>
                  <Button onClick={()=>{
                    submitFormData5(formFourData.id);
                  }}>完成</Button>
                </div>}
              </section>
              <section id="part-6" className="resumeM_lists_content_left_resume_work">
                <div className="part-6_title">
                  <span>教育经历</span>
                  {!edit6 && <div className="part-4_title_span" onClick={()=>{
                    formFive.setFieldsValue({
                      schoolName:undefined,
                      workDate:[undefined, undefined],
                      education: undefined,
                      major: undefined,
                      educationType: undefined,// 全日制
                      career:undefined
                    });
                    setEdit6(true);
                  }}><img className="part-4_title_span_icon" src={LOGO} alt="" />添加</div>}
                </div>
                {!edit6  && <React.Fragment>
                  {/* list */}
                  {formFiveDataList && formFiveDataList.map((item,index)=><div key={index} className="part-6_card">
                    <div className="part-6_card_title">
                      <span className="part-6_card_title_name">{item.schoolName}</span>
                      <span className="part-6_card_title_time">{item.educationDataStart}至{item.educationDataEnd}</span>
                      <div className="resumeM_lists_content_left_resume_card_right right_absolute">
                        <div className="part-3_list">
                          <div className="part-3_list_span" onClick={()=>{
                            const educationDataStart = item.educationDataStart ? dayjs(item.educationDataStart) : undefined;
                            const educationDataEnd = item.educationDataEnd ? dayjs(item.educationDataEnd) : undefined;
                            formFive.setFieldsValue({
                              schoolName:item.schoolName,
                              educationDate:[educationDataStart, educationDataEnd],
                              education: item.education,
                              major: item.major,
                              educationType: item.educationType,// 全日制
                              career:item.career
                            });
                            setFormFiveData(item);
                            setEdit6(true);
                          }}><img className="part-3_icon" src={LOGO} alt="" />编辑</div>
                          <div
                            className="part-3_list_span"
                            onClick={()=>{
                              remoteDelete6(item.id,item.resumeId);
                            }}
                          ><img className="part-3_icon" src={LOGO} alt="" />删除</div>
                        </div>
                      </div>
                    </div>
                    <div className="part-6_card_title">
                      <span className="part-6_card_title_major">{item.major}</span>
                      <span className="part-6_card_title_time">{item.educationName} {item.educationType ===1?"全日制":"非全日制"}</span>
                    </div>
                    
                  </div>
                  )}
                </React.Fragment>
                }
                {edit6 && <div className="part-6_card">
                  <Form
                    layout={"vertical"}
                    form={formFive}
                    initialValues={{ layout: "vertical",...formFiveData }}
                    className="jobWanted_options_layout_cartTop_content_right_form"
                  >
                    <Form.Item label="学校名称" name="schoolName" rules={[{ required: true, message:"请输入学校名称"}]}>
                      <Input placeholder="请输入学校名称" />
                    </Form.Item>
                    <Form.Item label="求职类型" name="educationType" rules={[{ required: true, message:"请选择求职类型"}]}>
                      <div onChange={()=>{}} className="formRadio">
                        <div
                          className={classnames("formRadio_item",
                            {
                              formRadio_active:Number(formFiveData.educationType) === 1
                            }
                          )}
                          onClick={()=>setFormData6("educationType","1")}
                        >全日制</div>
                        <span className="formRadio_empty"></span>
                        <div
                          className={classnames("formRadio_item",
                            {
                              formRadio_active:Number(formFiveData.educationType) === 2
                            }
                          )}
                          onClick={()=>setFormData6("educationType","2")}
                        >非全日制</div>
                      </div>
                    </Form.Item>
                    <Form.Item label="学历" name="education" rules={[{ required: true, message:"请选择学历"}]}>
                      <Select placeholder="请选择学历" 
                      >
                        {educationData().map(item => <Select.Option key={`&1_${item.id}`} value={String(item.id)}>{item.value}</Select.Option>)}
                      </Select>
                    </Form.Item>
                    <Form.Item label="专业" name="major" rules={[{ required: true, message:"请输入专业"}]}>
                      <Input placeholder="如：计算机" />
                    </Form.Item>
                    <Form.Item label="时间" name="educationDate" rules={[{ required: true, message:"请选择时间"}]}>
                      <RangePicker placeholder="请选择时间" />
                    </Form.Item>
                    <Form.Item className="career"> </Form.Item>
                    <Form.Item label="在校经历" className="full" name="career">
                      <TextArea autoSize={{ minRows: 3, maxRows: 10 }} placeholder="请输入在校经历"/>
                    </Form.Item>
                  </Form>
                  <Button onClick={()=>setEdit6(false)}>取消</Button>
                  <Button onClick={()=>submitFormData6(formFiveData.id)}>完成</Button>
                </div>}
              </section>
              <section id="part-7" className="resumeM_lists_content_left_resume_work">
                <div className="part-7_title">
                  <span>资格证书</span>
                  {!edit7 && <div className="part-4_title_span" onClick={()=>{
                    formSix.setFieldsValue({
                      certificateName:undefined,
                      gainDate:undefined
                    });
                    setFormSixData({});
                    setEdit7(true);
                  }}><img className="part-4_title_span_icon" src={LOGO} alt="" />添加</div>}
                </div>
                {/* list */}
                { !edit7 && 
                <React.Fragment>
                  {formSixDataList && formSixDataList.map((item,index) => <div key={index} className="part-7_card">
                    <div className="part-7_card_title">
                      <span className="part-7_card_title_name">{item.certificateName}</span>
                      <span className="part-7_card_title_time">{item.gainDate}</span>
                    </div>
                    <div className="resumeM_lists_content_left_resume_card_right right_absolute">
                      <div className="part-3_list">
                        <div className="part-3_list_span" onClick={()=>{
                          formSix.setFieldsValue({
                            certificateName:item.certificateName,
                            gainDate:item.gainDate?dayjs(item.gainDate):undefined
                          });
                          setFormSixData(item);
                          setEdit7(true);
                        }}><img className="part-3_icon" src={LOGO} alt="" />编辑</div>
                        <div
                          className="part-3_list_span"
                          onClick={()=>{
                            remoteDelete7(item.id,item.resumeId);
                          }}
                        ><img className="part-3_icon" src={LOGO} alt="" />删除</div>
                      </div>
                    </div>
                  </div>) 
                  }
                </React.Fragment>
                }
                {edit7 && <div className="part-6_card">
                  <Form
                    layout={"vertical"}
                    form={formSix}
                    initialValues={{ layout: "vertical" }}
                    className="jobWanted_options_layout_cartTop_content_right_form"
                  >
                    <Form.Item label="证书名字" name="certificateName" rules={[{ required: true, message:"请输入证书名字"}]}>
                      <Input placeholder="请输入证书名字" />
                    </Form.Item>
                    <Form.Item label="获取证书时间" name="gainDate" rules={[{ required: true, message:"请选择获取证书时间"}]}>
                      <DatePicker placeholder="请选获取证书时间" />
                    </Form.Item>
                  </Form>
                  <Button onClick={()=>setEdit7(false)}>取消</Button>
                  <Button onClick={()=>{
                    submitFormData7(formSixData.id);
                  }}>完成</Button>
                </div>}
              </section>
            </div>
          </div>
          <div className="resumeM_lists_content_right">
            {
              loginInfo.userId ? <React.Fragment>
                <PersonalInfoCard />
                <ResumeManagementCard />
                <BrowseInformationCard />
              </React.Fragment>
                :
                <Login />
            }
          </div>
        </div> 
      </div> 
    </div>
  );
};

export default ResumeManagement;