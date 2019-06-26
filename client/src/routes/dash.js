import PassengerIdentity from "../View/components/PassengerIdentity/PassengerIdentity";
import History from "../View/components/History/History";
import Abnormal from "../View/components/Abnormal/Abnormal";

var dashRoutes = [

    { path: "/passenger-identity", name: "Traveler Identity", icon: "pe-7s-wallet", component: PassengerIdentity },
    { path: "/history", name: "Traveler History", icon: "pe-7s-notebook", component: History },
    { path: "/abnormal", name: "Abnormal behaviour", icon: "pe-7s-user", component: Abnormal },
    { redirect: true, path: "/", pathTo: "/traveler-identity", name: "Traveler Identity" }
];

export default dashRoutes;
