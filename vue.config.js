const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
module.exports = {
	lintOnSave: false, //关闭eslint检测\
	devServer: {
		open: false,//项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
		proxy: {
			'/api': {
				// target: 'http://119.23.50.206:8686', //云
				target: 'http://192.168.2.169:8686', //家里
				// target: 'http://127.0.0.1:8686',
				changeOrigin: true, //是否允许跨域
				/*           pathRewrite: {
							'^/api': ''
						  } */
			}
		}
	},
	chainWebpack: config => {
		config.plugins.delete("prefetch") //取消预加载
	},
	configureWebpack: {
		plugins: [
			new CompressionWebpackPlugin({
				filename: "[path][base].gz",
				algorithm: 'gzip',
				test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
				threshold: 10240,
				minRatio: 0.8,
				deleteOriginalAssets: false,
			})
		]
	}
  
}
