const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/test", (req, res, next) => {
  res.json({
    a: 1
  });
  next();
});

app.get("/eps/personResume/resumeList", (req, res, next) => {
  const data = {
    "ok": false,
    "code": -81515013.3232819,
    "data": {
      "jobMentName": "求职状态名称",
      "postCategoryCode": null,
      "jobIdentity": "1",
      "workCityCode": null,
      "resumeId": "简历 id",
      "workTime": "2000-12-08",
      "salaryMin": null,
      "sex": "1",
      "wx": "xxxx",
      "workCityName": null,
      "industryCategoryCode": null,
      "salaryMax": null,
      "picture": "https://img2.baidu.com/it/u=1280245269,1605538650&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1671555600&t=0cdca854ed0783abebe52e44a4d1bb53",
      "birthday": "2001-12-08",
      "jobMent": "id",
      "email": "12314@qq.com",
      "educationDesc": "本科-全日制",
      "postCategoryName": null,
      "accountId": "账户 id",
      "name": "名字",
      "stampdiffTime": "5 年",
      "merit": "个人优势",
      "phone": "15912341234"
    }
  };
  res.json(data);
  next();
});

app.put("/eps/nds_resume", (req, res, next) => {
  console.log("params", req.body);
  const data = {
    "ok": true,
  };
  res.json(data);
  next();
});


// 期望职位
// 列表
app.post("/eps/nds_resume_post/list", (req, res, next) => {
  console.log("params", req.body);
  const data = {
    "ok": true,
    data: [
      {
        id: "1",
        resumeId: "333",
        wantedType: "1",
        workCityCode: "420100",
        postCategoryCode: "125262",
        industryCategoryCode: "100101",
        industryCategoryName: "计算机1",
        salaryExpectation: [1, 2],
        postCategoryName: "项目经理",
        workCityName: "武汉",
        salaryMin: "1",
        salaryMax: "3"
      },
      {
        id: "2",
        resumeId: "444",
        wantedType: "2",
        workCityCode: "420100",
        postCategoryCode: "125262",
        industryCategoryCode: "100101",
        industryCategoryName: "计算机",
        salaryExpectation: [2, 4],
        postCategoryName: "java",
        workCityName: "城都",
        salaryMin: "11",
        salaryMax: "22"
      }
    ]
  };
  res.json(data);
  next();
});
// 新增
app.post("/eps/nds_resume/nds_resume_post", (req, res, next) => {
  console.log("params", req.body);
  const data = {
    "ok": true,
  };
  res.json(data);
  next();
});
// 修改
app.put("/eps/nds_resume/nds_resume_post", (req, res, next) => {
  console.log("params", req.body);
  const data = {
    "ok": true,
  };
  res.json(data);
  next();
});
// 删除
app.delete("/eps/nds_resume/nds_resume_post", (req, res, next) => {
  console.log("params", req.body, req.query);
  const data = {
    "ok": "删除成功",
  };
  res.json(data);
  next();
});

// 工作经历
// 列表
app.post("/eps/nds_resume_work/list", (req, res, next) => {
  console.log("params", req.body);
  const data = {
    "ok": true,
    data: [
      {
        id: 11,
        resumeId: 22,
        companyName: "公司名字1",
        workDateStart: "2000-1-1",
        workDateEnd: "2000-12-12",
        postCategoryName: "JAVA",
        postCategoryCode: "1111",
        industryCategoryName: "xxx1",
        industryCategoryCode: "4444",
        workContent: "工作内容1",
        reportingObject: "laowang",
      },
      {
        id: 222,
        resumeId: 44,
        companyName: "公司名字2",
        workDateStart: "2000-1-1",
        workDateEnd: "2000-12-12",
        postCategoryCode: "2222",
        postCategoryName: "前端",
        industryCategoryCode: "55555",
        industryCategoryName: "xx2222",
        workContent: "工作内容2",
        reportingObject: "laowang2",
      }
    ]
  };
  res.json(data);
  next();
});
// 删除
app.delete("/eps/nds_resume_work", (req, res, next) => {
  console.log("params", req.body, req.query);
  const data = {
    "ok": "删除成功",
  };
  res.json(data);
  next();
});
// 修改

app.put("/eps/nds_resume_work", (req, res, next) => {
  console.log("params", req.body);
  const data = {
    "ok": "修改成功",
  };
  res.json(data);
  next();
});
// 新增

app.post("/eps/nds_resume_work", (req, res, next) => {
  console.log("params", req.body);
  const data = {
    "ok": "增加成功",
  };
  res.json(data);
  next();
});

// 项目经历
// 列表
app.post("/eps/nds_resume_project/list", (req, res, next) => {
  console.log("params", req.body);
  const data = {
    "ok": true,
    data: [
      {
        resumeId: "xxx",
        id: 111,
        projectName: "项目名字1",
        projectDateStart: "2000-1-1",
        projectDateEnd: "2000-12-12",
        projectPost: "c#",
        projectPostId: "xxx",
        projectDesc: "工作内容1",
      },
      {
        resumeId: "11xxx",
        id: 222,
        projectName: "项目名字2",
        projectDateStart: "2000-1-1",
        projectDateEnd: "2000-12-12",
        projectPostId: "rrr",
        projectPost: "JAVA",
        projectDesc: "工作内容2",
      }
    ]
  };
  res.json(data);
  next();
});
// 删除
app.delete("/eps/nds_resume_project", (req, res, next) => {
  console.log("params", req.body);
  const data = {
    "ok": true,
  };
  res.json(data);
  next();
});
// 修改

app.put("/eps/nds_resume_project", (req, res, next) => {
  console.log("params", req.body);
  const data = {
    "ok": true,
  };
  res.json(data);
  next();
});
// 新增

app.post("/eps/nds_resume_project", (req, res, next) => {
  console.log("params", req.body);
  const data = {
    "ok": true,
  };
  res.json(data);
  next();
});



// 教育经历
// 列表
app.post("/eps/nds_resume_education/list", (req, res, next) => {
  console.log("params", req.body);
  const data = {
    "ok": true,
    data: {
      schoolName: "学校名字",
      educationDataStart: "2000-1-1",
      educationDataEnd: "2000-12-12",
      education: "本科",
      major: "JAVA",
      educationType: "1",// 全日制
      career: "xxxxxxxx"
    }
  };
  res.json(data);
  next();
});
// 删除
app.delete("/eps/nds_resume_education", (req, res, next) => {
  console.log("params", req.body);
  const data = {
    "ok": true,
  };
  res.json(data);
  next();
});
// 修改

app.put("/eps/nds_resume_education", (req, res, next) => {
  console.log("params", req.body);
  const data = {
    "ok": true,
  };
  res.json(data);
  next();
});
// 新增

app.post("/eps/nds_resume_education", (req, res, next) => {
  console.log("params", req.body);
  const data = {
    "ok": true,
  };
  res.json(data);
  next();
});



app.listen("8088", () => {
  console.log("start");
});



