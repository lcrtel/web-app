import { NavProps } from "./DashboardNav";

const rootPath = "/admin";
const accountPath = "/admin/account";

export type Roles =
  | "director"
  | "company_manager"
  | "finance_executive"
  | "finance_manager"
  | "noc_executive"
  | "noc_manager"
  | "purchase_executive"
  | "purchase_manager"
  | "sales_executive"
  | "sales_manager";

const navConfig: Record<Roles, NavProps> = {
  director: {
    root: {
      label: "Admin Panel",
      path: rootPath,
    },
    accountPage: accountPath,
    pages: [
      {
        title: "Dashboard",
        path: rootPath,
      },
      {
        title: "Routes",
        path: rootPath + "/routes",
        submenu: true,
        subMenuItems: [
          {
            title: "Route offers",
            path: rootPath + "/routes/offers",
          },
          {
            title: "Buying targets",
            path: rootPath + "/routes/targets",
          },
          {
            title: "Purchases",
            path: rootPath + "/routes/purchases",
          },
        ],
      },

      {
        title: "Marketing",
        path: rootPath + "/marketing",
        submenu: true,
        subMenuItems: [
          {
            title: "Routes",
            path: rootPath + "/marketing/routes",
          },
          {
            title: "Targets",
            path: rootPath + "/marketing/targets",
          },
        ],
      },
      {
        title: "Users",
        path: rootPath + "/users",
        submenu: true,
        subMenuItems: [
          {
            title: "Clients",
            path: rootPath + "/users/clients",
          },
          {
            title: "Vendors",
            path: rootPath + "/users/vendors",
          },
        ],
      },
      {
        title: "Departments",
        path: rootPath + "/departments",
        submenu: true,
        subMenuItems: [
          {
            title: "Sales",
            path: rootPath + "/departments/sales",
          },
          {
            title: "Purchases",
            path: rootPath + "/departments/purchases",
          },
          {
            title: "Finance",
            path: rootPath + "/departments/finance",
          },

          {
            title: "NOC",
            path: rootPath + "/departments/noc",
          },
          {
            title: "Tech",
            path: rootPath + "/departments/tech",
          },
        ],
      },
      {
        title: "Finances",
        path: rootPath + "/finance",
        submenu: true,
        subMenuItems: [
          {
            title: "Invoices",
            path: rootPath + "/finance/invoices",
          },
          {
            title: "TR Verification",
            path: rootPath + "/finance/tr-verification",
          },
          {
            title: "Rate hikes",
            path: rootPath + "/finance/rate-hikes",
          },
        ],
      },
    ],
  },
  sales_manager: {
    root: {
      label: "Admin Panel",
      path: rootPath,
    },
    accountPage: accountPath,
    pages: [
      {
        title: "Dashboard",
        path: rootPath,
      },
      {
        title: "Route offers",
        path: rootPath + "/routes/offers",
      },
      {
        title: "Buying targets",
        path: rootPath + "/routes/targets",
      },
      {
        title: "Routes marketing",
        path: rootPath + "/marketing/routes",
      },
    ],
  },
  finance_executive: {
    root: {
      label: "Admin Panel",
      path: rootPath,
    },
    accountPage: accountPath,
    pages: [
      {
        title: "Dashboard",
        path: rootPath,
      },
    ],
  },
  company_manager: {
    root: {
      label: "Admin Panel",
      path: rootPath,
    },
    accountPage: accountPath,
    pages: [
      {
        title: "Dashboard",
        path: rootPath,
      },
    ],
  },
  finance_manager: {
    root: {
      label: "Admin Panel",
      path: rootPath,
    },
    accountPage: accountPath,
    pages: [
      {
        title: "Dashboard",
        path: rootPath,
      },
    ],
  },
  noc_executive: {
    root: {
      label: "Admin Panel",
      path: rootPath,
    },
    accountPage: accountPath,
    pages: [
      {
        title: "Dashboard",
        path: rootPath,
      },
    ],
  },
  noc_manager: {
    root: {
      label: "Admin Panel",
      path: rootPath,
    },
    accountPage: accountPath,
    pages: [
      {
        title: "Dashboard",
        path: rootPath,
      },
    ],
  },
  purchase_executive: {
    root: {
      label: "Admin Panel",
      path: rootPath,
    },
    accountPage: accountPath,
    pages: [
      {
        title: "Dashboard",
        path: rootPath,
      },
    ],
  },
  purchase_manager: {
    root: {
      label: "Admin Panel",
      path: rootPath,
    },
    accountPage: accountPath,
    pages: [
      {
        title: "Dashboard",
        path: rootPath,
      },
    ],
  },
  sales_executive: {
    root: {
      label: "Admin Panel",
      path: rootPath,
    },
    accountPage: accountPath,
    pages: [
      {
        title: "Dashboard",
        path: rootPath,
      },
    ],
  },
};

export default navConfig;
