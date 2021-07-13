<template>
  <el-container class="shop-admin">
    <el-header class="shop-header" height>
      <el-row>
        <el-col :span="24">
          <fieldset>
            <legend>查询条件</legend>商品类别:
            <input type="text" />
            商品名称:
            <input type="text" />
          </fieldset>
        </el-col>
      </el-row>
      <el-row class="data-btn">
        <div>
          <el-button type="danger" round>危险按钮</el-button>
          <el-button type="primary" round>主要按钮</el-button>
          <el-button type="warning" round>警告按钮</el-button>
        </div>
      </el-row>
      <el-row>
        <el-button type="success">添加</el-button>
        <el-button type="danger">删除</el-button>
      </el-row>
    </el-header>
    <el-main>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="日期" width="120">
          <template #default="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </el-main>
    <el-footer height="40px">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="sizes, prev, pager, next, jumper,->,total"
          :total="300"
        ></el-pagination>
      </div>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";

export default defineComponent({
  setup() {
    let data = ref({
      currentPage: 0,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      multipleSelection: [],
    });

    let { tableData, multipleSelection } = toRefs(data.value);

    const multipleTable = ref();
    let toggleSelection = (rows: any) => {
      if (rows) {
        rows.forEach((row: any) => {
          multipleTable.value.toggleRowSelection(row);
        });
      } else {
        multipleTable.value.clearSelection();
      }
    };

    let handleSelectionChange = (val: any) => {
      multipleSelection.value = val;
    };

    return {
      ...toRefs(data.value),
      toggleSelection,
      handleSelectionChange,
      multipleTable,
    };
  },
});
</script>

<style lang="scss">
.shop-admin {
  & > .shop-header {
    .data-btn {
      margin-top: 10px;
      & > div {
        margin: 0 auto;
      }
    }
  }
}
</style>
