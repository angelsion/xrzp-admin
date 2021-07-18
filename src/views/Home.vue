<template>
  <el-container class="home-container">
    <v-header />
    <el-container>
      <v-sidebar v-on:barCellback="breadcrumbReceive" />
      <el-container class="content-box content-scroll" :class="{ 'content-collapse': collapse }">
        <el-header>
          <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(val,i) of breadcrumb" :key="i">
                    {{val}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        </el-header>
        <!-- 内容区 -->
        <router-view></router-view>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { computed } from "vue";
import { useStore } from "vuex";
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
  setup() {
        const store = useStore();
        const collapse = computed(() => store.state.collapse);
        let breadcrumb = ref([] as string[]);
        const breadcrumbReceive = (list:string[])=>{
          breadcrumb.value = list;
          console.log(breadcrumb);
        }
        return {
            collapse,
            breadcrumbReceive,
            breadcrumb
        };
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
.home-container{
  border-bottom: 10px solid #1aa094;
  .content-scroll {
    overflow-y: scroll;
  }
}
</style>
