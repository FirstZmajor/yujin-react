
import Icons from "./views/Icons.jsx";
import Typography from "./views/Typography.jsx";
import MyGrids from "./views/MyGrids.jsx";
import AddGrids from "./views/AddGrids";

var dashRoutes = [
  {
    path: "/mygrids",
    name: "Mygrids",
    icon: "design_image",
    component: MyGrids,
    layout: "/home"
  },
  {
    path: "/addgrids",
    name: "AddGrids",
    icon: "design_image",
    component: AddGrids,
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
