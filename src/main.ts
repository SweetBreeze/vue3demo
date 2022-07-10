import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import piniaPersist from "pinia-plugin-persist";
import router from "./router/index";
// import ElementPlus from "element-plus";
import { globalRegister } from "./global";
import "@/assets/style/index.scss";
import "@/assets/iconfont/index.scss";

// import "element-plus/dist/index.css";
import Axios from "axios";
import directive from "@/directives";
import "@/utils/interceptors";

const app = createApp(App);
store.use(piniaPersist);
app.use(store);
// app.use(ElementPlus);
app.use(globalRegister);
app.use(router);
app.use(directive);

app.mount("#app");
