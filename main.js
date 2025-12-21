// main.js
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
import {
	http
} from './utils/request.js'


export function createApp() {
	const app = createSSRApp(App)
	app.config.globalProperties.$http = http // 全局可用（this.$http），注意：在组件中需要使用this.$http

	return {
		app
	}
}