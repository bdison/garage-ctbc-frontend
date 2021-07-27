import async from "../components/Async";
import authValid from "../pages/reference/HOC/AuthValid";
import { Grid as GridIcon, Layers as LayersIcon } from "react-feather";
/* import SFDCLogin from "../pages/sfdc";
 import AuthHandling from "../pages/sfdc/authHandling";
 import ResponseHandling from "../pages/sfdc/responseHandling"; */

const Login = async(() => import("../pages/signIn"));
const Dashboard = async(() => import("../pages/dashboard"));
const TopicList = async(() => import("../pages/topicList"));
const CustomerList = async(() => import("../pages/customerList"));

/* const SFDCLoginRoutes = {
  path: "/",
  name: "SFDC Login",
  component: authValid(SFDCLogin),
  children: null
};

const AuthHandlingRoutes = {
  path: "/AuthHandling",
  name: "Auth Handling",
  component: AuthHandling,
  children: null
};

const ResponseHandlingRoutes = {
  path: "/ResponseHandling",
  name: "Response Handling",
  component: ResponseHandling,
  children: null
}; */


const loginRoutes = {
  path: "/",
  name: "Login",
  component: authValid(Login),
  children: null
};

// CDP Portal
const DashboardRoutes = {
  path: "/Dashboard",
  name: "Dashboard",
  header: "MAIN",
  icon: GridIcon,
  component: authValid(Dashboard),
  children: null
};

const CustomerListRoutes = {
  path: "/CustomerList",
  name: "Customer List",
  component: authValid(CustomerList),
  children: null
};

export const TopicListRoutes = {
  hide:true,
  path: "/List",
  name: "Increase Revenue",
  icon: LayersIcon,
  containsHome: true,
  children: [
    {
      path: "/List/UpgradeOppty",
      name: "Upgrade Opportunity",
      component: authValid(TopicList)
    },
    {
      path: "/List/SaaSPotential",
      name: "SaaS Potential",
      component: authValid(TopicList)
    },
    {
      path: "/List/UpcomingRenewal",
      name: "Upcoming Renewal",
      component: authValid(TopicList)
    },
    {
      path: "/List/ExpiredCustomer",
      name: "Expired Customer",
      component: authValid(TopicList)
    },
    {
      path: "/List/SeatIncrease",
      name: "Seat Increase",
      component: authValid(TopicList)
    },
    {
      path: "/List/SeatDecrease",
      name: "Seat Decrease",
      component: authValid(TopicList)
    }
  ]
};


// Landing specific routes
export const landing = [
  // landingRoutes
];

export const portal = [
  loginRoutes,
  // SFDCLoginRoutes,
  // AuthHandlingRoutes,
  // ResponseHandlingRoutes
];

// Dashboard specific routes
export const dashboard = [
  DashboardRoutes,
  TopicListRoutes,
  CustomerListRoutes
];


// All routes
export const exportedObject = [
  DashboardRoutes,
  TopicListRoutes
];

export default exportedObject;
