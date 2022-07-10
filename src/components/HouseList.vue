<template>
  <div>
    <el-dialog v-model="visible" title="Tips" width="50%" @close="onEditClose">
      <el-row>
        <el-button type="primary" @click="handeAdd">新增</el-button>
      </el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="code" label="编码" width="120" />
        <el-table-column prop="name" label="基地名称" width="120" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="creator" label="创建人" />
        <el-table-column prop="" label="操作">
          <template #default="scope">
            <div>
              <el-button type="text" @click="handleEdit(scope.row)"
                >修改</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible = false">Cancel</el-button>
          <el-button type="primary" @click="visible = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  <el-dialog
    v-model="ui.editVisble"
    title="修改"
    width="40%"
    @close="onFormClose"
  >
    <el-form
      ref="editFormRef"
      :model="editForm.data"
      label-width="120px"
      :rules="editRules"
    >
      <el-form-item label="编码" prop="code">
        <el-input v-model="editForm.data.code" />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="editForm.data.name" />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="editForm.data.address" />
      </el-form-item>
      <el-form-item>
        <el-button @click="ui.editVisble = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup lang='ts'>
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
const tableData = [
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
let editForm = reactive({
  data: {
    code: "",
  },
});
// const editForm = reactive({
//   code: "",
// });

const editFormRef = ref<FormInstance>();
const editRules = reactive<FormRules>({
  code: [{ min: 3, max: 5, message: "超出设置范围", trigger: "blur" }],
  name: [{ required: true, message: "不能为空", trigger: "blur" }],
  address: [{ required: true, message: "不能为空", trigger: "blur" }],
});
onMounted(() => {});
function handeAdd() {
  ui.editVisble = true;
}
function handleEdit(row: any) {
  ui.editVisble = true;
  editForm.data = { ...row };
}
async function handleConfirm() {
  console.log(editFormRef.value);
  let validate = await Utils.validateForm(editFormRef.value);
  if (!validate) {
    Utils.showWarning("数据验证不通过，请检查输入。");
    return;
  }
}
function onFormClose() {
  mixin.clearDeepObj(editForm.data, editFormRef.value);
}
const emit = defineEmits(["hideEdit"]);
const onEditClose = () => emit("hideEdit", "123Value");
</script>