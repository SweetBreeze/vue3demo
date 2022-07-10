/**
 * 目录树结构
 * 该数据结构的每一条目都对应permissions表中的一条记录，代表用户可以拥有的一条权限信息。
 *
 * tag:[string] 权限唯一标识，每个角色拥有的权限使用该字段进行标识。
 * path:[string] 前端路由的url，用于菜单显示？，该url与vue-router中配置的path对应
 * type:[string] menu,buttton
 * name:[string] 展示名称，用于菜单显示
 * icon:[string]
 * leaf: [boolean] 是否叶子节点
 * whiteList:[boolean] 显示是否白名单
 * children:[array] 子代，字段同父代
 * options: [array] 操作
 * ——tag:[string]
 * ——type:[string] button
 * ——name:[string]
 * ——pattern:[string] 请求接口的url
 * ——method:[string] 请求方法
 * ——whitelist
 *
 * 菜单项数据结构
 * 菜单分为两级（暂时）
 *  第一级可以为菜单项或者子菜单
 *  第二级只能为菜单项
 *  每个菜单项下面可以包含多个配置
 */
// 菜单项
export class MenuItem {
    tag: string;
    path: string;
    type: string;
    name: string;
    icon: string;
    leaf: boolean;
    whiteList: boolean;
    hidden: boolean;
    visible: boolean;
    children: MenuItem[];
    permissions: MenuPermission[];

    constructor(
        tag: string,
        name: any,
        icon: string,
        whiteList: boolean,
        leaf?: boolean,
        path?: string,
        hidden?: boolean,
        routeName?: string
    ) {
        this.tag = tag;
        this.path = path || "";
        this.type = "menu";
        this.name = name;
        this.icon = icon;
        this.leaf = leaf || false;
        this.whiteList = whiteList;
        this.children = [];
        this.hidden = !!hidden;
        this.visible = true;
        this.permissions = [];
    }

    addChildren(child: MenuItem) {
        this.children.push(child);
        return this;
    }
    addPermission(
        tag: string,
        name: any,
        whiteList: boolean,
        method: string | null,
        pattern: string
    ) {
        let perm = new MenuPermission(tag, name, whiteList, method, pattern);
        this.permissions.push(perm);
        return this;
    }
}
export class MenuPermission {
    // 唯一标识
    tag: string;
    // 操作类型。button-按钮
    type: string;
    // 名称
    name: any;
    // 请求url pattern
    pattern: string;
    // 请求方法
    method: string | null;
    // 是否属于白名单
    whiteList: boolean;

    constructor(
        tag: string,
        name: any,
        whiteList: boolean,
        method: string | null,
        pattern: string
    ) {
        this.tag = tag;
        this.type = "button";
        this.name = name;
        this.whiteList = whiteList;
        this.method = method;
        this.pattern = pattern;
    }
}
// 按钮权限-请求方法权限
export class ButtonPermission {
    tag: string;
    type: string;
    name: any;
    pattern: string;
    method: string | null;
    whiteList: boolean;
    constructor(
        tag: string,
        name: any,
        whiteList: boolean,
        method: string | null,
        pattern: string
    ) {
        this.tag = tag;
        this.type = "button";
        this.name = name;
        this.whiteList = whiteList;
        this.method = method;
        this.pattern = pattern;
    }
}

// 菜单树
export class TreeItem {
    tag: string;
    name: string;
    children: TreeItem[];

    constructor(tag: string, name: string) {
        this.tag = tag;
        this.name = name;
        this.children = [];
    }

    addChildren(tag: string, name: string) {
        let child = new TreeItem(tag, name);
        this.children.push(child);
        return this;
    }
}

// 表示后台权限的数据结构
export class BackPermission {
    tag: string;
    type: string;
    whiteList: boolean;
    method: string | null;
    pattern: string | "";
    constructor(
        tag: string,
        type: string,
        whiteList: boolean,
        method?: string | null,
        pattern?: string
    ) {
        this.tag = tag;
        this.type = type;
        this.whiteList = whiteList;
        this.method = method || null;
        this.pattern = pattern || "";
    }
}
