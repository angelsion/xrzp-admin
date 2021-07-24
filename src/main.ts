import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
    ElContainer, ElButton, ElSelect, ElScrollbar, ElForm,
    ElFormItem, ElTable, ElDialog, ElAvatar, ElPagination,
    ElTableColumn, ElInput, ElImage, ElUpload,ElIcon,ElSwitch,
    ElInputNumber,ElRow,ElCol,ElFooter,ElMain,ElHeader,
    ElMenu,ElMenuItem,ElMenuItemGroup,ElSubmenu,ElDropdown,
    ElDropdownItem, ElDropdownMenu,ElDrawer,ElOption,ElAside,
    ElOptionGroup,  ElBreadcrumb,ElBreadcrumbItem,ElTag,
 
} from 'element-plus';
import 'element-plus/packages/theme-chalk/src/base.scss'
// import 'element-plus/lib/theme-chalk/index.css';

createApp(App).use(store).use(router)
    .use(ElButton).use(ElScrollbar).use(ElUpload)
    .use(ElSelect).use(ElForm).use(ElFormItem).use(ElAside)
    .use(ElTable).use(ElDialog).use(ElAvatar).use(ElSwitch)
    .use(ElPagination).use(ElTableColumn).use(ElInput)
    .use(ElImage).use(ElInputNumber).use(ElContainer)
    .use(ElRow).use(ElCol).use(ElFooter).use(ElDrawer)
    .use(ElMain).use(ElHeader).use(ElMenu).use(ElTag)
    .use(ElMenuItem).use(ElMenuItemGroup).use(ElIcon)
    .use(ElSubmenu).use(ElMenuItemGroup).use(ElDropdown)
    .use(ElDropdownItem).use(ElDropdownMenu).use(ElOption)
    .use(ElOptionGroup).use(ElBreadcrumb).use(ElBreadcrumbItem)
    .mount('#app');

router.beforeEach((to,from,next)=>{
    const userId = store.state.userId;
    console.log(store.state);
    if (to.meta.requireAuth){
        if (userId){
            next();
        }else {
           next({
               path: '/'
           });
        }
    }else {
        next();
    }
})
