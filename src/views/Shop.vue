<template>
    <admin-content
        :delAllSelection="delAllSelection"
        :addShopVisible="addShopVisible"
        @update:addShopVisible="addShopVisible = $event"
    >
        <template v-slot:queryTerms>
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
        </template>
        <template v-slot:tableContent>
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
                <el-table-column prop="shopName" label="商品名"></el-table-column>
                <el-table-column prop="originalPrice" label="价格"></el-table-column>
                <el-table-column label="图片(查看大图)" align="center">
                    <template #default="scope">
                        <el-image
                            class="table-td-thumb"
                            fit="contain"
                            :src="scope.row.coverImg"
                            :preview-src-list="[scope.row.coverImg]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="shopIntroduction" show-overflow-tooltip label="介绍"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template #default="scope">
                        <el-tag
                            :type="
                                scope.row.shopStatus === 1
                                    ? 'success'
                                    : scope.row.shopStatus === 0
                                    ? 'danger'
                                    : ''
                            "
                        >{{ scope.row.shopStatus == 1?'新品':'下架' }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="createAt" :formatter="dataFormat" label="上架时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <template v-slot:tablePage>
            <div class="block">
                <el-pagination
                    v-on:current-change="currentChange"
                    :current-page="page.pageNum"
                    :page-sizes="[10, 20, 30]"
                    :page-size="10"
                    layout="sizes, prev, pager, next, jumper,->,total"
                    :total="page.tableTotal"
                ></el-pagination>
            </div>
        </template>
        <template v-slot:addDialog>
            <el-dialog title="添加商品" v-model="addShopVisible" width="30%" top="8vh">
                <el-form ref="formRef" :rules="rules" :model="shopForm" label-width="80px">
                    <el-form-item label="商品名称" prop="shopName">
                        <el-input v-model="shopForm.shopName"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="商品价格"
                        prop="originalPrice"
                        :rules="[
			{ required: true, message: '价格不能为空'},
			{ type: 'number', message: '价格必须为数字值'}
			]"
                    >
                        <el-input v-model.number="shopForm.originalPrice" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="商品标签" prop="scId">
                        <el-select v-model="shopForm.scId" placeholder="请选择">
                            <el-option
                                v-for="(label,i) of shopLabelList"
                                :key="i"
                                :label="label.categoryName"
                                :value="label.scId"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否上架" prop="shopStatusBool">
                        <el-switch v-model="shopForm.shopStatusBool"></el-switch>
                    </el-form-item>
                    <el-form-item label="商品介绍" prop="shopIntroduction">
                        <el-input type="textarea" rows="5" v-model="shopForm.shopIntroduction"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-upload
                            ref="uploadRef"
                            class="upload"
                            drag
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :http-request="upLoadFile"
                            :on-success="upLoadSuccess"
                            :multiple="false"
                            name="file"
                            :file-list="fileList"
                            list-type="picture"
                        >
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">
                                将文件拖到此处，或
                                <em>点击上传</em>
                            </div>
                            <template #tip>
                                <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
                            </template>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="addShopVisible = false">取 消</el-button>
                        <el-button type="primary" v-on:click="saveShop">确 定</el-button>
                    </span>
                </template>
            </el-dialog>
        </template>
    </admin-content>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch, onMounted } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus';
import ajax from "../utils/ajax";
import moment from "moment";
import qs from "qs";
import AdminContent from "../components/AdminContent.vue"

