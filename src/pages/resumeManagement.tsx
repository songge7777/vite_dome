import * as React from "react";
import { connect } from "react-redux";
import { CombinedState, CounterState } from "../store/reducers";
import * as actions from "@/store/actions/counter";
import Header from "@/components/home/Header";
import Login from "@/components/home/login";
import PersonalInfoCard from "@/components/home/personalInfoCard";
import ResumeManagementCard from "@/components/home/resumeManagementCard";
import BrowseInformationCard from "@/components/home/BrowseInformationCard";
import SingleTree from "@/components/home/singleTree";
import DoubleTree from "@/components/home/doubleTree";
import "@/styles/pages/resumeManagement.scss";
import * as dayjs from "dayjs";
import LOGO from "@/img/LOGO.png";
import classnames from "classnames";
import { FormInstance, RuleObject } from "antd/es/form";
import axios from "@/api/axios";
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
const {useState} = React;
type Props = StateProps & DispatchProps 
import {
  Form,
  Input,
  Col,
  Select,
  DatePicker,
  Button,
  Row,
  Anchor
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
          const oldArr = formData.getFieldValue("salaryExpectation");
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


const ResumeManagement = () => {
  // keng
  const [formOneData,setFormOneData] = React.useState({
    name:undefined,
    jobMent:undefined,
    // birthday:[dayjs("2022-12-08"),dayjs("2022-12-11")],
    birthday:dayjs("2022-12-08"),
    // salaryExpectation:["1","3"],
    sex:"1",
    wx:1,
    email:2,
    phone:3,
    workTime:dayjs("2022-12-08"),
    jobIdentity:"1",
  });
  // 期望职位
  const [formTwoData,setFormTwoData] = React.useState({
    // 求职类型
    wantedType:"1",
    // 期望城市
    workCityCode:2,
    // 期望职位-code
    postCategoryCode:3,
    // 期望行业
    industryCategoryCode:4,
    salaryExpectation:[],
  });
  const [formTwoDataList,setFormTwoDataList] = React.useState(
    [
      {
        wantedType:"1",
        workCityCode:2,
        postCategoryCode:3,
        industryCategoryCode:4,
        salaryExpectation:[1,2],
        postCategoryName:"111",
        workCityName:"222",
      },
      {
        wantedType:"1",
        workCityCode:2,
        postCategoryCode:3,
        industryCategoryCode:4,
        salaryExpectation:[],
        postCategoryName:"44",
        workCityName:"555",
      }
    ]
  );
  // 个人优势
  const [merit, setMerit] = React.useState(""); 
  const [formThreeData,setFormThreeData] = React.useState({
    companyName:undefined,
    industryCategoryCode:undefined,
    postCategoryCode:undefined,
    workDate:[],
    reportingObject:undefined,
    workContent:undefined,
  });
  const [formFourData,setFormFourData] = React.useState({
    companyName:undefined,
    projectPost	:undefined,
    workDate:[],
    projectDesc:undefined,
  });
  const [formFiveData,setFormFiveData] = React.useState({
    schoolName:undefined,
    educationType:undefined,
    education:undefined,
    major:undefined,
    workDate:[],
    career:undefined,
  });
  const [currentIndex,setCurrentIndex] = React.useState(0);
  const [postCategoryData, setPostCategoryData]=React.useState([]);
  const [industryCategoryData, setIndustryCategoryData]=React.useState([]);
  const [edit1,setEdit1] = React.useState<boolean>(false);
  const [edit2,setEdit2] = React.useState<boolean>(false);
  const [edit3,setEdit3] = React.useState<boolean>(false);
  const [edit4,setEdit4] = React.useState<boolean>(false);
  const [edit5,setEdit5] = React.useState<boolean>(false);
  const [edit6,setEdit6] = React.useState<boolean>(false);
  const [formOne] = Form.useForm();
  const [formTwo] = Form.useForm();
  const [formThree] = Form.useForm();
  const [formFour] = Form.useForm();
  const [formFive] = Form.useForm();
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
  },[]);
  const inputValidator = (rule: RuleObject, value: StoreValue, callback: (error?: string) => void):Promise<void | any> | void =>{
    if(!value) return callback();
    if(value.length < 2 || value.length >50){
      callback("2-50个字以内");
    }else{
      callback();
    }
  };
  const submitFormData1 = async () => {
    const data = await formOne.getFieldsValue();
    data.birthday = dayjs(data.birthday).format("YYYY-MM-DD");
    data.workTime = dayjs(data.workTime).format("YYYY-MM-DD");
    const rs =await axios.put("/eps/nds_resume",data);
    console.log("data",rs);
    // 清空 没写
  };
  const submitFormData2 = async () => {
    const rs =await axios.put("/eps/nds_resume",{merit});
    console.log("data",rs);
    // 清空
    setMerit("");
  };
  const submitFormData3 = async(id?: number | string)=>{
    const data = await formTwo.getFieldsValue();
    console.log(data);
    // 新增
    if(!id){
      const rs = await axios.post("/eps/nds_resume/nds_resume_post",data);
      console.log("rs",rs);
    } else {
      const rs = await axios.put("/eps/nds_resume/nds_resume_post",{
        ...data,
        id
      });
      console.log("rs",rs);
    }
  };
  const submitFormData4 = async(id?: number | string)=>{
    const data = await formThree.getFieldsValue();
    data.workDate = [dayjs(data.workDate[0]).format("YYYY-MM-DD"),dayjs(data.workDate[1]).format("YYYY-MM-DD")];
    console.log(data);
    // 新增
    if(!id){
      const rs = await axios.post("/eps/nds_resume_work",data);
      console.log("rs",rs);
    } else {
      const rs = await axios.put("/eps/nds_resume_work",{
        ...data,
        id
      });
      console.log("rs",rs);
    }
  };
  const submitFormData5 = async(id?: number | string)=>{
    const data = await formFour.getFieldsValue();
    data.workDate = [dayjs(data.workDate[0]).format("YYYY-MM-DD"),dayjs(data.workDate[1]).format("YYYY-MM-DD")];
    console.log(data);
    // 新增
    if(!id){
      const rs = await axios.post("/eps/nds_resume_project",data);
      console.log("rs",rs);
    } else {
      const rs = await axios.put("/eps/nds_resume_project",{
        ...data,
        id
      });
      console.log("rs",rs);
    }
  };
  const submitFormData6 = async(id?: number | string)=>{
    const data = await formFive.getFieldsValue();
    data.workDate = [dayjs(data.workDate[0]).format("YYYY-MM-DD"),dayjs(data.workDate[1]).format("YYYY-MM-DD")];
    console.log(data);
    // 新增
    if(!id){
      const rs = await axios.post("/eps/nds_resume_education",data);
      console.log("rs",rs);
    } else {
      const rs = await axios.put("/eps/nds_resume_education",{
        ...data,
        id
      });
      console.log("rs",rs);
    }
  };
  const postCategoryDataCb = () => {};
  const industryCategoryDataCb = () => {};
  // 设置form data
  const setFormData1 = (type: string, value: string | number) => {
    console.log("=>",type, value);
    formOne.setFieldValue(type,value);
    setFormOneData({
      ...formOneData,
      [type]:value
    });
  };
  const setFormData2 = (type: string, value: string | number) => {
    console.log("=>",type, value);
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
  const getInit = ()=>{
    data1();
  };
  React.useEffect(()=>{
    getInit();
  },[]);
  // 查看个人
  const data1 = async()=>{
    const data = {
      pageNum:1,
      pageSize:10,
      param:{
        resumeIds:["1601142715991904258"]
      }
    };
    const {data:rs} = await axios.post("/eps/nds_resume/list",data);
    const newR = {
      name:1,
      jobMent:1,
      // birthday:,dayjs("2022-12-11")],
      birthday:dayjs("2022-12-08"),
      // salaryExpectation:["1","3"],
      sex:"1",
      wx:1,
      email:1,
      phone:1,
      workTime:dayjs("2022-12-08"),
      jobIdentity:"1",
    };
    setFormOneData(newR);
  };
  const data2 = async()=>{
    const data = {
      pageNum:1,
      pageSize:10,
      param:{
        
      }
    };
    const rs = await axios.post("/eps/nds_resume/list",data);
    console.log("rs",rs);
  };
  return (
    <div className="resumeM_layout1">
      <Header />
      <div className="resumeM_lists">
        <div className="resumeM_lists_content">
          <div className="resumeM_lists_content_left">
            {/* 锚点 */}
            <Anchor className="resumeM_lists_content_left_anchor">
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
                      <span className="part-1_title">{formOneData.name}</span>
                      <div className="part-1_workInfo">
                        <span>5年工作经验</span>
                        <span>本科-全日制</span>
                        <span>离职-随时到岗</span>
                        <span>2016-8参加工作</span>
                      </div>
                      <div  className="part-1_call">
                        <img src={LOGO} alt="" />
                        <span>13547822899</span>
                        <img src={LOGO} alt="" />
                        <span>1354782</span>
                        <img src={LOGO} alt="" />
                        <span>1354782@qq.com</span>
                      </div>
                 
                    </div>
                    <div className="resumeM_lists_content_left_resume_card_right">
                      <img className="part-1_logo" src={LOGO} alt="" />
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
                      <Form.Item label="手机号码" name="phone" rules={[{ required: true, message:"请输入姓名"},{validator:inputValidator }]}>
                        <Input placeholder="请输入手机号码" />
                      </Form.Item>
                      <Form.Item label="出生日期" name="birthday"rules={[{ required: true, message:"请选择出生日期"}]}>
                        <DatePicker placeholder="请选择时间" />
                      </Form.Item>
                      <Form.Item label="微信" name="wx" rules={[{ required: true, message:"请输入姓名"},{validator:inputValidator }]}>
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
                      <Form.Item label="邮箱" name="email" rules={[{ required: true, message:"请输入姓名"},{validator:inputValidator }]}>
                        <Input placeholder="请输入微信" />
                      </Form.Item>
                  
                      <Form.Item label="参加工作时间" name='workTime' rules={[{ required: true, message:"请填写参加工作时间"  }]}>
                        <DatePicker placeholder="请选择时间" />
                      </Form.Item>
                      <Form.Item className="formItemTwo">
                        <Button onClick={()=>setEdit1(false)}>取消</Button>
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
                      <TextArea value={merit} onChange={(e)=>setMerit(e.target.value)} />
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
                        formTwoDataList.map((item,index) => {
                          return <div key={index} className="part-3_workInfo">
                            <span>{item.postCategoryCode}</span>
                            <span>{item.salaryExpectation[0]}-{item.salaryExpectation[1]}</span>
                            <span>{item.postCategoryName}</span>
                            <span>{item.workCityName}</span>
                          </div>;
                        })
                      }
                    </div>
                    <div className="resumeM_lists_content_left_resume_card_right">
                      <div className="part-3_span" onClick={()=>setEdit3(true)}><img className="part-3_icon" src={LOGO} alt="" />添加</div>
                      <div className="part-3_list">
                        <div className="part-3_list_span" onClick={()=>setEdit3(true)}><img className="part-3_icon" src={LOGO} alt="" />编辑</div>
                        <div className="part-3_list_span"><img className="part-3_icon" src={LOGO} alt="" />删除</div>
                      </div>
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
                        <Form.Item label="求职类型" name="wantedType" rules={[{ required: true, message:"请选择期望职位"}]}>
                          <div onChange={()=>{}} className="formRadio">
                            <div
                              className={classnames("formRadio_item",
                                {
                                  formRadio_active:formTwoData.wantedType === "1"
                                }
                              )}
                              onClick={()=>setFormData2("wantedType","1")}
                            >全职</div>
                            <span className="formRadio_empty"></span>
                            <div 
                              className={classnames("formRadio_item",
                                {
                                  formRadio_active:formTwoData.wantedType === "2"
                                }
                              )}
                              onClick={()=>setFormData2("wantedType","2")}
                            >兼职</div>
                          </div>
                        </Form.Item>
                        <Form.Item label="期望城市" name="workCityCode" rules={[{ required: true, message:"请选择城市" }]}>
                          <Select placeholder="请选择城市">
                            {expectedCityData().map(item => <Select.Option key={`&2_${item.id}`} value={item.id}>{item.value}</Select.Option>)}
                          </Select>
                        </Form.Item>
                        <Form.Item label="期望职位" name="postCategoryCode" rules={[{ required: true, message:"请选择期望职位"}]}>
                          <DoubleTree data={postCategoryData} cb={postCategoryDataCb} />
                        </Form.Item>
                        <Form.Item label="期望行业" name="industryCategoryCode"  rules={[{ required: true, message:"请选择行业"}]}>
                          <SingleTree data={industryCategoryData} cb={industryCategoryDataCb} />
                        </Form.Item>
                        <Form.Item label="期望薪资" name="salaryExpectation" rules={[{ required: true, message:"请选择期望薪资"}]} >
                          <SalaryExpectation formData={formTwo} onChange={(i:any) => {console.log(i);}}/>
                        </Form.Item>
                      </Form>
                      <Button onClick={()=>setEdit3(false)}>取消</Button>
                      <Button onClick={()=>submitFormData3()}>完成</Button>
                    </div>
                  </div>
                }
                
              </section>
              {/* 工作经历 */}
              <section id="part-4" className="resumeM_lists_content_left_resume_work">
                <div className="part-4_title">
                  <span>工作经历</span>
                  {!edit4 && <div className="part-4_title_span" onClick={()=>setEdit4(true)}><img className="part-4_title_span_icon" src={LOGO} alt="" />编辑</div>}
                </div>
                {
                  !edit4 && <React.Fragment>
                    {/* list */}
                    <div className="part-4_card">
                      <div className="part-4_card_title">
                        <span className="part-4_card_title_name">武汉德特云才数字科技有限公司</span>
                        <span className="part-4_card_title_time">2018-10 至 今</span>
                        <div className="part-4_card_title_list">
                          <div className="part-4_card_title_list_span"><img className="part-4_card_title_list_span_icon" src={LOGO} alt="" />编辑</div>
                          <div className="part-4_card_title_list_span"><img className="part-4_card_title_list_span_icon" src={LOGO} alt="" />删除</div>
                        </div>
                      </div>
                      <div className="part-4_card_post">高级Java工程师</div>
                      <div className="part-4_card_workList">工作内容</div>
                      <div className="part-4_card_workContent">
                      123
                      </div>
                    </div>
                    <div className="part-4_card">
                      <div className="part-4_card_title">
                        <span className="part-4_card_title_name">武汉德特云才数字科技有限公司</span>
                        <span className="part-4_card_title_time">2018-10 至 今</span>
                        <div className="part-4_card_title_list">
                          <div className="part-4_card_title_list_span"><img className="part-4_card_title_list_span_icon" src={LOGO} alt="" />编辑</div>
                          <div className="part-4_card_title_list_span"><img className="part-4_card_title_list_span_icon" src={LOGO} alt="" />删除</div>
                        </div>
                      </div>
                      <div className="part-4_card_post">高级Java工程师</div>
                      <div className="part-4_card_workList">工作内容</div>
                      <div className="part-4_card_workContent">
                      123
                      </div>
                    </div>

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
                        <Form.Item label="公司名称	" name="companyName" rules={[{ required: true, message:"请输入姓名"},{validator:inputValidator }]}>
                          <Input placeholder="请输入姓名" />
                        </Form.Item>
                        <Form.Item label="期望行业" name="industryCategoryCode"  rules={[{ required: true, message:"请选择行业"}]}>
                          <SingleTree data={industryCategoryData} cb={industryCategoryDataCb} />
                        </Form.Item>
                        <Form.Item label="担任职位" name="postCategoryCode" rules={[{ required: true, message:"请选择期望职位"}]}>
                          <DoubleTree data={postCategoryData} cb={postCategoryDataCb} />
                        </Form.Item>
                        <Form.Item label="在职时间" name="workDate" rules={[{ required: true, message:"请选择期望职位"}]}>
                          <RangePicker />
                        </Form.Item>
                        <Form.Item label="汇报对象" name="reportingObject" rules={[{ required: true, message:"请输入姓名"},{validator:inputValidator }]}>
                          <Input placeholder="请输入姓名" />
                        </Form.Item>
                        <Form.Item label="工作内容" name="workContent" rules={[{ required: true, message:"请输入姓名"},{validator:inputValidator }]}>
                          <TextArea />
                        </Form.Item>
                      </Form>
                      <Button onClick={()=>setEdit4(false)}>取消</Button>
                      <Button onClick={()=>submitFormData4()}>完成</Button>
                    </div>
                  </div>
                }
              </section>
              {/* 项目经历 */}
              <section id="part-5" className="resumeM_lists_content_left_resume_work">
                <div className="part-5_title">
                  <span>项目经历</span>
                  {!edit5 && <div className="part-4_title_span" onClick={()=>setEdit5(true)}><img className="part-4_title_span_icon" src={LOGO} alt="" />编辑</div>}
                </div>
                {!edit5  && <React.Fragment>
                  {/* list */}
                  <div className="part-5_card">
                    <div className="part-5_card_title">
                      <span className="part-5_card_title_name">数字人才服务平台</span>
                      <span className="part-5_card_title_time">2018-10 至 今</span>
                    </div>
                    <div className="part-5_card_post">高级Java工程师</div>
                    <div className="part-5_card_workList">工作内容</div>
                    <div className="part-5_card_workContent">
                      123
                    </div>
                  </div>
                </React.Fragment>
                }
                {edit5 && <div className="part-5_card">
                  <Form
                    layout={"vertical"}
                    form={formFour}
                    initialValues={{ layout: "vertical",...formFourData }}
                    className="jobWanted_options_layout_cartTop_content_right_form"
                  >
                    <Form.Item label="项目名称" name="companyName" rules={[{ required: true, message:"请输入姓名"},{validator:inputValidator }]}>
                      <Input placeholder="请输入姓名" />
                    </Form.Item>
                    <Form.Item label="项目角色" name="projectPost"  rules={[{ required: true, message:"请选择行业"}]}>
                      <DoubleTree data={postCategoryData} cb={postCategoryDataCb} />
                    </Form.Item>
                    <Form.Item label="项目时间" name="workDate" rules={[{ required: true, message:"请选择期望职位"}]}>
                      <RangePicker placeholder="请选择出生日期" />
                    </Form.Item>
                    <Form.Item label="项目描述" name="projectDesc" rules={[{ required: true, message:"请输入姓名"},{validator:inputValidator }]}>
                      <TextArea />
                    </Form.Item>
                  </Form>
                  <Button onClick={()=>setEdit5(false)}>取消</Button>
                  <Button onClick={()=>submitFormData5()}>完成</Button>
                </div>}
               
              </section>
              <section id="part-6" className="resumeM_lists_content_left_resume_work">
                <div className="part-6_title">
                  <span>教育经历</span>
                  {!edit6 && <div className="part-4_title_span" onClick={()=>setEdit6(true)}><img className="part-4_title_span_icon" src={LOGO} alt="" />编辑</div>}
                </div>
                {!edit6  && <React.Fragment>
                  {/* list */}
                  <div className="part-6_card">
                    <div className="part-6_card_title">
                      <span className="part-6_card_title_name">数字人才服务平台</span>
                      <span className="part-6_card_title_time">2018-10 至 今</span>
                    </div>
                    <div className="part-6_card_title">
                      <span className="part-6_card_title_major">软件工程</span>
                      <span className="part-6_card_title_time">本科-全日制</span>
                    </div>
                  </div>
                </React.Fragment>
                }
                {edit6 && <div className="part-6_card">
                  <Form
                    layout={"vertical"}
                    form={formFive}
                    initialValues={{ layout: "vertical",...formFiveData }}
                    className="jobWanted_options_layout_cartTop_content_right_form"
                  >
                    <Form.Item label="学校名称" name="schoolName" rules={[{ required: true, message:"请输入姓名"},{validator:inputValidator }]}>
                      <Input placeholder="请输入姓名" />
                    </Form.Item>
                    <Form.Item label="求职类型" name="educationType" rules={[{ required: true, message:"请输入姓名"},{validator:inputValidator }]}>
                      <div onChange={()=>{}} className="formRadio">
                        <div
                          className={classnames("formRadio_item",
                            {
                              formRadio_active:formFiveData.educationType === "1"
                            }
                          )}
                          onClick={()=>setFormData6("educationType","1")}
                        >全日制</div>
                        <span className="formRadio_empty"></span>
                        <div
                          className={classnames("formRadio_item",
                            {
                              formRadio_active:formFiveData.educationType === "2"
                            }
                          )}
                          onClick={()=>setFormData6("educationType","2")}
                        >非全日制</div>
                      </div>
                    </Form.Item>
                    <Form.Item label="学历" name="education">
                      <Select placeholder="请选择学历" 
                      >
                        {educationData().map(item => <Select.Option key={`&1_${item.id}`} value={item.id}>{item.value}</Select.Option>)}
                      </Select>
                    </Form.Item>
                    <Form.Item label="专业" name="major">
                      <Input placeholder="如：计算机" />
                    </Form.Item>
                    <Form.Item label="时间" name="workDate" rules={[{ required: true, message:"请选择期望职位"}]}>
                      <RangePicker placeholder="请选择出生日期" />
                    </Form.Item>
                    <Form.Item className="career"> </Form.Item>
                    <Form.Item label="在校经历" name="projectDesc" rules={[{ required: true, message:"请输入姓名"},{validator:inputValidator }]}>
                      <TextArea />
                    </Form.Item>
                  </Form>
                  <Button onClick={()=>setEdit6(false)}>取消</Button>
                  <Button onClick={()=>submitFormData6()}>完成</Button>
                </div>}
              </section>
              <section id="part-7" className="resumeM_lists_content_left_resume_work">
                <div className="part-7_title">
                  <span>资格证书</span>
                </div>
                {/* list */}
                <div className="part-7_card">
                  <div className="part-7_card_title">
                    <span className="part-7_card_title_name">数字人才服务平台</span>
                    <span className="part-7_card_title_time">2018-10 至 今</span>
                  </div>
                  <div className="part-7_card_title">
                    <span className="part-7_card_title_name">数字人才服务平台</span>
                    <span className="part-7_card_title_time">2018-10 至 今</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className="resumeM_lists_content_right">
            <PersonalInfoCard />
            <Login />
            <ResumeManagementCard />
            <BrowseInformationCard />
          </div>
        </div> 
      </div> 
    </div>
  );
};

const mapStateToProps = function (state: CombinedState): CounterState {
  return state.counter;
};

export default connect(mapStateToProps, actions)(ResumeManagement);