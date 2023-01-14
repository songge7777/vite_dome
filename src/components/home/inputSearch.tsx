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
  const postCategoryDataCb = (item) => {
    setSearchItem(item);
  };
  const getPostCategory = async() => {
    const {data} = await axios.get("/sys/post_category/cache_tree");
    setPostCategoryData(data.data);
  };
  // 获取数据
  const getData = async()=>{
    getPostCategory();
  };
  const submit = () => {
    const data = {
      value: searchValue,
      code: searchItem.code,
    };
    cb(data,"submit");
  };
  const  inputChange = (e)=>{
    setSearchValue(e.target.value);
  };
  React.useEffect(()=>{
    getData();
  },[]);
  return (
    <section className="inputSearch">
      <Input.Group compact>
        <div className="inputSearch_selectOption">
          <DoubleTree data={postCategoryData} cb={postCategoryDataCb} inputNode={<div className="inputSearch_selectOption_item">
            { searchItem&&searchItem.name ? <span className="inputSearch_selectOption_item_text">{searchItem.name}</span>:<React.Fragment>
              <span>岗位类型</span>
              <img src={selectStyle} alt="" />
            </React.Fragment>}
          </div>} />
        </div>
        <Input className="inputSearch_input" value={searchValue} onChange={inputChange} placeholder="搜索职位、公司"/>
        <Button className="inputSearch_btn" type="primary" onClick={()=>submit()}>搜索</Button>
      </Input.Group>
    </section>
  );
};
export default InputSearch;