import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import routes from "./routes";
import { useUserStore } from "@/store/user";
import { useTokenStore } from "@/store/token";
import { useAuthStore } from "@/store/auth";

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const tokenStore = useTokenStore();
    const authStore = useAuthStore();
    if (to.path === "/login") {
        userStore.removeUser();
        tokenStore.removeToken();
        authStore.removeAuth();
    }
    let tempString = userStore.getUser();
    if (tempString) {
        if (!tempString && to.path !== "/login") {
            // 用户为空
            next();
        } else {
            next();
        }
    } else {
        if (to.path !== "/login") {
            next({ path: "/login" });
        } else {
            next();
        }
    }
});
export default router;
