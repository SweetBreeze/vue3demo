import { MenuItem, TreeItem, BackPermission } from "./menutree";
import system from "./menu/system";
import profile from "./menu/profile";
import echartmodel from "./menu/echartmodel";
import device from "./menu/device";
import monitor from "./menu/monitor";
import syslogs from "./menu/syslogs";
// 菜单数据
const menus: MenuItem[] = [device, profile, system, echartmodel];

// 展示菜单书
export function getNavData(): MenuItem[] {
    return menus;
}

// 用于“角色管理”模块中显示权限树，获得一个树状结构
export const getPermissionTree = (tags: string[]) => {
    let data = getNavData();
    let items: TreeItem[] = [];
    getTree(data, items, tags);
    return items;
};
function getTree(menus: MenuItem[], items: TreeItem[], tags: string[]) {
    for (let menu of menus) {
        // 如果没有包含对应的tag，则略过当前菜单
        if (!tags.includes(menu.tag)) {
            continue;
        }
        let item = new TreeItem(menu.tag, menu.name);
        items.push(item);
        if (menu.leaf) {
            if (menu.permissions) {
                for (let option of menu.permissions) {
                    // 如果没有包含对应的tag，则略过
                    if (!tags.includes(option.tag)) {
                        continue;
                    }
                    item.addChildren(option.tag, option.name);
                }
            }
        } else {
            getTree(menu.children, item.children, tags);
        }
    }
}
// 用于”同步权限“功能：
// 从前端数据结构中生成权限列表记录
export const getPermissions = () => {
    let list: BackPermission[] = [];
    processPermissions(getNavData(), list);
    return list;
};

const processPermissions = (menuItems: MenuItem[], list: BackPermission[]) => {
    for (let menuItem of menuItems) {
        let backPermission = new BackPermission(
            menuItem.tag,
            menuItem.type,
            menuItem.whiteList
        );
        list.push(backPermission);
        if (menuItem.leaf && menuItem.permissions) {
            for (let option of menuItem.permissions) {
                let backPermission = new BackPermission(
                    option.tag,
                    option.type,
                    option.whiteList,
                    option.method,
                    option.pattern
                );
                list.push(backPermission);
            }
        } else {
            processPermissions(menuItem.children, list);
        }
    }
};
