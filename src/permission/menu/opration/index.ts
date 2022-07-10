import { MenuItem } from "@/permission/menutree";
import basic from "./basic";
import crops from "./crops";
import greenHouse from "./green-house";
import growCrops from "./grow-crops";
import manure from "./manure";

let menu = new MenuItem("plantation", "种植管理", "icon-zhongzhiguanli", false)
    .addChildren(basic)
    .addChildren(greenHouse)
    .addChildren(growCrops)
    .addChildren(manure)
    .addChildren(crops);

export default menu;
