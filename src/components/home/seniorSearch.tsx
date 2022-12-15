import * as React from "react";
import "@/styles/pages/inputSearch.scss";
import DoubleTree from "@/components/home/doubleTree";
import selectStyle from "@/img/selectStyle.png";
import axios from "@/api/axios";

import {
  Input,
  Button,
} from "antd";

type Props = {
  cb: (_:{})=>{}
}
const InputSearch:React.FC = (props:Props) => {
  const { cb } = props;
  const [postCategoryData, setPostCategoryData]=React.useState([]);
  const [searchItem, setSearchItem] = React.useState({});
  const [searchValue, setSearchValue] = React.useState("");
  
  const getPostCategory = async() => {
    const data = [
      {
        code: "1",
        name:"武汉"
      },
      {
        code: "2",
        name:"北京"
      },
      {
        code: "3",
        name:"上海"
      },
      {
        code: "4",
        name:"广州"
      },
      {
        code: "5",
        name:"深圳"
      },
      {
        code: "6",
        name:"杭州"
      },
      {
        code: "7",
        name:"天津"
      },
      {
        code: "8",
        name:"西安"
      },
      {
        code: "9",
        name:"苏州"
      },
    ];
    setPostCategoryData(data);
  };
  // 获取数据
  const getData = async()=>{
    getPostCategory();
  };
  const postCategoryDataCb = (item) => {
    setSearchItem(item);
    const data = {
      select: item,
      value: searchValue
    };
    cb(data);
  };
  const submit = () => {
    const data = {
      select: {
        name: searchItem.name,
        code: searchItem.code,
      },
      value:searchValue
    };
    cb(data,"submit");
  };
  const inputChange = (e)=>{
    setSearchValue(e.target.value);
    /**
     * select 下拉的数据
     * value 输入的数据
     */
    const _data = {
      select: {
        name: searchItem.name,
        code: searchItem.code,
      },
      value: e.target.value
    };
    cb(_data);
  };
  React.useEffect(()=>{
    getData();
  },[]);
  return (
    <section className="inputSearch">
      <Input.Group compact>
        <div className="inputSearch_selectOption">
          {/* <DoubleTree  single={true} data={postCategoryData} cb={postCategoryDataCb} inputNode={<div className="inputSearch_selectOption_item">
            { searchItem&&searchItem.name ? <span className="inputSearch_selectOption_item_text">{searchItem.name}</span>:<React.Fragment>
              <span>岗位类型</span>
              <img src={selectStyle} alt="" />
            </React.Fragment>}
          </div>} /> */}
          <DoubleTree  single={true} data={postCategoryData} cb={postCategoryDataCb} inputNode={<div className="inputSearch_selectOption_item">
            {<React.Fragment>
              <span>{searchItem.name ? searchItem.name: "岗位类型"}</span>
              <img src={selectStyle} alt="" />
            </React.Fragment>}
          </div>} />
        </div>
        <Input className="inputSearch_input" value={searchValue} onChange={inputChange} placeholder="搜索职位、公司"/>
        <Button className="inputSearch_btn" type="primary" onClick={()=>submit()}>Submit</Button>
      </Input.Group>
    </section>
  );
};
export default InputSearch;