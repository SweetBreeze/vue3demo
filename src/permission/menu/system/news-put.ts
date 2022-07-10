import { MenuItem } from "@/permission/menutree";

let menu = new MenuItem(
    "system:news-put",
    "新闻发布管理",
    "user",
    false,
    true,
    "/news-put"
);
export default menu;
