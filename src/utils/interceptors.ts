import Axios from "axios";
import { useTokenStore } from "@/store/token";
Axios.interceptors.request.use(function (config) {
    const tokenStore = useTokenStore();
    // 自动在请求中设置access-token
    let oldToken = tokenStore.getToken();
    if (oldToken) {
        config.headers["x-access-token"] = oldToken;
    }
    return config;
});
Axios.interceptors.response.use(function (config) {
    // 自动更新access-token
    const tokenStore = useTokenStore();
    let oldToken = tokenStore.getToken();
    let token = config.headers["x-access-token"];
    if (token && token !== oldToken) {
        const userTokenStore = useTokenStore();
        userTokenStore.setToken(token);
    }
    return config;
});
