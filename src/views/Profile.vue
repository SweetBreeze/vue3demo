<template>
  <div>商品列表</div>
  <el-input v-model="queryForm.id"></el-input>
  <!-- <div>

<script>
import { ref, reactive } from "vue";
export default {
  name: "Profile",
  setup (props, context) {
    const queryForm = reactive({
      id: '',
    })
    return { queryForm };
  },
};
</script>
  </div> -->
  <!-- <script>
import { ref, reactive } from "vue";
export default {
  name: "Profile",
  setup (props, context) {
    const queryForm = reactive({
      id: '',
    })
    return { queryForm };
  },
};
</script> -->
</template>
<script lang='ts'>
export default {
  name: "Profile",
};
</script>

<script setup lang='ts'>
const queryForm: any = ref({});
</script>
