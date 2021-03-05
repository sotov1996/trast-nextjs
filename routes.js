import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "main",
    icon: Dashboard,

    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "feedback",
    icon: "content_paste",

    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "contact",
    icon: BubbleChart,

    layout: "/admin",
  },
  {
    path: "/table-list",
    name: "admin",
    icon: Unarchive,

    layout: "/admin",
  },
];

export default dashboardRoutes;
