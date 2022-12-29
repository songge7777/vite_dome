export interface routeType {
  path: string
  component?: any
  children?: Array<routeType>
  meta?: {
    title?: string
    needLogin?: boolean
  }
  redirect?: string
}

const routes: Array<routeType> = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    component: () => import("@/pages/index"),
    meta: {
      title: "",
    }
  },
  {
    path: "/login",
    component: () => import("@/pages/login"),
    meta: {
      title: "",
    }
  },
  {
    path: "/search",
    component: () => import("@/pages/search"),
    meta: {
      title: "",
    }
  },
  {
    path: "/jobWanted",
    component: () => import("@/pages/jobWanted"),
    meta: {
      title: "",
    }
  },
  {
    path: "/loginListTab",
    component: () => import("@/pages/loginListTab"),
    meta: {
      title: "",
    }
  },
  {
    path: "/messagenotification",
    component: () => import("@/pages/messagenotification"),
    meta: {
      title: "",
    }
  },
  {
    path: "/moreCompany",
    component: () => import("@/pages/moreCompany"),
    meta: {
      title: "",
    }
  },
  {
    path: "/personalTab",
    component: () => import("@/pages/personalTab"),
    meta: {
      title: "",
    }
  },
  {
    path: "/personal",
    component: () => import("@/pages/personal"),
    meta: {
      title: "",
    }
  },
  {
    path: "/resumeManagement",
    component: () => import("@/pages/resumeManagement"),
    meta: {
      title: "",
    }
  },
  {
    path: "/viewEnterprise",
    component: () => import("@/pages/viewEnterprise"),
    meta: {
      title: "",
    }
  },
  {
    path: "/viewPosition",
    component: () => import("@/pages/viewPosition"),
    meta: {
      title: "",
    }
  },
  {
    path: "/agreement",
    component: () => import("@/pages/agreement"),
    meta: {
      title: "",
    }
  },
  {
    path: "*",
    component: () => import("@/pages/search"),
    meta: {
      title: "404"
    }
  }
];

export default routes;