<template>
  <el-dialog v-model="visible" title="上传" width="40%" @close="onFormClose">
    <el-form
      ref="editFormRef"
      :model="editForm.data"
      label-width="120px"
      :rules="editRules"
    >
      <!-- <el-form-item label="编码" prop='code'>
                <el-input v-model="editForm.data.code" />
            </el-form-item> -->
      <el-upload
        class="upload-demo"
        action=""
        :before-upload="beforeUpload"
        :on-preview="handlePreview"
        :http-request="httpRequest"
        :on-remove="handleRemove"
        :on-success="onSuccess"
        :on-error="onError"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button type="primary">点击上传</el-button>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500KB.
          </div>
        </template>
      </el-upload>
      <el-form-item label="编码" prop="code">
        <el-input v-model="editForm.data.code" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang='ts'>
import { FormRules, FormInstance } from "element-plus";
import { ref, reactive, onMounted } from "vue-demi";
import { ElMessage, ElMessageBox } from "element-plus";

import type { UploadProps, UploadUserFile } from "element-plus";
import * as Utils from "@/utils";
import mixin from "@/mixin";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const ui = reactive({
  editVisble: false,
});
let editForm = reactive({
  data: {
    code: "",
  },
});
const editFormRef = ref<FormInstance>();
const editRules = reactive<FormRules>({
  code: [{ min: 3, max: 5, message: "超出设置范围", trigger: "blur" }],
  name: [{ required: true, message: "不能为空", trigger: "blur" }],
  address: [{ required: true, message: "不能为空", trigger: "blur" }],
});
const fileList = ref<UploadUserFile[]>([]);
const fd = new FormData();
const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  console.log(uploadFile);
};
const beforeUpload: UploadProps["beforeUpload"] = (file) => {
  fd.append("file", file);
  console.log({ fd });
};
const onSuccess: UploadProps["onSuccess"] = (file) => {
  console.log({ file });
};
const onError: UploadProps["onError"] = (file) => {
  console.log({ file });
};
const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  );
};

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfert of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  );
};
onMounted(() => {});
function httpRequest() {}
function handeAdd() {
  ui.editVisble = true;
}
function handleEdit(row: any) {
  ui.editVisble = true;
  editForm.data = { ...row };
}
async function handleConfirm() {
  console.log({ fileList: fileList.value[0].name });
  //   console.log(editFormRef.value);
  //   let validate = await Utils.validateForm(editFormRef.value);
  //   if (!validate) {
  //     Utils.showWarning("数据验证不通过，请检查输入。");
  //     return;
  //   }
}
function onFormClose() {
  mixin.clearDeepObj(editForm.data, editFormRef);
  onEditClose();
}
const emit = defineEmits(["hideEdit"]);
const onEditClose = () => emit("hideEdit", "123Value");
</script>