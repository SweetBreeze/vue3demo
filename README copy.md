# 注意语法

```
一、setup script 语法糖
1.自动注册自组件，不需要引入子组件后再components注册
2.属性和方法无需return
3.支持props、emit、context。其中attrs,emit,props,slots,expose属性和方法依然可以使用。
4.提供三个新的API来供我们使用：defineProps(用来接收父组件传来的值)、defineEmit(用来声明触发的事件表)、useContext(获取组件上下文context)。

二、如何使用this
在vue3的setup中我们是无法访问到this的，借助getCurrentInstance方法，该方法返回当前的实例对象。
1.不要把该函数当作optionsApi来获取this使用。
2.该方法只在setup,生命周期函数中有效，在方法中是无效的。

三、使用router,ref,route以及使用pinia(Vuex5.x)
import {useRouter,useRoute} from "vue-router";
const router = useRouter();
const route = useRoute();
参考命名方式，pinia对应的模块usexxxStore,引用：
import { useAuthStore } from "@/store/auth";
const authStore = useAuthStore();
获取state的值：authStore.buttons
调用actions的方法：authStore.setButtons(val);

四、提交表单验证(element-plus)
import { FormRules, FormInstance } from "element-plus";
对应表单挂载的ref
const editFormRef = ref<FormInstance>();
const editRules = reactive<FormRules>({
  code: [{ min: 3, max: 5, message: "超出设置范围", trigger: "blur" }],
  name: [{ required: true, message: "不能为空", trigger: "blur" }],
  address: [{ required: true, message: "不能为空", trigger: "blur" }],
});
async function handleConfirm() {
  let validate = await Utils.validateForm(editFormRef.value);
  if (!validate) {
    Utils.showWarning("数据验证不通过，请检查输入。");
    return;
  }
}
关闭表单清空验证，封装方法为
mixin.clearDeepObj(editForm.data, editFormRef);

五、element-plus按需引入(为打包体积考虑)：
在src/global/register-element.ts的compoents中添加el组件名，会自动引入。
```
