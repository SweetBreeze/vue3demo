<template>
    <!-- reade 
1.defineProps和defineEmits是编译器宏(compiler macros)
只能在<script setup>中使用，不需要被导入，并且在处理<script setup>时被编译掉。
2.传递给defineProps和defineEmits的选项将被从setup中提升到模块范围。
因此，这些选项不能引用在setup作用域内声明的局部变量，会导致一个编译错误。
但是，可以引用导入的绑定，也在模块范围内。

 -->
    <h2>{{count}}</h2>
    <el-button @click="$emit('addClick')" size='large' type='primary' style="width:50px">+1</el-button>
    <el-button @click="decrement" size='large' type='primary' style="width:50px">-1</el-button>
</template>
<script setup lang='ts'>
// 接收props,并返回一个对象，可以在js中使用props来获取传入的数据。
const props = defineProps({
  count: {
    type: Number,
    default: 0,
  },
});
// 声明需要触发的事件，返回一个emit函数，作用和this.$emit函数作用是一致的。
const emit = defineEmits(["addClick", "decrementClick"]);
const decrement = () => emit("decrementClick");
</script>
