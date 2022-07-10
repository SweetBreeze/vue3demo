<template>
  <div class="search">
    <el-form :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item label="角色名">
        <el-input v-model="queryForm.roleName" placeholder="角色名" />
      </el-form-item>
    </el-form>
    <el-button type="primary">同步权限</el-button>
  </div>
  <el-table class="table" border :data="filteredTableData" style="width: 100%">
    <el-table-column prop="roleName" label="roleName" min-width="120" />
    <el-table-column prop="description" label="description" min-width="120" />
    <el-table-column
      prop="createTime"
      label="createTime"
      :formatter="defaultTimeFormatter"
    />
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default>
        <el-button type="text" size="default" @click="handleClick"
          >Detail</el-button
        >
        <el-button type="text" size="default" @click="handleOpen"
          >授权</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <!-- 授权对话框 //-->
  <el-dialog title="授权" v-model="ui.permsDialogVisible">
    <div class="permsTree">
      <el-tree
        :data="allPermissions"
        show-checkbox
        default-expand-all
        node-key="tag"
        :props="defaultTreeProps"
        ref="treeRef"
      >
      </el-tree>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="ui.permsDialogVisible = false" size="default"
        >取消</el-button
      >
      <el-button
        type="primary"
        @click.native="handlePermsUpdate()"
        size="default"
        >确认</el-button
      >
    </div>
  </el-dialog>
</template>
<script name='Role' lang='ts' setup>
// 引入useRoute,获取是route
import { useRoute } from "vue-router";
import mock from "@/mock";
import mixin from "@/mixin";
import * as nav from "@/permission/nav";

const tableData = mock.roleData;

//查询表单
const queryForm = reactive({
  roleName: "",
});
const route = useRoute();
//计算属性返回表单查询
const filteredTableData = computed(() => {
  const roleName = queryForm.roleName;
  if (roleName === "") {
    return tableData;
  }
  return tableData.filter(function (item) {
    return item.roleName.indexOf(roleName) !== -1;
  });
});
const defaultTreeProps = reactive({ label: "name", children: "children" });
let ui = reactive({
  permsDialogVisible: false,
});
// 权限树的数据
let allPermissions = ref([]);
const defaultTimeFormatter = mixin.defaultTimeFormatter;
const testTree = mock.testTree;
// 使用this获取ref标志dom
let currentInstance = getCurrentInstance();
onMounted(() => {
  console.log(route.query); //结果为{name:'首页'}
});
// 打开授权窗口
async function handleOpen() {
  await loadPermsDialogData();
  ui.permsDialogVisible = true;
}
const handleClick = () => {
  console.log("click");
};
// 加载授权框内的数据
// 授权对话框中加载权限信息
async function loadPermsDialogData() {
  let result = mock.permissiontag;
  let permissins = nav.getPermissionTree(result);
  allPermissions.value = permissins;
  // console.log({ allPermissions })
  // var selectedPermissions = loadAllPermsByRoleId(this.permsEditForm.roleId);
  // currentInstance.ctx.$refs.treeRef.setCheckedKeys(allPermissions);
}
// 加载被选择角色的可用菜单项
function loadAllPermsByRoleId(roleId) {
  // const result = await Utils.doGet(this, '/api/admin/roleperms/' + roleId);
  // if (result.success) {
  //     // 保存修改之前的权限列表，以备后面更新之前比较
  //     this.permsEditForm.oldPerms = result.data;
  //     return result.data;
  // } else {
  //     Utils.showWarning(String('加载列表失败!') + result.message);
  // }
  // return [];
}
// 更新权限
function handlePermsUpdate() {
  let keys = currentInstance.ctx.$refs.treeRef
    .getCheckedKeys()
    .concat(currentInstance.ctx.$refs.treeRef.getHalfCheckedKeys());
  console.log({ keys });
  // let oldPerms = permsEditForm.oldPerms;
  // if (keys.length === oldPerms.length) { // 两个数组要相同，首先长度要一样
  //     var oldPermsSet = new Set(oldPerms);
  //     var diffArr = keys.filter((item: any) => { // 计算两个数组的不同内容
  //         return !oldPermsSet.has(item);
  //     });
  //     if (diffArr.length === 0) { // 两个数组完全相同，代表权限没有更新
  //         this.ui.permsDialogVisible = false;
  //         Utils.showInfo(String('权限没有变化。'));
  //         console.log('All permissions are same, no need to update.');
  //         return;
  //     }
  // }

  // this.permsEditForm.selectedPermissions = keys;
  // var result = await Utils.doPut(this, '/api/admin/roleperms/' + this.permsEditForm.roleId, this.permsEditForm);
  // if (result.success) {
  //     Utils.showSuccess(String('更新成功!'));
  //     this.ui.permsDialogVisible = false;
  // } else {
  //     Utils.showWarning(String('更新记录失败！原因：') + result.message);
  // }
}
</script>
<script lang='ts'>
export default {
  name: "Role",
};
</script>
<style lang="scss">
.el-button {
  width: auto;
}
</style>
