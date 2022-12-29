import { GetRouteData, MetaRouters } from "@/routers/interface";
import NotFound from "@/pages/404";
import { useRoutes } from "react-router-dom";
import * as React from "react";
import { t, createTreeFromArray } from "@/utils/routerFn";
import Login from "@/pages/login";
import Search from "@/pages/search";
// 导入所有router
const metaRouters = import.meta.globEager("@/pages/**/*.tsx") as MetaRouters;
// 创建 router
function routerInit(){
  const getRouteData: GetRouteData[][]=[]; 

  Object.entries(metaRouters).map((data) => {
    const [key] = data;
    const path = key.replace(/\/src\/pages|.tsx/g, "");
    const pathArr = path.match(/[^\/]+/g) as RegExpMatchArray;
    const tData = t(pathArr,key);
    getRouteData.push(tData);
  });
  return getRouteData;
}
const  routeList = createTreeFromArray(routerInit());
// console.log("routeList",JSON.stringify(routeList));
// const  data = [{"path":"/404","id":"/src/pages/404.tsx","element":{"key":null,"ref":null,"props":{"fallback":{"type":"div","key":null,"ref":null,"props":{"children":"loading...."},"_owner":null,"_store":{}},"children":{"type":{"_payload":{"_status":-1}},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}},"_owner":null,"_store":{}}},{"path":"/agreement","id":"/src/pages/agreement.tsx","element":{"key":null,"ref":null,"props":{"fallback":{"type":"div","key":null,"ref":null,"props":{"children":"loading...."},"_owner":null,"_store":{}},"children":{"type":{"_payload":{"_status":-1}},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}},"_owner":null,"_store":{}}},{"path":"/index","id":"/src/pages/index.tsx","element":{"key":null,"ref":null,"props":{"fallback":{"type":"div","key":null,"ref":null,"props":{"children":"loading...."},"_owner":null,"_store":{}},"children":{"type":{"_payload":{"_status":-1}},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}},"_owner":null,"_store":{}}},{"path":"/jobWanted","id":"/src/pages/jobWanted.tsx","element":{"key":null,"ref":null,"props":{"fallback":{"type":"div","key":null,"ref":null,"props":{"children":"loading...."},"_owner":null,"_store":{}},"children":{"type":{"_payload":{"_status":-1}},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}},"_owner":null,"_store":{}}},{"path":"/login","id":"/src/pages/login.tsx","element":{"key":null,"ref":null,"props":{"fallback":{"type":"div","key":null,"ref":null,"props":{"children":"loading...."},"_owner":null,"_store":{}},"children":{"type":{"_payload":{"_status":-1}},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}},"_owner":null,"_store":{}}},{"path":"/loginListTab","id":"/src/pages/loginListTab.tsx","element":{"key":null,"ref":null,"props":{"fallback":{"type":"div","key":null,"ref":null,"props":{"children":"loading...."},"_owner":null,"_store":{}},"children":{"type":{"_payload":{"_status":-1}},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}},"_owner":null,"_store":{}}},{"path":"/messagenotification","id":"/src/pages/messagenotification.tsx","element":{"key":null,"ref":null,"props":{"fallback":{"type":"div","key":null,"ref":null,"props":{"children":"loading...."},"_owner":null,"_store":{}},"children":{"type":{"_payload":{"_status":-1}},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}},"_owner":null,"_store":{}}},{"path":"/moreCompany","id":"/src/pages/moreCompany.tsx","element":{"key":null,"ref":null,"props":{"fallback":{"type":"div","key":null,"ref":null,"props":{"children":"loading...."},"_owner":null,"_store":{}},"children":{"type":{"_payload":{"_status":-1}},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}},"_owner":null,"_store":{}}},{"path":"/personal","id":"/src/pages/personal.tsx","element":{"key":null,"ref":null,"props":{"fallback":{"type":"div","key":null,"ref":null,"props":{"children":"loading...."},"_owner":null,"_store":{}},"children":{"type":{"_payload":{"_status":-1}},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}},"_owner":null,"_store":{}}},{"path":"/personalTab","id":"/src/pages/personalTab.tsx","element":{"key":null,"ref":null,"props":{"fallback":{"type":"div","key":null,"ref":null,"props":{"children":"loading...."},"_owner":null,"_store":{}},"children":{"type":{"_payload":{"_status":-1}},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}},"_owner":null,"_store":{}}},{"path":"/resumeManagement","id":"/src/pages/resumeManagement.tsx","element":{"key":null,"ref":null,"props":{"fallback":{"type":"div","key":null,"ref":null,"props":{"children":"loading...."},"_owner":null,"_store":{}},"children":{"type":{"_payload":{"_status":-1}},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}},"_owner":null,"_store":{}}},{"path":"/search","id":"/src/pages/search.tsx","element":{"key":null,"ref":null,"props":{"fallback":{"type":"div","key":null,"ref":null,"props":{"children":"loading...."},"_owner":null,"_store":{}},"children":{"type":{"_payload":{"_status":-1}},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}},"_owner":null,"_store":{}}},{"path":"/viewEnterprise","id":"/src/pages/viewEnterprise.tsx","element":{"key":null,"ref":null,"props":{"fallback":{"type":"div","key":null,"ref":null,"props":{"children":"loading...."},"_owner":null,"_store":{}},"children":{"type":{"_payload":{"_status":-1}},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}},"_owner":null,"_store":{}}},{"path":"/viewPosition","id":"/src/pages/viewPosition.tsx","element":{"key":null,"ref":null,"props":{"fallback":{"type":"div","key":null,"ref":null,"props":{"children":"loading...."},"_owner":null,"_store":{}},"children":{"type":{"_payload":{"_status":-1}},"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}},"_owner":null,"_store":{}}}];
const routes = [
  ...routeList,
  // // 404找不到
  // {
  //   path: "/search",
  //   element: <Search />
  // },
  // { path: "404", element: <Login /> },
  { path: "*", element: <Login /> },
];
console.log("routeList",routes);

const  App = () => {
  return useRoutes(routes);
};
export default App;
