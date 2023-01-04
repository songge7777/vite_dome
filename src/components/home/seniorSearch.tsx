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
        id:"420100",
        value:"武汉"
      },
      {
        id:"320500",
        value:"苏州"
      },
      {
        id:"610100",
        value:"西安"
      },
      {
        id:"120100",
        value:"天津"
      },
      {
        id:"330100",
        value:"杭州"
      },
      {
        id:"440300",
        value:"深圳"
      },
      {
        id:"440100",
        value:"广州"
      },
      {
        id:"310100",
        value:"上海"
      },
      {
        id:"110100",
        value:"北京"
      }
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
          <div className="inputSearch_selectOption_item">
            {<React.Fragment>
              <span>{"武汉"}</span>
              <img src={selectStyle} alt="" />
            </React.Fragment>}
          </div>
          {/* <DoubleTree  single={true} data={postCategoryData} cb={postCategoryDataCb}
            inputNode={<div className="inputSearch_selectOption_item">
              {<React.Fragment>
                <span>{searchItem.name ? searchItem.name: "岗位类型"}</span>
                <img src={selectStyle} alt="" />
              </React.Fragment>}
            </div>} 
          /> */}
        </div>
        <Input className="inputSearch_input" value={searchValue} onChange={inputChange} placeholder="搜索职位、公司"/>
        <Button className="inputSearch_btn" type="primary" onClick={()=>submit()}>搜索</Button>
      </Input.Group>
    </section>
  );
};
export default InputSearch;