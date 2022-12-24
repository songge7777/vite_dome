/**
 * @description 薪资
 */
import * as  React from "react";

export const moneyList = () => {
  const baseArr = [{id:0,value:"1千以内"}];
  const qianArr = ["1","2","3","4","5","6","7","8","9"].map(i => ({id:`${i}`,value:`${i}千`}));
  const wanOneArr = ["1.0","1.1","1.2","1.3","1.4","1.5","1.6","1.7","1.8","1.9"].map(i => ({id:`${i}`,value:`${i}万`}));
  const wanTwoArr = ["2.0","2.1","2.2","2.3","2.4","2.5","2.6","2.7","2.8","2.9"].map(i => ({id:`${i}`,value:`${i}万`}));
  const wanMiddleArr = ["3.0","3.5","4.0","4.5","5.0","5.5","6.0","6.5","7.0","7.5","8.0","8.5","9.0","9.5"].map(i => ({id:`${i}`,value:`${i}万`}));
  const wanMoreArr = ["11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"].map(i => ({id:`${i}`,value:`${i}万`}));
  return [...baseArr,...qianArr,...wanOneArr,...wanTwoArr,...wanMiddleArr,...wanMoreArr];
};
/**
 * 
 * @description 行业
 */
export const expectedIndustryData = ()=>{
  return [
    {
      id:0,
      value:"不限"
    },
    {
      id:1,
      value:"云计算/大数据"
    },
    {
      id:2,
      value:"IT服务"
    },
    {
      id:3,
      value:"人工自能"
    },
    {
      id:4,
      value:"游戏"
    }
  ];
};
 

/**
 *
 * @description 城市
 */
export const expectedCityData = ()=>{
  return [
    {
      id:"0",
      value:"不限"
    },
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
};
 


/**
 * 
 * @description 状态
 */
export const identityStatusData = ()=>{
  return [
    {
      id:1,
      value:"离职-随时到岗"
    },
    {
      id:2,
      value:"在职-暂不考虑"
    },
    {
      id:3,
      value:"在职-考虑机会"
    },
    {
      id:4,
      value:"在职-月内到岗"
    }
  ];
};

/**
 * @description 学历
 */
export const educationData = ()=>{
  return [
    {
      id:1,
      value:"高中及以下"
    },
    {
      id:2,
      value:"大专"
    },
    {
      id:3,
      value:"本科"
    },
    {
      id:4,
      value:"硕士"
    },
    {
      id:5,
      value:"博士"
    }
  ];
};


/**
 * @description 学制类型
 */
export const educationalData = ()=>{
  return [
    {
      id:1,
      value:"全日制"
    },
    {
      id:2,
      value:"非全日制"
    }
  ];
};

/**
 * @description 搜索城市
 */
export const searchCityData = ()=>{
  return [
    {
      id:1,
      value:"武汉"
    },
    {
      id:2,
      value:"北京"
    },
    {
      id:3,
      value:"上海"
    },
    {
      id:4,
      value:"广州"
    },
    {
      id:5,
      value:"深圳"
    },
    {
      id:6,
      value:"杭州"
    },
    {
      id:7,
      value:"天津"
    },
    {
      id:8,
      value:"西安"
    },
    {
      id:9,
      value:"苏州"
    },
    {
      id:0,
      value:"其他城市"
    }
  ];
};


/**
 * @description 学历要求
 */
export const educationalRequirementsDta = ()=>{
  return [
    {
      id:0,
      value:"不限"
    },
    {
      id:1,
      value:"高中及以下"
    },
    {
      id:2,
      value:"中专"
    },
    {
      id:3,
      value:"本科"
    },
    {
      id:4,
      value:"硕士"
    },
    {
      id:5,
      value:"博士"
    }
  ];
};



/**
 * @description 工作经验
 */
export const workExperience = ()=>{
  return [
    {
      id:0,
      value:"不限"
    },
    {
      id:1,
      value:"应届生"
    },
    {
      id:2,
      value:"1-3年"
    },
    {
      id:3,
      value:"3-5年"
    },
    {
      id:4,
      value:"5-10年"
    },
    {
      id:5,
      value:"10年以上"
    }
  ];
};



/**
 * @description 公司规模
 */
export const companySize = ()=>{
  return [
    {
      id:0,
      value:"不限"
    },
    {
      id:1,
      value:"少于20人"
    },
    {
      id:2,
      value:"20-99人"
    },
    {
      id:3,
      value:"100-299人"
    },
    {
      id:4,
      value:"300-499人"
    },
    {
      id:5,
      value:"500-999人"
    },
    {
      id:6,
      value:"1000-9999人"
    },
    {
      id:7,
      value:"10000人"
    },
  ];
};




/**
 * @description 融资阶段
 */
export const financingStage= ()=>{
  return [
    {
      id:0,
      value:"不限"
    },
    {
      id:1,
      value:"未融资"
    },
    {
      id:2,
      value:"天使轮"
    },
    {
      id:3,
      value:"A轮"
    },
    {
      id:4,
      value:"B轮"
    },
    {
      id:5,
      value:"C轮"
    },
    {
      id:6,
      value:"D轮及以上"
    },
    {
      id:7,
      value:"已上市"
    },
    {
      id:8,
      value:"不需要融资"
    },
  ];
};
