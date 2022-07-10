import { defineStore } from "pinia";
import type { RouteMeta } from "vue-router";
interface TabItem {
    name: string;
    path: string;
    meta: RouteMeta;
}

interface TabsState {
    tabsList: TabItem[];
    keepAliveList: string[];
}

export const useTabsStore = defineStore({
    id: "tabs",
    state: (): TabsState => {
        return {
            tabsList: [
                {
                    path: "/profile",
                    name: "Profile",
                    meta: {
                        title: "首页",
                    },
                },
            ],
            keepAliveList: ["Profile"],
        };
    },
    persist: {
        enabled: true,
    },
    actions: {
        // 选择标签 选择面包屑
        selectMenu(val: TabItem) {
            console.log({ val });
            if (val.path === "/") {
                // state.currentMenu = null;
            } else {
                // state.currentMenu = val.name;
                let result = this.tabsList.findIndex(
                    (item: any) => item.path === { ...val }.path
                );
                if (result === -1) {
                    this.tabsList.push({ ...val });
                }
                // debugger;
            }
        },
        closeTab(val: any) {
            let result = this.tabsList.findIndex(
                (item: any) => item.path === val.path
            );
            this.tabsList.splice(result, 1);
            this.keepAliveList.length = 0;
            this.tabsList.forEach((item: any) => {
                this.keepAliveList.push(item.path);
            });
        },
        updateKeepList(val: any) {
            let index = this.keepAliveList.findIndex(
                (item: any) => item.path === val.path
            );
            if (index === -1) {
                this.keepAliveList.push(val.path);
            }
        },
    },
});
