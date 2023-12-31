import * as React from "react";
import "@/styles/components/home/doubleTree.scss";
import inputRight from "@/img/inputRight.png";
import classnames from "classnames";
import {
  Input,
} from "antd";

type baseC  = {
  code: string;
  name:string;
  children:baseC[]
}

type TProps = {
  data:baseC[];
  onChange?:()=>{},
  name:string,
  value: string,
  placeholder: string,
  cb:()=>{}
}

const SingleTree:React.FC = (props:TProps) => {
  const {value,data,cb,onChange,name,placeholder} = props;
  const [show,setShow] = React.useState(false);
  const [current,setCurrent] = React.useState({});
  const [currentValue,setCurrentValue] = React.useState();
  const changeIndex = (item:any) => {
    setCurrent(item);
  };
  const clickCurrent = (item) => {
    onChange && onChange(item.code);
    cb(item);
    setCurrentValue(item.name);
    setShow(false);
  };
  React.useEffect(()=>{
    setCurrentValue(name);
  },[]);
  return <div className="custom_select">
    {/* 下拉 */}
    <Input value={value && currentValue} placeholder={placeholder}  onClick={()=>{setShow(!show);}} />
    {show &&<div className="custom_select_layout">
      <div className="custom_select_layout_title">
        <span>选择行业</span>
        <span onClick={()=>{setShow(!show);}}>x</span>
      </div>
      <article className="custom_select_layout_flex">
        {/* list */}
        {
          data.length> 0 &&<section className="custom_select_layout_flex_list">
            {data.map((item,index) => {
              return (
                <div
                  className={classnames("custom_select_layout_flex_list_item",{
                    " custom_select_layout_flex_list_active": item.code === current.code
                  })}
                  key={item.code}
                  onClick={()=>changeIndex(item)}
                >
                  <span key={item.code}>{item.name}</span>
                  <img src={inputRight} alt="" />
                </div>
              );
            })}
          </section>
        }
        {/* select */}
        {
          <section className="custom_select_layout_flex_select">
            {Array.isArray(current.children) && current.children.map(item => <span onClick={() => clickCurrent(item)} key={item.code}>{item.name}</span>)}
          </section>
        }
      </article>
    </div>}
  </div>;
};
export default SingleTree;