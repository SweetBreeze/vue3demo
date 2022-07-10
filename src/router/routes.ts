import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/Login.vue"),
    },
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/Home.vue"),
        children: [
            {
                path: "/profile",
                name: "Profile",
                component: () => import("@/views/Profile.vue"),
                meta: {
                    title: "首页",
                },
            },
            {
                path: "/echartmodel",
                name: "EchartModel",
                component: () => import("@/views/Summary/EchartModel.vue"),
                meta: {
                    title: "统计汇总",
                },
            },
            {
                path: "/user",
                name: "User",
                component: () => import("@/views/system/User.vue"),
                meta: {
                    title: "用户管理",
                },
            },
            {
                path: "/role",
                name: "Role",
                component: () => import("@/views/system/Role.vue"),
                meta: {
                    title: "权限管理",
                },
            },

            {
                name: "MonitorDevice",
                path: "/monitor-device",
                component: () => import("@/views/device/MonitorDevice.vue"),
                meta: {
                    title: "监控设备管理",
                },
            },
            {
                name: "Basic",
                path: "/basic",
                component: () => import("@/views/device/Basic.vue"),
                meta: {
                    title: "基础信息",
                },
            },
        ],
    },
];
export default routes;
