

export interface MetaRouters {
  _:{
    default:{}
  }
}
export interface GetRouteData  {
  id: string;
  path: string;
  element: React.ReactNode;
  currentRouteList: RegExpMatchArray
}