import { MenuItem } from "@/permission/menutree";
import summary from "./data-summary";

let menu = new MenuItem(
  "monitor",
  "监控中心",
  "icon-jiankongzhongxin",
  false
).addChildren(summary);

export default menu;
