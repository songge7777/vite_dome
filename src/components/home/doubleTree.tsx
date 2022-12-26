import * as React from "react";
import "@/styles/components/home/doubleTree.scss";
import inputRight from "@/img/inputRight.png";
import classnames from "classnames";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
} from "antd";

type baseC  = {
  code: string;
  name:string;
  children:baseC[]
}

type TProps = {
  data:baseC[];
  inputNode:React.ReactNode;
  single: boolean;
  value?:String,
  onChange?:()=>{},
  cb:()=>{}
}

const DoubleTree:React.FC = (props:TProps) => {
  const {data,cb,inputNode,single,onChange,name} = props;
  console.log("DoubleTree",data);
  const [show,setShow] = React.useState(false);
  const [secondData,setSecondData] = React.useState([]);
  const [current,setCurrent] = React.useState({});
  const [currentValue,setCurrentValue] = React.useState();
  const changeFirst =  (item:any) => {
    if(item.children && item.children.length>0){
      setSecondData(item.children);
    }else{
      setShow(false);
      cb(item);
    }
  };
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
    <div onClick={()=>{setShow(!show);}} >
      {inputNode ? inputNode :<Input value={currentValue} />}
    </div>
    {show &&<div className={classnames("custom_select_layout",{
      "custom_select_NoSingle": !single 
    })}>
      <div className="custom_select_layout_title">
        <span>选择职位</span>
        <span>x</span>
      </div>
      <article className="custom_select_layout_flex">
        {/* list */}
        {
          data && data.length> 0 &&<section className="custom_select_layout_flex_list">
            {data.map((item,index) => {
              return (
                <div
                  className={classnames("custom_select_layout_flex_list_item",{
                    " custom_select_layout_flex_list_active": item.code === current.code
                  })}
                  key={item.code}
                  onClick={()=>changeFirst(item)}
                >
                  <span className="custom_select_layout_flex_list_item_name" key={item.code}>{item.name}</span>
                  {item.children &&<img src={inputRight} alt="" />}
                </div>
              );
            })}
          </section>
        }
        {
          secondData.length> 0 &&<section className="custom_select_layout_flex_list">
            {secondData.map((item,index) => {
              return (
                <div
                  className={classnames("custom_select_layout_flex_list_item",{
                    " custom_select_layout_flex_list_active": item.code === current.code
                  })}
                  key={item.code}
                  onClick={()=>changeIndex(item)}
                >
                  <span className="custom_select_layout_flex_list_item_name" key={item.code}>{item.name}</span>
                  <img src={inputRight} alt="" />
                </div>
              );
            })}
          </section>
        }
        {/* select */}
        {
          !single && <section className="custom_select_layout_flex_select">
            {Array.isArray(current.children) && current.children.map(item => <span onClick={() => clickCurrent(item)} key={item.code}>{item.name}</span>)}
          </section>
        }
      </article>
    </div>}
  </div>;
};
export default DoubleTree;