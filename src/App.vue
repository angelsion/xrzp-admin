<template>
    <el-container>
        <el-header class="header">
            <el-page-header content="详情页面"></el-page-header>
        </el-header>
        <router-view />
        <el-footer>
			
		</el-footer>
    </el-container>
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
.header{
	background-color: #2c3e50;
}
</style>
