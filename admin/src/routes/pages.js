import LoginPage from "../View/views/Pages/LoginPage";
import LockScreenPage from "../View/views/Pages/LockScreenPage";

var pagesRoutes = [
    { path: "/login", name: "Login Page", mini: "LP", component: LoginPage },
    { path: "/lock-screen", name: "Lock Screen Page", mini: "LSP", component: LockScreenPage }
];

export default pagesRoutes;
