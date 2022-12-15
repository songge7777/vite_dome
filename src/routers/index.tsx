import { GetRouteData, MetaRouters } from "@/routers/interface";
import NotFound from "@/pages/404";
import { useRoutes } from "react-router-dom";
import * as React from "react";
import { t, createTreeFromArray } from "@/utils/routerFn";
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
const routes = [
  ...routeList,
  // 404找不到
  { path: "*", element: <NotFound /> }
];

const  App = () => {
  return useRoutes(routes);
};
export default App;