export default defineComponent({
    components: { AdminContent },
    setup() {
        let data = ref({
            currentPage: 0,
            tableData: [],
            multipleSelection: [],
            addShopVisible: false,
            fileList: [] as any,
            shopLabelList: [] as any,
            shopForm: {
                originalPrice: "",
                shopName: "",
                shopIntroduction: "",
                scId: "",
                shopStatus: 1,
                shopStatusBool: true,
                coverImg: "",
            },
            selectForm: {},
            page: {
                tableTotal: 0,
                pageNum: 1,
                pageSize: 10,
            },
        });

        let {
            page,
            tableData,
            addShopVisible,
            fileList,
            shopForm,
            shopLabelList,
            multipleSelection,
        } = toRefs(data.value);
        let { shopStatusBool } = toRefs(shopForm.value);

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

        const formRef = ref();
        // 重置
        const formReset = () => {
            formRef.value.resetFields();
        };

        /** 加载商品标签 */
        let loadShopLabel = () => {
            ajax("/api/shop/getShopCategory", "")
                .then((result: any) => {
                    shopLabelList.value = result.data.data;
                })
                .catch((err) => {
                    console.error(err);
                });
        };
        /** 加载表格数据 */
        let loadTable = () => {
            ajax("/api/shop/getShopAll", { ...page.value })
                .then((result: any) => {
                    tableData.value = result.data.data.list;
                    page.value.tableTotal = result.data.data.total;
                    page.value.pageNum = result.data.data.pageNum;
                })
                .catch((err) => {
                    console.error(err);
                });
        };
        let currentChange = (val: number) => {
            console.log("下一页");
            page.value.pageNum = val;
            loadTable();
        };

        //上传图片
        let upLoadFile = (params: any) => {
            console.log(params);
            let formData = new FormData();
            formData.append("type", "1");
            formData.append("file", params.file);
            ajax("/api/aliyun/upLoad", formData, "POST")
                .then((res: any) => {
                    let results = res.data;

                    if (results.code === 200) {
                        let okList = {
                            name: params.file.name as string,
                            url: results.data as string,
                        };
                        fileList.value.push(okList);
                        shopForm.value.coverImg = results.data;
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        };
        const uploadRef = ref();

        let upLoadSuccess = (res: Response, file: File) => {
            console.log("res:" + res);
            console.log("file:" + file);
        };

        /** 保存商品 */
        let saveShop = () => {
            ajax(
                "/api/admin/shop/addShop",
                qs.stringify(shopForm.value),
                "POST"
            )
                .then((result) => {
                    console.log(result);
                    addShopVisible.value = false;
                    loadTable();
                    formReset();
                    uploadRef.value.submit();
                })
                .catch((err) => {
                    console.error(err);
                });
        };

        /** 单个删除 */
        const handleDelete = (index: number, row: any) => {
            // 二次确认删除
            ElMessageBox.confirm(`确定要删除${row.shopName}吗？`, "提示", {
                type: "warning",
            }).then(() => {
                ajax('/api/admin/shop/deleteShop', { shopId: row.shopId }).then((result: any) => {
                    if (result.data.code === 200) {
                        ElMessage.success({
                            message: '删除成功',
                            type: 'success'
                        });
                        tableData.value.splice(index, 1);
                    } else {
                        ElMessage({
                            message: result.data.message,
                            type: 'error'
                        });
                    }
                }).catch((err) => {
                    console.error(err);
                });
            })
        }

        /** 批量删除 */
        const delAllSelection = () => {
            let deleteList: Array<number> = [];
            let selection: any = multipleSelection.value;
            for (let i = 0; i < selection.length; i++) {
                deleteList.push(selection[i].shopId);
            }
            ajax('/api/admin/shop/deleteShops', qs.stringify({ shopIds: deleteList }, { indices: false }), 'POST').then((result: any) => {
                if (result.data.code === 200) {
                    ElMessage.success({
                        message: '删除成功',
                        type: 'success'
                    });
                    loadTable();
                } else {
                    ElMessage({
                        message: result.data.message,
                        type: 'error'
                    });
                }
            }).catch((err) => {
                console.error(err);
            });
            multipleSelection.value = [];
        }

        watch(shopStatusBool, (newStatus) => {
            shopForm.value.shopStatus = newStatus ? 1 : 0;
        });

        onMounted(() => {
            loadShopLabel();
            loadTable();
        });

        /** 格式化时间 */
        let dataFormat = (row: any, column: any, cellValue: any, index: any
        ) => {
            return moment(cellValue).utc().format('YYYY-MM-DD HH:ss:mm')
        };

        return {
            ...toRefs(data.value),
            toggleSelection,
            handleSelectionChange,
            multipleTable,
            upLoadSuccess,
            upLoadFile,
            saveShop,
            formRef,
            uploadRef,
            shopLabelList,
            currentChange,
            dataFormat,
            handleDelete,
            delAllSelection
        };
    },
});
</script>
