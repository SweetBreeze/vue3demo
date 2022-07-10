import { MenuItem } from "../../../permission/menutree";

let menu = new MenuItem(
    "system:role",
    "权限管理",
    "el-icon-fa-user",
    false,
    true,
    "/role"
).addPermission("system:role:select", "查询", false, "GET", "/api/admin/users");
export default menu;
