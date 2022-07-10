<template>
  <section class="index-home">
    <div class="left-container">
      <header>vue3中文项目</header>
      <div class="menus">
        <el-menu
          :default-active="route.path"
          unique-opened
          text-color="#fff"
          active-text-color="#ffffff !important"
          style="border-right: none"
          router
        >
          <template v-for="(item, index) in allMenus">
            <el-sub-menu
              v-if="!item.leaf && item.visible"
              :index="index + ''"
              :key="item.tag"
              class="submenu"
              :class="index === activeNavIndex && 'is-active'"
            >
              <template #title>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item
                v-for="child in item.children"
                :index="child.path"
                :key="child.tag"
                v-show="child.visible"
                @click="menuItemClick(child)"
              >
                <span>{{ child.name }}</span>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item
              v-if="item.leaf && item.visible"
              :index="item.path"
              :key="item.tag"
              @click="menuItemClick(item)"
            >
              <span class="menu-title-1">{{ item.name }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
    </div>
    <div class="right-container">
      <div class="header-container">
        <div class="left-head">
          <i class="iconfont icon-discoverfill"></i>
          <i class="iconfont icon-selection"></i>
          <i class="iconfont icon-roundaddfill"></i>
          <i class="iconfont icon-game"></i>
          <i class="iconfont icon-light"></i>
          <i class="iconfont icon-rankfill"></i>
          <i class="iconfont icon-global"></i>
          <i class="iconfont icon-qitaleinongzuowu"></i>
          <i class="iconfont icon-nongzuowuzhongzishengchanjingyingxuke"></i>
        </div>
        <div class="right-head">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              {{ userName
              }}<el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="Plus" @click="dialogVisible = true"
                  >修改密码</el-dropdown-item
                >
                <el-dropdown-item :icon="CirclePlus" @click="handleLagout"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <section class="content-container">
        <div>
          <el-card>
            <div class="breadcrumb-container">
              <common-tab></common-tab>
            </div>
          </el-card>
          <div class="content-wrapper">
            <el-card style="padding: 20px">
              <router-view v-slot="{ Component }">
                <keep-alive :include="keepAliveList">
                  <component :is="Component" :key="route.path" />
                </keep-alive>
              </router-view>
            </el-card>
          </div>
          <div class="footer">
            <app-footer></app-footer>
          </div>
        </div>
      </section>
    </div>
  </section>
  <el-dialog v-model="dialogVisible" title="Tips" width="30%">
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import * as Utils from "../utils";
import * as nav from "../permission/nav";
import { MenuItem } from "../permission/menutree";
import {
  useRouter,
  useRoute,
  onBeforeRouteUpdate,
  RouterView,
} from "vue-router";
const router = useRouter();
const route = useRoute();

import CommonTab from "components/CommonTab.vue";
import { debug } from "console";
import { useTabsStore } from "@/store/tabs";
const tabsStore = useTabsStore();
const keepAliveList = computed<[]>(() => {
  return tabsStore.keepAliveList;
});

import { useAuthStore } from "@/store/auth";
const authStore = useAuthStore();

import { useUserStore } from "@/store/user";
const userStore = useUserStore();
const userName = userStore.user.userName;

const dialogVisible = ref(false);
const allMenus: MenuItem[] = reactive([]);

const displayRouteMap = reactive([{ name: "系统管理" }, { name: "用户管理" }]);

watch(
  route,
  () => {
    // 路由跳转要处理的
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  loadAvailButtons();
});
const menuItemClick = (item: any) => {
  const current = router;
  let params = {
    path: item.path,
    name: item.routeName,
    meta: {
      title: item.name,
    },
  };
  tabsStore.selectMenu(params);
  tabsStore.updateKeepList(params);
};
function loadAvailButtons() {
  // 从后台获得当前用户的权限列表（mock
  let availableTags = [
    "system",
    "system:user",
    "system:role",
    "profile",
    "echartmodel",
  ];
  // 获取菜单数据结构（前端定义）
  let menus: MenuItem[] = nav.getNavData();
  //   allMenus = menus;
  allMenus.length = 0;
  allMenus.push(...[...menus]);
  // 根据后端的权限列表确定可用的菜单及按钮
  // hiddenMenus(menus, availableTags);
  //   allMenus.push([]);
  //   allMenus.push(...[...menus]);
  authStore.setButtons(availableTags);
  let val = authStore.getAuth();
  console.log({ val: val });
}
function handleLagout() {
  router.push("/login");
}
// 根据后端返回的tags与前端定义的tags做diff，判断是否需要展示菜单
const hiddenMenus = (menus: MenuItem[], tags: Array<string>) => {
  for (let menu of menus) {
    if (menu.whiteList) {
      // 属于白名单，菜单项不需要隐藏
      menu.visible = true;
    } else {
      // 根据tag是否在列表中判断是否需要隐藏菜单项
      menu.visible = !(!compareTag(menu.tag, tags) || menu.hidden);
    }
    // 如果有子菜单，则递归检查
    if (menu.children) {
      hiddenMenus(menu.children, tags);
    }
  }
};
// 判断指定tag是否在数组tags中
const compareTag = (tag: string, tags: Array<string>) => {
  let flag = false;
  for (let t of tags) {
    if (t === tag) {
      flag = true;
      break;
    }
  }
  return flag;
};
</script>
<style lang="scss">
$header-height: 50px;
$navbar-width-full: 200px;
$navbar-width-mini: 64px;

$app-flag-color: #293846;
$app-header-color: #f3f3f4;

$aside-animation-duration: 0.2s;

$navbar-index: 2;
$header-index: 1;

$app-bg-color: #f0f2f5;
$nav-bar-bgc: #222832;
$nav-bar-active-color: #293846;
.index-home {
  position: absolute;
  margin: 0;
  padding: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  overflow: hidden;
  .left-container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: $navbar-width-full;
    background-color: $nav-bar-bgc;
    transition-duration: $aside-animation-duration;
    /*box-shadow: 0px 0px 10px 0.5px #425067;*/
    z-index: $navbar-index;
    overflow-y: auto;
    header {
      font-size: 25px;
      color: #fff;
      padding-top: 10px;
      width: 100%;
      text-align: center;
    }
    .el-menu {
      background: transparent;
      border-right: 0px;
    }
    .el-sub-menu__title,
    .el-menu-item {
      color: #fff;
      &:hover {
        background: #0b0d10;
      }
    }
  }
  .right-container {
    overflow-y: auto;
    position: absolute;
    top: 0;
    left: $navbar-width-full;
    right: 0;
    bottom: 0;
    transition-duration: $aside-animation-duration;
    .header-container {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: $header-height;
      padding: 0 30px 0 20px;
      border-bottom: 1px solid #e9e9e9;
      background-color: #fff;
      z-index: $header-index;
    }
    .content-container {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      padding-top: $header-height;
      padding: 10px;
      padding-bottom: 60px;
      .content-wrapper {
        width: 100%;
        box-sizing: border-box;
        min-height: 70vh;
        margin-top: 20px;
        .el-card {
          min-height: 70vh;
        }
      }
      .footer {
        text-align: center;
        color: #9ea7b4;
        background: #fff;
        z-index: 1000;
        position: fixed;
        bottom: 0;
        width: 100%;
        margin-left: -10px;
        border-top: 1px solid #e9e9e9;
      }
    }
  }
}
.el-card__body {
  padding: 0 !important;
  line-height: 40px;
}
.breadcrumb-container {
  min-height: 40px;
  .el-breadcrumb,
  .breadcrumb-inner {
    height: 100%;
  }
  .arrow-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .arrow-img {
    width: 12px;
    transform: rotate(180deg);
  }
  .breadcrumb-inner {
    display: flex;
    flex-wrap: nowrap;
    .e-b-item-1 {
      margin-left: 15px;
      .el-breadcrumb__inner {
        color: #606266 !important;
      }
    }
    .e-b-item-2 {
      .el-breadcrumb__inner {
        color: #333333 !important;
        font-weight: bold;
      }
    }

    .breadcrumb-back {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      border-left: 1px solid #e1e1e1;
      border-right: 1px solid #e1e1e1;
      cursor: default;
      & > img {
        width: 14px;
      }
    }
    .el-breadcrumb__item {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-size: 15px;
      // border-right: 1px solid #E1E1E1;
      .el-breadcrumb__inner {
        // color: #C8C8C8;
        // color: #777777;
        color: #999999;
        padding: 0 10px;
        font-size: 13.5px;
        cursor: text;
      }
      .el-breadcrumb__separator {
        display: none;
      }
      ._icon {
        width: 20px;
        margin-right: 1px;
      }
    }
  }
}
/*    ACTIVE*/
.el-sub-menu.is-active .el-sub-menu__title {
  background: transparent !important;
  color: #409eff !important;
}
.el-menu-item.is-active {
  background: transparent !important;
  color: #409eff !important;
}
</style>