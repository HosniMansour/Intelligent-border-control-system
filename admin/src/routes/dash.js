import Dashboard from "../View/components/Dashboard/Dashboard";
import ManageAgents from "../View/components/ManageAgents/ManageAgents";

var dashRoutes = [

    { path: "/dashboard", name: "Dashboard", icon: "pe-7s-global", component: Dashboard },
    { path: "/manage-agents", name: "Manage Agents", icon: "pe-7s-user", component: ManageAgents },
   

    { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];

export default dashRoutes;
