<template>
  <el-container class="main-container">
    <el-header class="header">
      <el-row>
        <el-col :span="2">
          <h3>夏日粥品</h3>
        </el-col>
        <el-col :span="19"></el-col>
        <el-col :span="3">
			<el-row>
				<el-col :span="12">
					<p>admin</p>
				</el-col>
				<el-col :span="12">
					<el-avatar :size="45" :src="circleUrl" class="tx-img"></el-avatar>
				</el-col>
			</el-row>
        </el-col>
      </el-row>
    </el-header>
    <router-view />
  </el-container>
</template>

<style lang="scss">
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
}
.main-container {
  height: 100%;
  .header {
    background-color: #2c3e50;
    color: white;
	.tx-img{
		margin-top: 7px;
	}
  }
}
</style>
