<template>
  <el-row>
    <el-col :span="10" align="left">
      <el-button size="large" type="primary" @click="handleUpload"
        >导入文件</el-button
      >
    </el-col>
    <el-col :span="12">
      <el-input v-model="queryForm.id"></el-input>
    </el-col>
  </el-row>
  <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column prop="code" label="编码" width="120" />
    <el-table-column prop="name" label="基地名称" width="120" />
    <el-table-column prop="address" label="地址" />
    <el-table-column prop="creator" label="创建人" />
    <el-table-column prop="" label="操作">
      <template #default="scope">
        <div>
          <el-button type="text" @click="handleHouseList(scope.row)"
            >大棚列表</el-button
          >
          <el-button type="text">设备列表</el-button>
          <el-button type="text">摄像头列表</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])"
      >Toggle selection status of second and third rows</el-button
    >
    <el-button @click="toggleSelection()">Clear selection</el-button>
  </div>
  <HouseList :visible="HouseListVisible" @hideEdit="hideEdit"></HouseList>
  <UploadFile
    :visible="uploadVisible"
    @hideEdit="uploadVisible = false"
  ></UploadFile>
</template>
<script lang='ts' setup>
import { ref } from "vue";
import HouseList from "components/HouseList.vue";
import UploadFile from "components/UploadFile.vue";

interface basicMap {
  code: number;
  name: string;
  address: string;
  creator: string;
}
const HouseListVisible = ref(false);
const uploadVisible = ref(false);
const queryForm = ref({});
const tableData: basicMap[] = [
  {
    code: 1,
    name: "基地1",
    address: "山东省青岛市小豆豆基地",
    creator: "陈小豆",
  },
  {
    code: 2,
    name: "基地2",
    address: "山东省青岛市小米米基地",
    creator: "陈悠米",
  },
  {
    code: 3,
    name: "基地3",
    address: "山东省青岛市小黏黏基地",
    creator: "陈小黏",
  },
];
function handleHouseList(row: any) {
  HouseListVisible.value = true;
}
function hideEdit(val: string) {
  HouseListVisible.value = false;
  console.log({ val });
}
function handleUpload() {
  uploadVisible.value = true;
}
</script>