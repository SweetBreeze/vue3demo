import { App, nextTick } from "vue";
// import Vue from "vue";

import { useAuthStore } from "@/store/auth";
// 自定义指令，用于判断按钮权限
export default function directive(app: App) {
    app.directive("auth", {
        created: (el, binding) => {
            let userStore: any = useAuthStore();
            const btns: string[] = userStore.buttons || [];
            if (!btns.includes(binding.value)) {
                // 官网说inserted()不保证插入，若还未插入，remove函数无效
                // 这里使用Vue.nextTick() 函数来保证dom已插入
                nextTick(() => el.remove());
            }
        },
    });
    app.directive("bgColor", {
        beforeMount: (el, binding) => {
            el.style.backgroundColor = binding.value;
        },
    });
}
