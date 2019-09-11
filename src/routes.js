
import Icons from "./views/Icons.jsx";
import Typography from "./views/Typography.jsx";
import MyGrids from "./views/MyGrids.jsx";

var dashRoutes = [
  {
    path: "/icons",
    name: "Icons",
    icon: "design_image",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/mygrids",
    name: "Mygrids",
    icon: "design_image",
    component: MyGrids,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "design-2_ruler-pencil",
    component: Typography,
    layout: "/admin"
  }
];
export default dashRoutes;
