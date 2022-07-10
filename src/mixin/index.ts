import * as Utils from "@/utils";
import { useAuthStore } from "@/store/auth";

export default {
    // 日期格式化函数
    defaultTimeFormatter(row: any, column: any) {
        return Utils.formatDateString(row[column.property]);
    },
    //按钮权限
    isButtonEnabled(buttonName: string) {
        const authStore = useAuthStore();
        return authStore.buttons.includes(buttonName);
    },
    clearDeepObj(obj: any, refs: any) {
        Object.keys(obj).forEach((key) => {
            obj[key] = "";
        });
        Utils.clearValidateForm(refs);
    },
    // 扁平化处理
    flatten(arr: any) {
        return arr.flat(Infinity);
    },
};
