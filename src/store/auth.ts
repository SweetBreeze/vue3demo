import { defineStore } from "pinia";

interface AuthState {
    buttons: string[];
}
export const useAuthStore = defineStore({
    id: "auth",
    state: (): AuthState => {
        return {
            buttons: [],
        };
    },
    // 数据持久化-缓存
    persist: {
        enabled: true,
    },
    // 数据持久化存储的数据格式： id:{state.val:val}
    // auths:{"buttons":["system", "system:user", "system:role", "profile", "echartmodel"]}
    actions: {
        // 判断按钮是否有权限
        setButtons(payload: string[]) {
            console.log({ payload });
            this.buttons = [...payload];
        },
        getAuth() {
            // id
            let val = sessionStorage.getItem("auth");
            let json = val ? JSON.parse(val) : "";
            // state.val
            return json.buttons;
        },
        removeAuth() {
            sessionStorage.removeItem("auth");
        },
    },
});
