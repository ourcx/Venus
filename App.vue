<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import './uni.scss';
	@import 'styles/common.scss';
	page {
		background-color: #f5f5f5;
	}
	
	.flex {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.al {
		display: flex;
		align-items: center;
	}
	
	.js {
		display: flex;
		justify-content: center;
	}
	
	.flrow {
		display: flex;
		flex-direction: row;
	}
	
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
	
	/* 在app.vue中全局隐藏滚动条 */
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
</style>
