import { defineStore } from "pinia";

interface userState {
    TOKEN: string;
}

export const useTokenStore = defineStore({
    id: "TOKEN",
    state: () => {
        return {
            TOKEN: "",
        };
    },
    // 数据持久化-缓存
    persist: {
        enabled: true,
    },
    actions: {
        setToken(token: string) {
            this.TOKEN = token;
        },
        removeToken() {
            let val = sessionStorage.getItem("TOKEN");
            if (val) {
                sessionStorage.removeItem("TOKEN");
            }
        },
        getToken() {
            let val: any = sessionStorage.getItem("TOKEN");
            let json = val ? val : "";
            return json.TOKEN;
        },
    },
});
