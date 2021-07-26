<template>
  <el-container class="shop-category">
    <el-header class="shop-header" height>
      <el-row>
        <el-col :span="24">
          <fieldset>
            <legend>查询条件</legend>
            <el-form label-position="right" label-width="80px" :model="selectForm">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="名称">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="活动区域">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="活动形式">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </fieldset>
        </el-col>
      </el-row>
      <el-row class="data-btn">
        <div>
          <el-button type="danger" round>查询</el-button>
          <el-button type="primary" round>重置</el-button>
          <el-button type="warning" round>导出</el-button>
        </div>
      </el-row>
      <el-row>
        <el-button type="success" v-on:click="addShopVisible = true">添加</el-button>
        <el-button type="danger" v-on:click="delAllSelection">删除</el-button>
      </el-row>
    </el-header>
            <el-main>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                tooltip-effect="light"
                v-on:selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="categoryName" width="120" label="分类名称"></el-table-column>
            </el-table>
        </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent , onMounted, reactive, toRefs} from 'vue'
import ajax from '../utils/ajax'

export default defineComponent({
    setup() {
        let data = reactive({
            tableData: [],
            page: {
                tableTotal: 0,
                pageNum: 1,
                pageSize: 10,
            },
        })
        let {tableData,page} = data;

        /** 加载表格数据 */
        let loadTable = () => {
            ajax("/api/shop/getShopCategory", { ...page })
                .then((result: any) => {
                    data.tableData = result.data.data;
                    page.tableTotal = result.data.data.total;
                    page.pageNum = result.data.data.pageNum;
                })
                .catch((err) => {
                    console.error(err);
                });
        };
        
        onMounted(()=>{
         loadTable();
         console.log(tableData);   
        })

        return {...toRefs(data)}
    },
})
</script>


<style lang="scss">
.shop-category {
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