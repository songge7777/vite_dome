import * as React from "react";
import call from "@/img/call.png";
import "@/styles/pages/upload.scss";
import axios from "@/api/axios";

/**
 *  头像上传
 * 
 */ 
type Props = {
  cbResult: (_: any)=>void,
  src: string
}
const Upload:React.FC = (props:Props) => {
  const { cbResult,src } = props;
  const handleChange = async(event:any) => {
    const currentFile = event.target.files[0];
    const imgUrl =  await createUrl(currentFile);
    const data = await handleUpload(currentFile);
    cbResult(data);
  };
  const allowUpload = (currentFile) => {
    const _fileType = currentFile.type; // type: "image/jpeg"
    const _validDefaultFileTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "video/mp3",
    ];
    const _validDefaultFileSize = 1024 * 1024 * 1024 * 2;
    const fileSize =_validDefaultFileSize;
    const validFileTypes = [..._validDefaultFileTypes];
    const isLessThan2G = currentFile.size < fileSize;
    return validFileTypes.includes(_fileType) && isLessThan2G;
  };
  const handleUpload = async(currentFile) => {
    if (!currentFile) {
      return {
        status: -1,
        message: "你尚未选择文件",
      };
    }
    if (!allowUpload(currentFile)) {
      return {
        status: -2,
        message: "不支持本类型文件上传或图片太大",
      };
    }
    const formData = new FormData();
    formData.append("file", currentFile);
    const { data } = await axios({
      url: "/res/file/upload",
      method: "POST",
      data: formData,
    });
    console.log("上传成功的数据", data);
    return data;
  };
  const createUrl = (currentFile) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        resolve(reader.result);
      });
      reader.readAsDataURL(currentFile);
    });
  };
  return (
    <div className="layout_upload">
      <img src={src} />
      <input type="file" className="layout_upload_file" onChange={handleChange} />
    </div>
  );
};
export default Upload;