import * as React from "react";
import uploadIcon from "@/img/upload.png";
import "@/styles/pages/noticeOffer.scss";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

import {
  Button,
  Modal,
  Input,
  Upload,
  message
} from "antd";
import axios from "@/api/axios";

/**
 * 我的面试
 * 
 */
type Props= {
  data:{},
  cb:()=>void
};
const NoticeOffer = (props:Props) =>{
  const {data,cb} = props;
  const [dataItem, setDataItem] = React.useState({});
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [inductionId,setInductionId] = React.useState("");
  // 身份证图片
  const [fileListIDFront,setFileListIDFront]= React.useState<UploadFile[]>([]);
  // 身份证图片
  const [fileListIDBack,setFileListIDBack]= React.useState<UploadFile[]>([]);
  // 毕业证书
  const [fileListGraduation, setFileListGraduation] = React.useState<UploadFile[]>([]);
  // 离职证书
  const [fileListQuit, setFileListQuit] = React.useState<UploadFile[]>([]);
  // 体检报告
  const [fileListPhysical , setFileListPhysical ] = React.useState<UploadFile[]>([]);
  // 其他资料
  const [fileListOther, setFileListOther] = React.useState<UploadFile[]>([]);
  // 接受面试
  const accept = async(recordId:number) => {
    const rs =await  axios.put("/cpe/post/employ/accept",{recordId});
    console.log("rs",rs);
    cb();
  };
 
  // 拒绝面试
  const refuse = async(recordId:number) => {
    const rs =await  axios.put("/cpe/post/employ/refuse",{recordId});
    console.log("rs",rs);
    cb();
  };
  const look = ()=>{};
  const upload = async(item)=>{
    setInductionId(item.inductionId);
    const _inductionId = item.inductionId;
    // 查看入职资料
    const { data:rs } = await axios.get(`/cpe/post/induction/gen/${_inductionId}`);
    const data = rs.data;
    console.log("data=->",data);
    console.log("identityAnnexList",data);
    data.identityAnnexList[0] && setFileListIDFront([data.identityAnnexList[0]].map(i => ({...i,url:i.fileUrl,uid:i.id})));
    data.identityAnnexList[1] && setFileListIDBack([data.identityAnnexList[1]].map(i => ({...i,url:i.fileUrl,uid:i.id})));
    setFileListGraduation(data.diplomaAnnexList.map(i => ({...i,url:i.fileUrl,uid:i.id})));
    setFileListQuit(data.departAnnexList.map(i => ({...i,url:i.fileUrl,uid:i.id})));
    setFileListPhysical(data.examAnnexList.map(i => ({...i,url:i.fileUrl,uid:i.id})));
    setFileListOther(data.otherAnnexList.map(i => ({...i,url:i.fileUrl,uid:i.id})));
    setDataItem({
      name:data.name,
      phone:data.phone,
      wx:data.wx,
      email:data.email,
      birthday:data.birthday,
      education:data.education,
      schoolName:data.schoolName,
      graduateDate:data.graduateDate,
      postName:data.postName,
      projectName:data.projectName,
      companyName:data.companyName,
      projectDirector:data.projectDirector,
      idCard:data.idCard,
    });
    setIsModalOpen(true);
  };
  const filterStatus = (status) => {
    switch(Number(status)){
      case 10:
        return "待确认";
      case 20:
        return "接受面试";
      case 30:
        return "拒绝面试";
      case 40:
        return "面试完成";
      default:
        return "";
    }
  };
  const handleOk = async() => {
    const data = {
      inductionId,
      idCard:dataItem.idCard,
      identityAnnex:[...fileListIDFront,...fileListIDBack].map(i=>i.id),
      diplomaAnnex:[...fileListGraduation].map(i=>i.id),
      departAnnex:[...fileListQuit].map(i=>i.id),
      examAnnex:[...fileListPhysical].map(i=>i.id),
      otherAnnex:[...fileListOther].map(i=>i.id)
    };
    const {data:rs} = await axios.put("/cpe/post/induction/gen",data);
    console.log("data",data,rs);
    if(rs.code === 200){
      message.success("操作成功");
    } else{
      message.warning(rs.message);
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange1: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "done") {
      const {data} = info.file.response;
      setFileListIDFront([{
        id:data.id,
        url:data.fileUrl,
        originalName:data.originalName,
      }]);
    }
  };
  const handleChange2: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "done") {
      const {data} = info.file.response;
      console.log("handleChange2");
      setFileListIDBack([{
        id:data.id,
        url:data.fileUrl,
        originalName:data.originalName,
      }]);
    }
  };
  const handleChange3: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "done") {
      const {data} = info.file.response;
      setFileListGraduation([
        ...fileListGraduation,
        {
          id:data.id,
          url:data.fileUrl,
          originalName:data.originalName,
        }
      ]);
    }
  };
  const handleChange4: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "done") {
      const {data} = info.file.response;
      setFileListQuit([
        ...fileListQuit,
        {
          id:data.id,
          url:data.fileUrl,
          originalName:data.originalName,
        }
      ]);
    }
  };
  const handleChange5: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "done") {
      const {data} = info.file.response;
      setFileListPhysical([
        ...fileListPhysical,
        {
          id:data.id,
          url:data.fileUrl,
          originalName:data.originalName,
        }
      ]);
    }
  };
  const handleChange6: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "done") {
      const {data} = info.file.response;
      setFileListOther([
        ...fileListOther,
        {
          id:data.id,
          url:data.fileUrl,
          originalName:data.originalName,
        }
      ]);
    }
  };
  const onRemove1 = (info) => {
    const data = info.response ? info.response : info;
    const d = fileListIDFront.filter(item => item.id !== data.id);
    setFileListIDFront(d);
  };
  const onRemove2 = (info) => {
    const data = info.response ? info.response : info;
    const d = fileListIDBack.filter(item => item.id !== data.id);
    console.log("d",d);
    setFileListIDBack(d);
  };
  const onRemove3 = (info) => {
    const data = info.response ? info.response : info;
    const d = fileListGraduation.filter(item => item.id !== data.id);
    setFileListGraduation(d);
  };
  const onRemove4 = (info) => {
    const data = info.response ? info.response : info;
    const d = fileListQuit.filter(item => item.id !== data.id);
    setFileListQuit(d);
  };
  const onRemove5 = (info) => {
    console.log(info);
    const data = info.response ? info.response : info;
    const d = fileListPhysical.filter(item => item.id !== data.id);
    setFileListPhysical(d);
  };
  const onRemove6 = (info) => {
    const data = info.response ? info.response : info;
    const d = fileListOther.filter(item => item.id !== data.id);
    setFileListOther(d);
  };
  const uploadButton = (name: string) => <div className="uploadButton">
    <img src={uploadIcon} alt="" />
    <div>{name}</div>
  </div>
  ;
  return (
    <div className="InterviewList_home_lists">
      <section className="InterviewList_content_layout_lists_div">
        <div className="InterviewList_content_layout_lists_div_personnel">
          <img src={data.hrPicture}  alt="" />
          <span>{data.hrName}/HR</span>
          <div className="postName">{data.postName}</div>
          <div className="postClose">{Number(data.postStatus) === 2?"岗位已关闭":""}</div>
        </div>
      </section>
      <section className="InterviewList_content_layout_lists_bottom">
        <div className="InterviewList_content_layout_lists_method">
          {/* 面试类型：1线下面试、2腾讯会议 */}
          {Number(data.interviewType) === 1 ? "线下面试" :"腾讯会议"}
        </div>
        <div className="InterviewList_content_layout_lists_address">
          {Number(data.interviewType) === 1 ? data.interviewAddress : "关于支持工程师的面试会议"}
        </div>
        <div className="InterviewList_content_layout_lists_time">
          <span>
            {data.interviewTime}
          </span>
        </div>
        {
          Number(data.interviewStatus) !== 10 ? <div className="InterviewList_content_layout_lists_result">
            {/* <span>不通过</span> */}
            {/* <Button type="primary">参加面试</Button> */}
            {/* <Button onClick={()=>accept(data.recordId)}>接受</Button>
            <Button onClick={()=>refuse(data.recordId)}>拒绝</Button> */}
            <Button onClick={()=>look(data)}>查看</Button>
            <Button onClick={()=>upload(data)}>上传资料</Button>
          </div>
            :
            <div className="InterviewList_content_layout_lists_status">
              {filterStatus(data.interviewStatus)}
            </div>
        }
      </section>
      {isModalOpen &&<Modal width={960} className="noticeOffer"  title="上传资料" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p className="noticeOffer_title">个人信息</p>
        <section className="noticeOffer_layout">
          <div className="noticeOffer_layout_div">
            <span>姓名:</span>
            <span>{dataItem.name}</span>
          </div>
          <div className="noticeOffer_layout_div">
            <span>手机号码:</span>
            <span>{dataItem.phone}</span>
          </div>
          <div className="noticeOffer_layout_div">
            <span>邮箱:</span>
            <span>{dataItem.email}</span>
          </div> 
          <div className="noticeOffer_layout_div">
            <span>微信:</span>
            <span>{dataItem.wx}</span>
          </div> 
          <div className="noticeOffer_layout_div">
            <span>出生年月:</span>
            <span>{dataItem.birthday}</span>
          </div> 
          <div className="noticeOffer_layout_div">
            <span>最高学历:</span>
            <span>{dataItem.education}</span>
          </div> 
          <div className="noticeOffer_layout_div">
            <span>毕业院校:</span>
            <span>{dataItem.schoolName}</span>
          </div> 
          <div className="noticeOffer_layout_div">
            <span>毕业时间:</span>
            <span>{dataItem.graduateDate}</span>
          </div> 
        </section>
        <p className="noticeOffer_title">提交资料</p>
        <div className="noticeOffer_tip">
          说明：每个附件大小不超过10M，文件格式：图片、PDF、压缩包
        </div> 
        <section className="noticeOffer_upload">
          <div className="noticeOffer_upload_div">
            <span className="noticeOffer_upload_div_span">身份证:</span>
            <div className="noticeOffer_upload_div_column">
              <Input value={dataItem.idCard} placeholder="请输入18位身份证号" onInput={(e)=>{
                console.log(e.target.value);
                setDataItem({
                  ...dataItem,
                  idCard:e.target.value
                });
              }} />
              <div className="noticeOffer_upload_div_row">
                <Upload
                  action="http://192.168.0.139:8088/sys/file/upload"
                  accept=".jpg,.jpeg,.bmp"
                  listType="picture-card"
                  headers={
                    {
                      "Hx-Token": sessionStorage.getItem("accessToken")
                    }
                  }
                  defaultFileList={[...fileListIDFront]}
                  onRemove={onRemove1}
                  onChange={handleChange1}
                >
                  {fileListIDFront.length >= 1 ? null : uploadButton("身份证正面")}
                </Upload>
                <Upload
                  action="http://192.168.0.139:8088/sys/file/upload"
                  listType="picture-card"
                  accept=".jpg,.jpeg,.bmp"
                  headers={
                    {
                      "Hx-Token": sessionStorage.getItem("accessToken")
                    }
                  }
                  defaultFileList={[...fileListIDBack]}
                  onRemove={onRemove2}
                  onChange={handleChange2}
                >
                  {fileListIDBack.length >= 1 ? null : uploadButton("身份证反面")}
                </Upload>
              </div>
              <div className="noticeOffer_upload_div_column_tip">上传身份证正反面扫描件，格式：jpg，jpeg，bmp</div>
            </div>
          </div>
          <div className="noticeOffer_upload_div">
            <span className="noticeOffer_upload_div_span">毕业证书:</span>
            <div className="noticeOffer_upload_div_column">
              <Upload
                action="http://192.168.0.139:8088/sys/file/upload"
                listType="picture-card"
                accept=".jpg,.jpeg,.bmp"
                headers={
                  {
                    "Hx-Token": sessionStorage.getItem("accessToken")
                  }
                }
                defaultFileList={[...fileListGraduation]}
                onRemove={onRemove3}
                onChange={handleChange3}
              >
                {fileListGraduation .length >= 2 ? null : uploadButton("上传")}
              </Upload>
              <div className="noticeOffer_upload_div_column_tip">上传证书扫描件，最多2个附件，格式：jpg，jpeg，bmp</div>
            </div>
          </div>
          <div className="noticeOffer_upload_div">
            <span className="noticeOffer_upload_div_span">离职证明:</span>
            <div className="noticeOffer_upload_div_column">
              <Upload
                action="http://192.168.0.139:8088/sys/file/upload"
                listType="picture-card"
                accept=".jpg,.jpeg,.bmp,.pdf"
                headers={
                  {
                    "Hx-Token": sessionStorage.getItem("accessToken")
                  }
                }
                defaultFileList={[...fileListQuit]}
                onRemove={onRemove4}
                onChange={handleChange4}
              >
                {fileListQuit .length >= 1 ? null : uploadButton("上传")}
              </Upload>
              <div className="noticeOffer_upload_div_column_tip">上传离职证明扫描件或电子版，格式：jpg，jpeg，bmp，pdf</div>
            </div>
          </div>
          <div className="noticeOffer_upload_div">
            <span className="noticeOffer_upload_div_span">体检报告:</span>
            <div className="noticeOffer_upload_div_column">
              <Upload
                action="http://192.168.0.139:8088/sys/file/upload"
                listType="picture-card"
                accept=".jpg,.jpeg,.bmp,.pdf,.word"
                headers={
                  {
                    "Hx-Token": sessionStorage.getItem("accessToken")
                  }
                }
                defaultFileList={[...fileListPhysical]}
                onRemove={onRemove5}
                onChange={handleChange5}
              >
                {fileListPhysical .length >= 5 ? null : uploadButton("上传")}
              </Upload>
              <div className="noticeOffer_upload_div_column_tip">上传体检报告电子版或图片，最多5个附件，格式：jpg，jpeg，bmp，pdf，word</div>
            </div>
          </div>
          <div className="noticeOffer_upload_div">
            <span className="noticeOffer_upload_div_span">其他资料:</span>
            <div className="noticeOffer_upload_div_column">
              <Upload
                action="http://192.168.0.139:8088/sys/file/upload"
                listType="picture-card"
                accept=".jpg,.jpeg,.bmp,.pdf,.word,.zip"
                headers={
                  {
                    "Hx-Token": sessionStorage.getItem("accessToken")
                  }
                }
                defaultFileList={[...fileListOther]}
                onRemove={onRemove6}
                onChange={handleChange6}
              >
                {fileListOther .length >= 1 ? null : uploadButton("上传")}
              </Upload>
              <div className="noticeOffer_upload_div_column_tip">上传其他资料，格式：jpg，jpeg，bmp，pdf，word，zip</div>
            </div>
          </div>
        </section>
      </Modal>}
    </div>
  );
};
export default NoticeOffer;