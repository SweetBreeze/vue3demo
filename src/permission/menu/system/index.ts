import { MenuItem } from "@/permission/menutree";
import user from "./user";
import role from "./role";
import businessuser from "./business-user";
import business from "./business";
import check from "./news-check";
import put from "./news-put";
import group from "./group";

// 系统管理
//  - 用户管理
//  - 角色管理
let menu = new MenuItem("system", "系统设置", "icon-xitongguanli", false)
    .addChildren(role)
    .addChildren(user);

export default menu;
