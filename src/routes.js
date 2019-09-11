
import Icons from "./views/Icons.jsx";
import Typography from "./views/Typography.jsx";
import MyGrids from "./views/MyGrids.jsx";

var dashRoutes = [
  {
    path: "/mygrids",
    name: "Mygrids",
    icon: "design_image",
    component: MyGrids,
    layout: "/home"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "design_image",
    component: Icons,
    layout: "/home"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "design-2_ruler-pencil",
    component: Typography,
    layout: "/home"
  }
];
export default dashRoutes;
