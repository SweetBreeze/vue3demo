import { MenuItem } from "@/permission/menutree";
import monitorDevice from "./monitor-device";
import basic from "./basic";

let menu = new MenuItem("device", "设备监控", "icon-shebeiguanli", false)
    .addChildren(monitorDevice)
    .addChildren(basic);

export default menu;
