<template>
	<web-view 
		:src="articleUrl" 
		class="webview-container"
		v-if="articleUrl"
	/>
	<view v-else class="error">
		{{ error }}
		<button @click="reload">重新加载</button>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';

	const articleUrl = ref('');
	const error = ref('');

	onLoad((options) => {
		if (options.url) {
			articleUrl.value = decodeURIComponent(options.url);
			console.log('加载URL:', articleUrl.value);
		} else {
			error.value = "文章不存在";
		}
	});

	const reload = () => {
		location.reload();
	};
</script>

<style>
.webview-container {
	width: 100%;
	height: 100vh;
}

.error {
	text-align: center;
	padding: 100rpx 20rpx;
	color: var(--uni-color-error);
}

.error button {
	margin-top: 40rpx;
	padding: 20rpx 40rpx;
	background: var(--uni-color-error);
	color: white;
	border-radius: 8rpx;
}
</style>