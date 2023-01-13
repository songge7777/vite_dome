import * as React from "react";
import "@/styles/pages/resumeManagementCard.scss";
import LOGO from "@/img/LOGO.png";
import offerp from "@/img/offerp.png";
import offerw from "@/img/offerw.png";
import type { UploadProps } from "antd";
import axios from "@/api/axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
import {
  Button,
  Upload,
  Modal,
  message,
  Popover,
} from "antd";

const { Dragger } = Upload;


const floatDiv:React.FC = (item,initData) => {
  const deleteFn = async(id) => {
    const {data} = await axios.delete(`/cpe/resume/file?id=${id}`);
    message.success("删除成功");
    initData();
  };
  return <div className="floatDiv">
    <div className="floatDiv_top">
      <img src={item.fileUrl} alt="" />
      <span>{item.fileName}</span>
    </div>
    <div className="floatDiv_bottom">
      <a href={item.fileUrl}>下载</a>
      <span onClick={()=>deleteFn(item.id)} >删除</span>
    </div>
  </div>;
};
type Props = {
  cb:()=>void
  initData:()=>void
}

const FileUpload:React.FC = (props:Props) => {
  const { cb,initData } = props;
  const postData = async(rs) => {
    const {data} = await axios.post("/cpe/resume/file",rs);
    cb(false);
  };
  const beforeUpload = (file: RcFile) => {
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error("上传大小不能超过10MB!");
    }
    return isLt10M;
  };
  const propsItem: UploadProps = {
    name: "file",
    accept: ".doc,.docx,application/msword,.pdf",
    multiple: true,
    action: `${baseUrl}/res/file/upload`,
    headers:{
      "Hx-Token": sessionStorage.getItem("accessToken")
    },
    beforeUpload,
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        const {data} = info.file.response;
        const rs = {
          fileUrl:data.fileUrl,
          fileId:data.id,
          fileName:data.originalName,
          resumeId:"1601142715991904258"
        };
        postData(rs);
        setTimeout(()=>{
          initData();
        },1000);
        message.success(`${info.file.name} 上传成功`);
      } else if (status === "error") {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };

  return <Dragger {...propsItem}>
    <p className="ant-upload-text">上传附件简历，支持文档格式（pdf、word文档） 文件大小不超过10M</p>
    <p className="ant-upload-hint">
      <Button>上传附件简历</Button>
    </p>
  </Dragger>;
};

const resumeManagementCard = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [dataItem,setDataItem] = React.useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const initData = async() => {
    const {data} = await axios.get("/cpe/resume/file/list");
    if(data.code === 200){
      setDataItem(data.data);
    }
  };
 
  
  
  React.useEffect(()=>{
    initData();
  },[]);
  return (
    <section className="resumeManagement_layout">
      {/* title */}
      <div className="resumeManagement_title">
        简历管理
      </div>
      {/* 简历列表 */}
      <section  className="resumeManagement_list">
        {/*  */}
        {
          dataItem && dataItem.map((item,index) =><Popover key={index}  placement="left" content={floatDiv(item,initData)} trigger="click"> <div className="resumeManagement_list_item ">
            <img className="resumeManagement_list_item_img" src={item.fileUrl} alt="" />
            <span className="resumeManagement_list_item_name">{item.fileName}</span>
          </div>
          </Popover >)
        } 
      </section>
      {/* 按钮 */}
      {dataItem && dataItem.length >0 ? "": <section  className="resumeManagement_bottom">
        <Button onClick={()=>showModal()}>上传简历</Button>
      </section>} 
      {isModalOpen &&<Modal className="hiddenBtn" title="简历上传" open={isModalOpen} onCancel={()=>setIsModalOpen(false)} >
        <FileUpload cb={setIsModalOpen} initData={initData}/>
      </Modal>}
    </section>
  );
};
export default resumeManagementCard;