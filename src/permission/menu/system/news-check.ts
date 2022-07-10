import { MenuItem } from "@/permission/menutree";

let menu = new MenuItem(
    "system:news-check",
    "新闻审核管理",
    "user",
    false,
    true,
    "/news-check"
);
export default menu;
