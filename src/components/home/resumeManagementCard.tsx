import * as React from "react";
import "@/styles/pages/resumeManagementCard.scss";
import LOGO from "@/img/LOGO.png";
import offerp from "@/img/offerp.png";
import offerw from "@/img/offerw.png";
import type { UploadProps } from "antd";
import axios from "@/api/axios";
import {
  Button,
  Upload,
  Modal,
  message,
} from "antd";

const { Dragger } = Upload;

const FileUpload:React.FC = () => {
  
 
  const postData = async(rs) => {
    const {data} = await axios.post("/cpe/resume/file",rs);
    console.log(data);
  };
  const props: UploadProps = {
    name: "file",
    accept: "*",
    multiple: true,
    action: "http://192.168.0.139:8088/sys/file/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        console.log(info.file.response);
        const {data} = info.file.response;
        console.log("data",data);
        const rs = {
          fileUrl:data.fileUrl,
          fileId:data.id,
          fileName:data.originalName,
          resumeId:"1601142715991904258"
        };
        postData(rs);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return <Dragger {...props}>
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
  const deleteFn = async(id) => {
    const {data} = await axios.delete(`/cpe/resume/file?id=${id}`);
    console.log("deleteFn",data);
    console.log(id);
  };

  const initData = async() => {
    const {data} = await axios.get("/cpe/resume/file/list");
    setDataItem(data.data);
    console.log("1===>",data);
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
        {
          dataItem && dataItem.map((item,index) =><div key={index} onClick={()=>deleteFn(item.id)} className="resumeManagement_list_item ">
            <img className="resumeManagement_list_item_img" src={item.fileUrl} alt="" />
            <span className="resumeManagement_list_item_name">{item.fileName}</span>
          </div>)
        } 
      </section>
      {/* 按钮 */}
      {dataItem && dataItem.length >2 ? "": <section  className="resumeManagement_bottom">
        <Button onClick={()=>showModal()}>上传简历</Button>
      </section>} 
      <Modal title="简历上传" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <FileUpload />
      </Modal>
    </section>
  );
};
export default resumeManagementCard;