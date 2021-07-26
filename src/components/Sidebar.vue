<template>
    <el-aside class="sidebar">
        <el-menu @select="breadcrumb" class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </el-aside>
</template>

<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
    setup(props,context) {
        const items = [
            {
                icon: "el-icon-s-home",
                index: "/dashboard",
                title: "系统首页",
            },
            {
                icon: "el-icon-user",
                index: "/table",
                title: "客户管理",
            },
            {
                icon: "el-icon-present",
                index: "3",
                title: "活动管理",
                subs: [
                    {
                        index: "/form",
                        title: "优惠券",
                    },
                    {
                        index: "/upload",
                        title: "满减",
                    }
                ],
            },
            {
                icon: "el-icon-s-order",
                index: "/icon",
                title: "订单管理",
            },
            {
                icon: "el-icon-apple",
                index: "/i18n",
                title: "待定",
            },
            {
                icon: "el-icon-s-shop",
                index: "7",
                title: "商品管理",
                subs: [
                    {
                        index: "ShopCategory",
                        title: "商品标签",
                    },
                    {
                        index: "/home/shop",
                        title: "商品",
                    },
                ],
            },
        ];

        const route = useRoute();

        const onRoutes = computed(() => {
            return route.path;
        });

        const store = useStore();
        const collapse = computed(() => store.state.collapse);
        let breadcrumbNames = [];
        const breadcrumb = (lv1,lv2)=>{
            items.forEach(element => {
                if (element.index === lv2[0]){
                    breadcrumbNames.push(element.title);
                    if (element.subs){
                        element.subs.forEach(element => {
                            if (element.index === lv1){
                                breadcrumbNames.push(element.title);
                            }
                        });
                    }
                }
            });
            context.emit('barCellback',breadcrumbNames);
        }
        return {
            items,
            onRoutes,
            collapse,
            breadcrumb
        };
    },
};
</script>

<style lang="scss">
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 80px;
        bottom: 0;
        overflow-y: scroll;
        & > ul {
            height: 100%;
        }
    }
    .sidebar::-webkit-scrollbar {
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }
</style>
