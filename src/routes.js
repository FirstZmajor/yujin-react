
import Icons from "./views/Icons";
import Typography from "./views/Typography";
import MyGrids from "./views/MyGrids";
import AddGrids from "./views/AddGrids";
import LocalStorageLayout from "./views/LocalStorageLayout";
import MyChart from "./views/MyChart";

var dashRoutes = [
  {
    path: "/mygrids",
    name: "My Grids",
    icon: "design_image",
    component: MyGrids,
    layout: "/home"
  },
  {
    path: "/addgrids",
    name: "Add Cards",
    icon: "shopping_credit-card",
    component: AddGrids,
    layout: "/home"
  },
  {
    path: "/localstoragelayout",
    name: "Saveto Local Storage",
    icon: "arrows-1_cloud-download-93",
    component: LocalStorageLayout,
    layout: "/home"
  },
  {
    path: "/mychart",
    name: "My D3 Chart",
    icon: "media-2_sound-wave",
    component: MyChart,
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
