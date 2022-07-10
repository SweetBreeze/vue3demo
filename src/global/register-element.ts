import { App } from "vue";
import "element-plus/dist/index.css";
// import "element-plus/dist/index.css";
import {
    ElButton,
    ElCheckbox,
    ElForm,
    ElFormItem,
    ElInput,
    ElLink,
    ElRadio,
    ElTabPane,
    ElTabs,
    ElMenu,
    ElMenuItem,
    ElTable,
    ElSelect,
    ElSubMenu,
    ElDropdownItem,
    ElDropdown,
    ElDropdownMenu,
    ElCard,
    ElDialog,
    ElTree,
    ElTableColumn,
} from "element-plus";

const components = [
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    ElRadio,
    ElTabs,
    ElTabPane,
    ElCheckbox,
    ElLink,
    ElMenu,
    ElMenuItem,
    ElTable,
    ElSelect,
    ElSubMenu,
    ElDropdownItem,
    ElDropdown,
    ElDropdownMenu,
    ElCard,
    ElDialog,
    ElTree,
    ElTableColumn,
];

export default function (app: App): void {
    for (const component of components) {
        app.component(component.name, component);
    }
}
