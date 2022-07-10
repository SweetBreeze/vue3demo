import { defineStore } from "pinia";

interface userState {
    user: {};
}

export const useUserStore = defineStore({
    id: "user",
    state: () => {
        return {
            user: {},
        };
    },
    // 数据持久化-缓存
    persist: {
        enabled: true,
    },
    actions: {
        setUser(userInfo: {}) {
            this.user = { ...userInfo };
        },
        removeUser() {
            sessionStorage.removeItem("user");
        },
        getUser() {
            let val = sessionStorage.getItem("user");
            let json = val ? JSON.parse(val) : "";
            return json.user || "";
        },
    },
});
