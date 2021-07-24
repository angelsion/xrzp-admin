<template>
    <el-container class="content-admin">
        <el-header class="content-header" height>
            <slot name="queryTerms"></slot>
            <el-row class="data-btn">
                <div>
                    <el-button type="danger" round>查询</el-button>
                    <el-button type="primary" round>重置</el-button>
                    <el-button type="warning" round>导出</el-button>
                </div>
            </el-row>
            <el-row>
                <el-button type="success" v-on:click="updateAddShopVisible">添加</el-button>
                <el-button type="danger" v-on:click="delAllSelection">删除</el-button>
            </el-row>
        </el-header>
        <el-main>
            <slot name="tableContent"></slot>
        </el-main>
        <el-footer height="40px">
            <slot name="tablePage"></slot>
        </el-footer>
        <!-- 编辑弹出框 -->
        <slot name="addDialog"></slot>
    </el-container>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
    props: {
        addShopVisible:Boolean,
        delAllSelection:Function
    },
    setup(props,context) {
        let updateAddShopVisible = ()=>{
            context.emit('update:addShopVisible',true)
        }
        
        return {
            updateAddShopVisible,
            ...toRefs(props)
        }
    },
})
</script>


<style lang="scss">
.content-admin {
    & > .content-header {
        .data-btn {
            margin-top: 10px;
            & > div {
                margin: 0 auto;
            }
        }
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
}
</style>