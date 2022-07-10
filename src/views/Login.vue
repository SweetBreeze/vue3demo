<template>
  <el-row class="login-window">
    <div class="login-box">
      <div class="lcname">富士康工厂</div>
      <div
        style="
          margin-bottom: 15px;
          font-size: 20px;
          font-weight: bold;
          color: rgb(59, 64, 68);
        "
      >
        用户登录
      </div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
        <el-form-item label="" prop="username">
          <el-input
            placeholder="用户"
            v-model="loginForm.username"
            size="small"
            autofocus
          >
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            type="password"
            placeholder="密码"
            v-model="loginForm.password"
            size="small"
            @keyup.enter.native="doLogin"
          >
          </el-input>
        </el-form-item>
        <el-button
          type="primary"
          style="
            height: 40px;
            border-radius: 5px;
            font-size: 18px;
            font-weight: bold;
            color: white;
            margin-top: 10px;
          "
          size="small"
          @click="submitForm(loginFormRef)"
          >登录</el-button
        >
      </el-form>
    </div>
  </el-row>
</template>

<script setup lang="ts">
import { FormInstance } from "element-plus";
import { useRouter } from "vue-router";
import * as Utils from "../utils";
import { useUserStore } from "@/store/user";
import { useTokenStore } from "@/store/token";
const userStore = useUserStore();
const loginFormRef = ref<FormInstance>();
const router = useRouter();
const loginForm = reactive({
  username: "",
  password: "",
});
const loginFormRules = reactive({
  username: [
    {
      required: true,
      message: "用户不能为空",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "用户不能为空",
      trigger: "blur",
    },
  ],
});
onMounted(() => {
  const tokenStore = useTokenStore();
  userStore.removeUser();
  tokenStore.removeToken();
});

const onSubmit = () => {
  console.log("submit!");
};
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      doLogin();
    } else {
      console.log("error submit!", fields);
    }
  });
};
const doLogin = async () => {
  let ret = await Utils.doPost("/api/sessions/login", loginForm);
  if (ret.success) {
    // 成功
    userStore.setUser(ret.data);
    router.push({
      path: "/profile",
    });
  } else {
    Utils.showWarning(String("登录失败：") + ret.message);
  }
};
</script> 


<style lang="scss">
.login-window {
  width: 100%;
  height: 100vh;
}
.el-button {
  width: 100%;
}
.login-box {
  position: absolute;
  top: 45%;
  left: 50%;
  width: 400px;
  margin-left: -200px;
  margin-top: -150px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  padding: 25px 20px 45px 20px;
  border-radius: 20px;
  background: #fff;
}
.lcname {
  position: absolute;
  top: -22%;
  left: 50%;
  color: rgb(59, 64, 68);
  width: 360px;
  margin-left: -180px;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
}

.language {
  text-align: center;
  padding: 5px 0px 0px;
}

.language .language-inner {
  color: #c0ccda;
  cursor: pointer;
}
</style>
