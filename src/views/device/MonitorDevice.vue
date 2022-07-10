<template>
  <div class="monitor-device">
    <div class="left-ctx tree-container">
      <el-tree
        class="tree"
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick"
      />
    </div>
    <!-- <div class="center-ctx">
            <div class="echarts-box">
                <div id="myEcharts" :style="{ width: '300px', height: '300px' }"></div>
            </div>
        </div> -->
    <div class="right-ctx">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </div>
  </div>
</template>
<script lang='ts' setup>
// import * as echarts from "echarts";
interface Tree {
  label: string;
  children?: Tree[];
}
const handleNodeClick = (data: Tree) => {
  console.log(data);
};
onMounted(() => {
  // initChart();
});
onUnmounted(() => {
  // echarts.dispose;
});
const data: Tree[] = [
  {
    label: "小豆农业公司",
    children: [
      {
        label: "1号基地",
        children: [
          {
            label: "1号大棚设备",
            children: [
              {
                label: "气温",
              },
              {
                label: "天气",
              },
              {
                label: "土壤",
              },
              {
                label: "湿度",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "米米农业公司",
    children: [
      {
        label: "1号基地",
        children: [
          {
            label: "气象站设备",
          },
        ],
      },
      {
        label: "2号基地",
        children: [
          {
            label: "2号大棚设备",
          },
        ],
      },
    ],
  },
  {
    label: "小黏农业公司",
    children: [
      {
        label: "1号基地",
        children: [
          {
            label: "1号大棚",
          },
        ],
      },
      {
        label: "2号基地",
        children: [
          {
            label: "2号大棚",
          },
        ],
      },
    ],
  },
];
// 基础配置一下Echarts
// function initChart() {
//   let chart = echarts.init(document.getElementById("myEcharts"), "");
//   // 把配置和数据放这里
//   chart.setOption({
//     xAxis: {
//       type: "category",
//       data: [
//         "一月",
//         "二月",
//         "三月",
//         "四月",
//         "五月",
//         "六月",
//         "七月",
//         "八月",
//         "九月",
//         "十月",
//         "十一月",
//         "十二月",
//       ],
//     },
//     tooltip: {
//       trigger: "axis",
//     },
//     yAxis: {
//       type: "value",
//     },
//     series: [
//       {
//         data: [820, 932, 901, 934, 1290, 1330, 1320, 801, 102, 230, 4321, 4129],
//         type: "line",
//         smooth: true,
//       },
//     ],
//   });
//   window.onresize = function () {
//     //自适应大小
//     chart.resize();
//   };
// }
</script>
<style lang="scss" scoped>
.monitor-device {
  display: flex;
  justify-content: space-between;
  .left-ctx {
    width: 25%;
    min-height: 60vh;
    border: 1px solid gray;
  }
  .center-ctx {
    width: 40%;
  }
  .right-ctx {
    width: 30%;
  }
}
/* 树形结构节点添加连线 */
.tree :deep(.el-tree-node) {
  position: relative;
  padding-left: 16px;
}

.tree :deep(.el-tree-node__children) {
  padding-left: 16px;
}

.tree :deep(.el-tree-node :last-child:before) {
  height: 38px;
}

.tree :deep(.el-tree) > .el-tree-node:before {
  border-left: none;
}
.tree-container {
  padding-top: 55px;
  overflow: hidden !important;
}
.tree-container :deep(.el-tree) > .el-tree-node:after {
  border-top: none;
}

.tree :deep(.el-tree-node:before) {
  content: '';
  left: -4px;
  position: absolute;
  right: auto;
  border-width: 1px;
}

.tree :deep(.el-tree-node:after) {
  content: '';
  left: -4px;
  position: absolute;
  right: auto;
  border-width: 1px;
}
.tree :deep(.el-tree-node__expand-icon.is-leaf) {
  display: none;
}

.tree :deep(.el-tree-node:before) {
  border-left: 1px dashed #b8b9bb;
  bottom: 0px;
  height: 100%;
  top: -26px;
  width: 1px;
}

.tree :deep(.el-tree-node:after) {
  border-top: 1px dashed #b8b9bb;
  height: 20px;
  top: 12px;
  width: 19px;
}
.tree :deep(.el-tree-node__content) {
  padding: 0px !important;
  // padding: 0 5px;
}
.tree :deep(.el-tree-node__label) {
  // padding-left: 10px;
}
.tree :deep(.el-tree-node.is-current) > .el-tree-node__content {
  background-color: rgba(24, 144, 255, 1) !important;
  width: 80%;
  color: #fff;
  border-radius: 6px;
}
.tree :deep(.el-tree-node__content) {
  &:hover {
    background-color: gary;
    border-radius: 6px;
    width: 80%;
  }
}
</style>