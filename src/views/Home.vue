<template>
  <el-container class="home-container">
    <el-aside>
      <el-menu
        :uniqueOpened="true"
        default-active="shop"
        class="main-menu"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="1">
          <template #title>统计</template>
        </el-menu-item>
        <el-menu-item index="user">
          <template #title>客户管理</template>
        </el-menu-item>
        <el-menu-item index="shop">
          <template #title>商品管理</template>
        </el-menu-item>
        <el-menu-item index="4">
          <template #title>导航四</template>
        </el-menu-item>
        <el-submenu index="5">
          <template #title>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template #title>分组一</template>
            <el-menu-item index="5-1">选项1</el-menu-item>
            <el-menu-item index="5-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="5-3">选项3</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
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
  margin-top: 6px;
  background-color: aquamarine;
  .main-menu {
    height: 100%;
  }
  .top-breadcrumb {
    margin-top: 5px;
  }

}
</style>
