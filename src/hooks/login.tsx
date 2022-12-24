import axios from "@/api/axios";
import * as React from "react";
const useLogin = () => {
  const [isLogin,setIsLogin] = React.useState();
  const getUserInfo = async () => {
    const {data} = await axios.get("/auth/client/info");
    console.log("获取用户信息",data);
  };
  React.useEffect(()=>{
    getUserInfo();
  },[]);
  return [];
};

export default useLogin;