<template>
	<scroll-view scroll-y="true" class="page">
		<view class="article-page">
			<view class="loading" v-if="loading">加载中...</view>
			<view class="error" v-else-if="error">
				{{ error }}
				<button @click="fetchArticle">重试</button>
			</view>
			<rich-text v-else :nodes="content" class="article-content" />
		</view>
	</scroll-view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app';

	const loading = ref(false);
	const error = ref('');
	const content = ref('');
	const articleUrl = ref('');

	// 从路由参数获取文章URL
	onLoad((options) => {
		if (options.url) {
			console.log(options.url)
			articleUrl.value = decodeURIComponent(options.url);
			fetchArticle();
		} else {
			error.value = "文章不存在"
		}
	});

	// 获取文章内容
	const fetchArticle = async () => {
		if (!articleUrl.value) return;

		loading.value = true;
		error.value = '';

		try {
			const res = await uni.request({
				url: articleUrl.value,
				method: 'GET',
			});
			console.log(res, 'xxxx')

			if (res.statusCode === 200) {
				const html = res.data;


				// 提取文章主体内容
				const startIndex = html.indexOf('<div id="img-content"');
				const endIndex = html.indexOf('<div id="js_tags_preview_toast"');

				if (startIndex !== -1 && endIndex !== -1) {
					let articleHtml = html.slice(startIndex, endIndex);

					// 简单清理
					articleHtml = articleHtml
						.replace(/data-src/g, 'src')
						.replace(/visibility:\s*hidden;\s*opacity:\s*0;/g, '');

					content.value = articleHtml;
					console.log(articleHtml)
				} else {
					error.value = '文章内容提取失败';
				}
			} else {
				error.value = '请求失败';
			}
		} catch (err) {
			error.value = '加载失败，请检查网络';
			console.error('获取文章失败:', err);
		} finally {
			loading.value = false;
		}
	};

	// 页面生命周期
	onMounted(() => {
		if (!articleUrl.value) {
			fetchArticle();
		}
	});
</script>

<style>
	.page {
		margin-top: 40rpx;
		height: 100vh;
	}

	.article-page {
		padding: 20rpx;

		min-height: 100vh;
		background: #fff;
	}

	.loading {
		text-align: center;
		padding: 100rpx 0;
		color: var(--uni-color-warning);
		font-size: 28rpx;
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

	.article-content {
		font-size: 32rpx;
		line-height: 1.8;
	}

	.article-content img {
		max-width: 100% !important;
		height: auto !important;
		margin: 20rpx 0;
	}

	.article-content p {
		margin: 20rpx 0;
	}

	.article-content h1,
	.article-content h2,
	.article-content h3 {
		margin: 40rpx 0 20rpx;
		font-weight: bold;
	}

	.article-content a {
		color: var(--uni-color-primary-main);
		word-break: break-all;
	}
</style>