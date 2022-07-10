<template>
  <div class="tabs">
    <el-tabs
      v-model="currentName"
      type="card"
      editable
      @tab-remove="handleTabsEdit"
      @tab-click="handleTabClick"
    >
      <el-tab-pane
        editable
        :key="tag.meta.title"
        v-for="tag in tags"
        :label="tag.meta.title"
        :name="tag.meta.title"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup lang="ts">
import * as Utils from "@/utils";
import { ref, reactive, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTabsStore } from "@/store/tabs";
const tabsStore = useTabsStore();

const currentName = ref("首页");
const tags = ref([]);
const router = useRouter();
const route = useRoute();
onMounted(() => {
  tags.value = tabsStore.tabsList;
  watch(
    () => route.path,
    () => {
      currentName.value = route.meta.title as string;
    },
    { immediate: true, deep: true }
  );
});
function handleClose(tag: any, index: any) {
  let length = tags.value.length - 1;
  tabsStore.closeTab(tag);
  if (tag.name !== route.name) {
    return;
  }
  if (index === length) {
    router.push({ path: tags.value[index - 1].path });
  } else {
    router.push({ path: tags.value[index].path });
  }
}
function changeMenu(item: any) {
  let params = {
    path: route.path,
    name: route.name,
    meta: { ...route.meta },
  };
  // router.push(item.path);
  // console.log({ route: route,.name });
  tabsStore.selectMenu(params);
  // debugger;
}
function handleTabsEdit(targetName: any, action: any) {
  let result = tags.value.findIndex(
    (item: any) => item.meta.title === targetName
  );
  handleClose(tags.value[result], result);
}
function handleTabClick(tab: any) {
  let result = tags.value.findIndex(
    (item: any) => item.meta.title === currentName.value
  );
  changeMenu(tags.value[result]);
  router.push({ path: tags.value[result].path });
}
</script>
<style lang="scss">
.tabs {
  // padding: 20px;
  line-height: 50px;
  margin-left: 18px;
  text-align: left;
  .el-tag {
    margin-right: 5px;
    cursor: pointer;
  }
  .dark {
    background: #409eff;
    border-color: #409eff !important;
    color: #fff !important;
    .el-tag__close {
      color: #fff !important;
    }
  }
  .plain {
    background: #fff;
  }
  .el-tag {
    color: #333;
    .el-tag__close {
      color: #333;
      &:hover {
        background: #cbcbce;
        font-weight: bolder;
      }
    }
    border-color: rgb(207, 204, 204);
  }
}
</style>
