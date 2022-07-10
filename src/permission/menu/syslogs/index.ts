import { MenuItem } from "@/permission/menutree";
import control from "./control-logs";
import device from "./device-logs";
import sys from "./sys-logs";
import waring from "./waring-logs";

let menu = new MenuItem("syslogs", "系统日志", "icon-xitongrizhi", false)
  .addChildren(sys)
  .addChildren(waring)
  .addChildren(control)
  .addChildren(device);
export default menu;
