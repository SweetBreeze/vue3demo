import { MenuItem } from "../../../permission/menutree";

let menu = new MenuItem(
    "system:user",
    "用户管理",
    "el-icon-fa-user",
    false,
    true,
    "/user"
).addPermission("system:user:select", "查询", false, "GET", "/api/admin/users");
export default menu;
