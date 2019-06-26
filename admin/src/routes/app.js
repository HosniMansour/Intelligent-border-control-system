import Dash from "../View/container/dash/Dash";
import Home from "../View/container/home/Home";

import requireAuth from "../utils/requireAuth";

var appRoutes = [
    { path: "/login", name: "Pages", component: Home },
    { path: "/lock-screen", name: "Pages", component: Home },
    { path: "/", name: "Home", component: requireAuth(Dash)}
];

export default appRoutes;
