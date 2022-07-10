<template>
  <div class="search">
    <el-form :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="queryForm.userName" placeholder="用户名" />
      </el-form-item>
      <el-form-item>
        <!-- <el-input v-focus></el-input> -->
        <el-button type="primary" v-auth="'system:user'">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-table class="table" :data="filteredTableData" style="width: 100%">
    <el-table-column prop="userName" label="用户名" width="180" />
    <el-table-column prop="realName" label="真实姓名" width="180" />
    <el-table-column
      prop="createTime"
      label="创建时间"
      :formatter="defaultTimeFormatter"
    />
    <el-table-column prop="updateTime" label="更新时间" />
  </el-table>
  <div class="example-pagination-block">
    <el-pagination layout="prev, pager, next" :total="1000" />
  </div>
</template>

<script setup lang="ts">
import * as Utils from "@/utils";
import mock from "@/mock";
import mixin from "@/mixin";
const defaultTimeFormatter = mixin.defaultTimeFormatter;
// const isButtonEnabled = mixin.isButtonEnabled;

const queryForm = reactive({
  userName: "",
});
const tableData = mock.userData;

const filteredTableData = computed(() => {
  const userName = queryForm.userName;
  if (!userName) {
    return tableData;
  }
  return tableData.filter((item) => {
    return item.userName.indexOf(userName) !== -1;
  });
});
</script>
<script lang='ts'>
export default {
  name: "User",
};
</script>

<style lang="scss">
</style>
