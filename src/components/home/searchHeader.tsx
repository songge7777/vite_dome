import * as React from "react";
import "@/styles/components/home/searchHeader.scss";
import SingleTree from "@/components/home/singleTree";
import DoubleTree from "@/components/home/doubleTree";
import SeniorSearch from "@/components/home/seniorSearch";
import {
  searchCityData,
  educationalRequirementsDta,
  moneyList,
  companySize,
  financingStage,
  workExperience } from "@/utils/optionList";
import classnames from "classnames";
import {
  DatePicker,
  Select
} from "antd";
import axios from "@/api/axios";

type Props ={
  cb:()=>{}
}

const SearchHeader:React.FC =  (props:Props) =>{
  const {cb} = props;
  const initData = () =>({
    // 工作地点-市code	
    workAddrCityCode:"420100",
    // 输入条件	
    search:undefined,
    // 学历
    education:undefined,
    // 薪资待遇
    // 最小范围
    salaryMin	: undefined,
    // 最大范围
    salaryMax	: undefined,
    // 工作经验
    workExperience:undefined,
    // 职位
    postCategory:undefined,
    // 行业分类
    industryCategory:undefined,
    // 公司规模
    companyScale:undefined,
    // 融资阶段
    financingStage:undefined,
    // 输入的value
    inputValue: undefined,
  });
  const [industryCategoryData, setIndustryCategoryData]=React.useState([]);
  const [postCategoryData, setPostCategoryData]=React.useState([]);
  const [searchData, setSearchData] = React.useState(initData());
  const [show, setShow] = React.useState(true);
  const [postCategoryShowList,setPostCategoryShowList] = React.useState<{}[]>([]);
  const [industryCategoryShowList,setIndustryCategoryShowList] = React.useState<{}[]>([]);
  const changeDataFn = (type: string,n:string|string[]) => {
    setSearchData({
      ...searchData,
      [type]:n
    });
  };
  const submitSearchData = async() => {
    cb(searchData);
  };
  
  const cleanBtn = () => {
    setSearchData(initData());
  };

  const filterContentFn = (data:{id:number|string,value: string}[], id:string|[]) => {
    // 薪资待遇 特殊处理 要删掉
    if(data.length && Array.isArray(id)){
      const isArr =id.every(i => Number(i)>0);
      if(!isArr) return "";
      const rs = id.map(i => filterContentFn(data,i)); 
      return rs.join(" - ");
    }
    // 常规处理
    if(data.length && id){
      return data.filter( i => String(i.id) === String(id))[0].value;
    } else {
      return "";
    }
  };
  const filterRenderFn = ():React.ReactNode|string => {
    // // 工作地点-市code	
    // workAddrCityCode:"",
    // // 输入条件	
    // search:"",
    // // 学历
    // education:"",
    // // 薪资待遇
    // salary:["",""],
    // // 工作经验
    // workExperience:"",
    // // 职位
    // postCategory:"",
    // // 行业分类
    // industryCategory:"",
    // // 公司规模
    // companyScale:"",
    // // 融资阶段
    // financingStage:"",
    const arr = [
      // 工作地点-市code	
      {
        value:searchData.workAddrCityCode,
        data:searchCityData()
      },
      {
        value:searchData.education,
        data:educationalRequirementsDta()
      },
      // 薪资待遇
      {
        value:[searchData.salaryMin,searchData.salaryMax],
        data:moneyList()
      },
      // 工作经验
      {
        value:searchData.workExperience,
        data:workExperience()
      },
      // 职位
      {
        value:searchData.postCategory,
        data:postCategoryShowList
      },
      // 行业分类
      {
        value:searchData.industryCategory,
        data:industryCategoryShowList
      },
      // 公司规模
      {
        value:searchData.companyScale,
        data:companySize()
      },
      // 融资阶段
      {
        value:searchData.financingStage,
        data:financingStage()
      }
    ].map(item => filterContentFn(item.data,item.value));
    return arr.filter(i => i).map((i,index) => <span key={index}>{i}</span>);
  };
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
    getIndustryCategory();
    getPostCategory();
  };
  React.useEffect(()=>{
    getData();
  },[]);
  const industryCategoryDataCb = (item)=>{
    // 临时保存 显示数据
    const data = {
      ...item,
      id: item.code,
      value: item.name
    };
    setIndustryCategoryShowList([data]);
    changeDataFn("industryCategory",String(item.code));
  };
  const postCategoryDataCb = (item:{}) => {
    // 临时保存 显示数据
    const data = {
      ...item,
      id: item.code,
      value: item.name
    };
    setPostCategoryShowList([data]);
    changeDataFn("postCategory",String(item.code));
  };

  const searchList = (item,type) => {
    const {select,value} = item;
    if(select.code){
      // 下拉选中才触发
      changeDataFn("workAddrCityCode",String(select.code));
    }
    if(value){
      changeDataFn("inputValue",String(value));
    }
    // 点击搜索 提交数据
    if(type === "submit"){
      submitSearchData();
    }
  };
  return (
    <article className="search_header_layout">
      <div className="search_header_layout_input">
        <SeniorSearch cb={searchList}/>
      </div>
      <div className="search_header_layout_list">
        <div className="search_header_layout_list_item">
          <span>城市:</span>
          <div className="search_header_layout_list_select">
            { 
              searchCityData().map(item => <span key={item.id}
                className={classnames({"fontActive":String(searchData.workAddrCityCode)===String(item.id)})}
                onClick={()=>{
                  changeDataFn("workAddrCityCode",String(item.id));
                }}
              >{item.value}</span>) 
            }
          </div>
        </div>
        <div className="search_header_layout_list_item">
          <span>学历要求:</span>
          <div className="search_header_layout_list_select">
            { educationalRequirementsDta().map(item => <span key={item.id}
              className={classnames({"fontActive":String(searchData.education)===String(item.id)})}
              onClick={()=>changeDataFn("education",String(item.id))}
            >{item.value}</span>) }
          </div>
        </div>
        <div className="search_header_layout_list_item">
          <span>薪资待遇:</span>
          <div className="search_header_layout_list_selectOption">
            123
            <Select placeholder="请选择"
              onChange={(e)=>{
                changeDataFn("salaryMin",e);
              }}
              value={searchData.salaryMin}
            >
              {moneyList().map(item => <Select.Option key={`&0_${item.id}`} value={item.id}>{item.value}</Select.Option>)}
            </Select>
            <span className="search_header_layout_list_selectOption_empty">-</span>
            <Select placeholder="请选择"
              onChange={(e)=>{
                changeDataFn("salaryMax",e);
              }}
              value={searchData.salaryMax}
            >
              {moneyList().map(item => <Select.Option key={`&0_${item.id}`} value={item.id}>{item.value}</Select.Option>)}
            </Select>
          </div>
        </div>
        {/* 下面为高级搜索 */}
        { show && 
        <React.Fragment>
          <div className="search_header_layout_list_item">
            <span>工作经验:</span>
            <div className="search_header_layout_list_select">
              { workExperience().map(item => <span key={item.id}
                className={classnames({"fontActive":String(searchData.workExperience)===String(item.id)})}
                onClick={()=>changeDataFn("workExperience",String(item.id))}
              >{item.value}</span>) }
            </div>
          </div>
          <div className="search_header_layout_list_item">
            <span>职位:</span>
            <div className="search_header_layout_list_selectOptionItem">
              <DoubleTree data={postCategoryData} cb={postCategoryDataCb} />
            </div>
            <span>行业分类:</span>
            <div className="search_header_layout_list_selectOptionItem">
              <SingleTree data={industryCategoryData} cb={industryCategoryDataCb} />
            </div>
            <span>公司规模:</span>
            <div className="search_header_layout_list_selectOptionItem">
              <Select placeholder="请选择"
                onChange={(e)=>{
                  changeDataFn("companyScale",e);
                }}
                value={searchData.companyScale}
              >
                {companySize().map(item => <Select.Option key={`&0_${item.id}`} value={item.id}>{item.value}</Select.Option>)}
              </Select>
            </div>
            {/* <span>融资阶段:</span>
            <div className="search_header_layout_list_selectOptionItem">
              <Select placeholder="请选择"
                onChange={(e)=>{
                  changeDataFn("financingStage",e);
                }}
                value={searchData.financingStage}
              >
                {financingStage().map(item => <Select.Option key={`&0_${item.id}`} value={item.id}>{item.value}</Select.Option>)}
              </Select>
            </div> */}
          </div>
        </React.Fragment>
        }
        
        <div className="search_header_layout_bottom">
          <span>搜索条件:</span>
          <div className="search_header_layout_bottom_select">
            {filterRenderFn()}
          </div>
          <div className="search_header_layout_bottom_hidden" onClick={()=>{
            setShow(!show);
          }}>
            高级搜索
          </div>
        
          <div className="search_header_layout_bottom_clean" onClick={cleanBtn}>
            x清空筛选
          </div>
        </div>
      </div>
    </article>
  );
};
export default SearchHeader;