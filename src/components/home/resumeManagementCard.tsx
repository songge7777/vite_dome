import * as React from "react";
import "@/styles/pages/resumeManagementCard.scss";
import LOGO from "@/img/LOGO.png";
import offerp from "@/img/offerp.png";
import offerw from "@/img/offerw.png";
import type { UploadProps } from "antd";
import {
  Button,
  Upload,
  Modal,
  message,
} from "antd";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  accept: ".word,.pfd",
  multiple: true,
  action: "http://192.168.0.139:8088/sys/file/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const FileUpload:React.FC = () => {
  return <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      {/* <InboxOutlined /> */}
    </p>
    <p className="ant-upload-text">上传附件简历，支持文档格式（pdf、word文档） 文件大小不超过10M</p>
    <p className="ant-upload-hint">
      <Button>上传附件简历</Button>
    </p>
  </Dragger>;
};

const resumeManagementCard = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <section className="resumeManagement_layout">
      {/* title */}
      <div className="resumeManagement_title">
        简历管理
      </div>
      {/* 简历列表 */}
      <section  className="resumeManagement_list">
        <div className="resumeManagement_list_item ">
          <img className="resumeManagement_list_item_img" src={offerw} alt="" />
          <span className="resumeManagement_list_item_name">xxxx.word</span>
        </div>
        <div className="resumeManagement_list_item resumeManagement_list_active">
          <img className="resumeManagement_list_item_img" src={offerw} alt="" />
          <span className="resumeManagement_list_item_name">xxxx啊实打实的撒大苏打实打实打算xxxxxxxx.word</span>
        </div>
        <div className="resumeManagement_list_item ">
          <img className="resumeManagement_list_item_img" src={offerw} alt="" />
          <span className="resumeManagement_list_item_name">xxxx.word</span>
        </div>
      </section>
      {/* 按钮 */}
      <section  className="resumeManagement_bottom">
        <Button onClick={()=>showModal()}>上传简历</Button>
      </section>
      <Modal title="简历上传" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <FileUpload />
      </Modal>
    </section>
  );
};
export default resumeManagementCard;