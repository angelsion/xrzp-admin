<template>
    <el-container class="home-container">
        <v-header />
        <el-container>
            <v-sidebar />
            <el-container>
                <el-header>
                    <el-breadcrumb separator-class="el-icon-arrow-right" class="top-breadcrumb">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-header>
                <!-- 内容区 -->
                <router-view></router-view>
            </el-container>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VHeader from "../components/Header.vue";
import VSidebar from "../components/Sidebar.vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
    name: "Home",
    components: {
        HelloWorld,
        VHeader,
        VSidebar,
    },
    methods: {
        handleOpen(key: any, keyPath: any) {
            console.log(key, keyPath);
        },
        handleClose(key: any, keyPath: any) {
            console.log(key, keyPath);
        },
    },
});
</script>

<style lang="scss">
.home-container {

}
</style>
