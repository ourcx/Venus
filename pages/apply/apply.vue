<template>
	<view class="apply-container uni-theme-green">
		<!-- 主要内容 -->
		<scroll-view class="main-content" scroll-y>
			<!-- 欢迎头 -->
			<view class="welcome-section">
				<view class="welcome-card primary-card">
					<view class="welcome-header">
						<view class="welcome-icon">
							<uni-icons type="hand-up" size="50" color="var(--uni-color-primary-main)" />
						</view>
						<view class="welcome-title">
							<text class="welcome-main-text">星河圆梦 · 招新报名</text>
							<text class="welcome-sub-text"> 相遇绿色夏天</text>
						</view>
					</view>

					<view class="welcome-steps">
						<view class="step-item">
							<view class="step-number bg-primary-main">3</view>
							<text class="step-text">加入招新群</text>
						</view>
						<view class="step-connector"></view>
						<view class="step-item">
							<view class="step-number bg-primary-light">1</view>
							<text class="step-text">下载报名表</text>
						</view>
						<view class="step-connector"></view>
						<view class="step-item">
							<view class="step-number bg-primary-lighter">2</view>
							<text class="step-text">上传至飞书</text>
						</view>

					</view>
				</view>
			</view>
			<!-- 加入招新群 -->
			<view class="apply-section">
				<view class="section-header">
					<view class="section-icon">
						<uni-icons type="chat-filled" size="28" color="var(--uni-color-primary-dark)" />
					</view>
					<text class="section-title">加入招新群</text>
				</view>

				<view class="section-card">
					<view class="section-content">
						<text class="content-text">加入官方招新群，获取最新资讯和答疑</text>
					</view>

					<view class="qrcode-preview" @click="displayQRcode('center')">
						<view class="qrcode-placeholder">
							<uni-icons type="scan" size="60" color="var(--uni-color-primary-light)" />
							<text class="qrcode-hint">点击查看二维码</text>
						</view>
					</view>
				</view>
			</view>


			<!-- 获取报名文件 -->
			<view class="apply-section">
				<view class="section-header">
					<view class="section-icon">
						<uni-icons type="download-filled" size="28" color="var(--uni-color-primary-dark)" />
					</view>
					<text class="section-title">获取报名文件</text>
				</view>

				<view class="section-card">
					<view class="section-content">
						<text class="content-text">请选择报名类型，下载对应的报名文件</text>
					</view>

					<view class="selection-area">
						<view class="selection-header">
							<text class="selection-title">选择报名类型</text>
							<text class="selection-required">* 必选</text>
						</view>

						<radio-group @change="changeRadio" class="type-selection">
							<label class="type-option" :class="{ active: fileType === 'member' }">
								<view class="option-content">
									<view class="option-icon">
										<uni-icons type="person" size="24"
											:color="fileType === 'member' ? 'var(--uni-color-success)' : 'var(--uni-color-primary-main)'" />
									</view>
									<view class="option-info">
										<text class="option-title">营员报名</text>
										<text class="option-desc">参与志愿服务的基本成员</text>
									</view>
									<radio value="member" :checked="fileType === 'member'"
										color="var(--uni-color-primary-main)" />
								</view>
							</label>

							<label class="type-option" :class="{ active: fileType === 'photo' }">
								<view class="option-content">
									<view class="option-icon">
										<uni-icons type="camera" size="24"
											:color="fileType === 'photo' ? 'var(--uni-color-success)' : 'var(--uni-color-primary-main)'" />
									</view>
									<view class="option-info">
										<text class="option-title">摄影总监</text>
										<text class="option-desc">负责活动摄影记录工作</text>
									</view>
									<radio value="photo" :checked="fileType === 'photo'"
										color="var(--uni-color-primary-main)" />
								</view>
							</label>

							<label class="type-option" :class="{ active: fileType === 'editor' }">
								<view class="option-content">
									<view class="option-icon">
										<uni-icons type="gear" size="24"
											:color="fileType === 'editor' ? 'var(--uni-color-success)' : 'var(--uni-color-primary-main)'" />
									</view>
									<view class="option-info">
										<text class="option-title">图文总监</text>
										<text class="option-desc">负责文案编辑与内容创作</text>
									</view>
									<radio value="editor" :checked="fileType === 'editor'"
										color="var(--uni-color-primary-main)" />
								</view>
							</label>
						</radio-group>
					</view>

					<button class="download-btn primary-btn gradient-primary" :disabled="!fileType"
						:class="{ disabled: !fileType }" @click="downFile">
						<uni-icons type="download-filled" size="24" color="var(--uni-text-color-inverse)" />
						复制报名文件短链
						<text v-if="fileType" class="file-type">({{ getFileTypeName() }})</text>
					</button>

					<view class="section-tip">
						<uni-icons type="info-circle" size="16" color="var(--uni-color-warning)" />
						<text class="tip-text">请先选择报名类型再复制文件短链</text>
					</view>
				</view>
			</view>

			<!-- 上传报名文件 -->
			<view class="apply-section">
				<view class="section-header">
					<view class="section-icon">
						<uni-icons type="upload-filled" size="28" color="var(--uni-color-primary-dark)" />
					</view>
					<text class="section-title">上传报名文件</text>
				</view>

				<view class="section-card">
					<view class="section-content">
						<text class="content-text">填写好报名表后，请上传至飞书报名通道</text>
					</view>

					<view class="upload-guide">
						<view class="guide-step">
							<view class="step-marker">1</view>
							<text class="guide-text">下载并填写报名表</text>
						</view>
						<view class="guide-step">
							<view class="step-marker">2</view>
							<text class="guide-text">点击下方按钮跳转飞书</text>
						</view>
						<view class="guide-step">
							<view class="step-marker">3</view>
							<text class="guide-text">上传填写好的报名表</text>
						</view>
					</view>

					<button class="upload-btn primary-outline-btn" @click="toFeiShu">
						<uni-icons type="upload-filled" size="24" color="var(--uni-color-primary-main)" />
						跳转飞书上传
					</button>

					<view class="section-tip">
						<uni-icons type="info-circle" size="16" color="var(--uni-color-primary-main)" />
						<text class="tip-text">跳转后请按页面提示完成上传</text>
					</view>
				</view>
			</view>


			<!-- 底部提示 -->
			<view class="bottom-tips">
				<view class="tips-card">
					<view class="tips-header">
						<uni-icons type="lightbulb" size="24" color="var(--uni-color-warning)" />
						<text class="tips-title">温馨提示</text>
					</view>
					<view class="tips-content">
						<text class="tip-item">1. 请确保填写信息真实有效</text>
						<text class="tip-item">2. 如有疑问，可在招新群内咨询</text>
						<text class="tip-item">3. 报名截止时间：2024年12月31日</text>
						<text class="tip-item">4. 我们将在3个工作日内回复审核结果</text>
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- 二维码弹窗 -->
		<uni-popup ref="popup" type="center" background-color="#fff">
			<view class="popup-content">
				<view class="popup-header">
					<text class="popup-title">招新群二维码</text>
					<uni-icons type="closeempty" size="24" color="var(--uni-text-color-grey)" @click="closePopup" />
				</view>
				<view class="qrcode-image">
					<image src="https://s2.loli.net/2025/11/15/fQ5bv8o2cxuC9da.jpg" mode="aspectFit"
						class="qrcode-img" />
				</view>
				<view class="popup-footer">
					<text class="footer-text">使用微信扫描二维码加入群聊</text>
					<button class="save-btn primary-btn" @click="saveQRCode">
						<uni-icons type="download-filled" size="20" color="var(--uni-text-color-inverse)" />
						保存二维码
					</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	const fileType = ref('')
	const popup = ref(null)

	const toFeiShu = () => {
		uni.navigateToMiniProgram({
			shortLink: '#小程序://智能问卷/5wDK8hpcVC5byjs',
			success: (res) => {
				console.log('跳转成功', res)
				uni.showToast({
					title: '跳转成功',
					icon: 'success'
				})
			},
			fail: (err) => {
				console.error('跳转失败', err)
				uni.showToast({
					title: '跳转失败，请稍后重试',
					icon: 'none'
				})
			}
		})
	}

	const displayQRcode = () => {
		if (popup.value) {
			popup.value.open('center')
		}
	}

	const downFile = () => {
	  if (!fileType.value) {
	    uni.showToast({
	      title: '请先选择报名类型',
	      icon: 'none'
	    })
	    return
	  }
	  
	  console.log('选择了报名表', fileType.value)
	  
	  let url = ''
	  let fileName = ''
	  let tips = ''
	  
	  // 定义每个类型的下载链接和提示信息
	  switch (fileType.value) {
	    case 'member':
	      url = 'https://easylink.cc/usm7wi'
	      fileName = '星河圆梦-营员报名表.docx'
	      tips = '营员报名表链接已复制，请在浏览器中打开下载'
	      break
	    case 'photo':
	      url = 'https://easylink.cc/ey5ayp'
	      fileName = '星河圆梦-摄影总监报名表.docx'
	      tips = '摄影总监报名表链接已复制，请在浏览器中打开下载'
	      break
	    case 'editor':
	      url = 'https://easylink.cc/6k7cud'
	      fileName = '星河圆梦-图文总监报名表.docx'
	      tips = '图文总监报名表链接已复制，请在浏览器中打开下载'
	      break
	  }
	  
	  // 复制链接到剪贴板
	  uni.setClipboardData({
	    data: url,
	    success: () => {
	      console.log('链接复制成功:', url)
	      
	      // 显示成功提示
	      uni.showToast({
	        title: '链接已复制',
	        icon: 'success',
	        duration: 2000
	      })
	      
	      // 延迟显示详细提示
	      setTimeout(() => {
	        uni.showModal({
	          title: '下载指引',
	          content: `${tips}\n\n下载步骤：\n1. 打开手机浏览器\n2. 粘贴并访问复制的链接\n3. 下载${fileName}`,
	          showCancel: false,
	          confirmText: '我知道了',
	          success: (res) => {
	            if (res.confirm) {
	              // 可以在这里添加额外的逻辑，比如跳转到浏览器
	            }
	          }
	        })
	      }, 1000)
	    },
	    fail: (err) => {
	      console.error('复制失败:', err)
	      uni.showToast({
	        title: '复制失败，请手动复制链接',
	        icon: 'none',
	        duration: 3000
	      })
	      
	      // 如果复制失败，直接显示链接让用户手动复制
	      uni.showModal({
	        title: '手动复制链接',
	        content: `请手动复制以下链接到浏览器下载：\n\n${url}`,
	        showCancel: false,
	        confirmText: '复制到输入框',
	        success: (res) => {
	          if (res.confirm) {
	            // 将链接复制到输入框方便用户操作
	            uni.setClipboardData({
	              data: url,
	              success: () => {
	                uni.showToast({
	                  title: '已复制到剪贴板',
	                  icon: 'success'
	                })
	              }
	            })
	          }
	        }
	      })
	    }
	  })
	}

	const changeRadio = (e) => {
		fileType.value = e.detail.value
	}

	const getFileTypeName = () => {
		switch (fileType.value) {
			case 'member':
				return '营员'
			case 'photo':
				return '摄影总监'
			case 'editor':
				return '图文总监'
			default:
				return ''
		}
	}

	const closePopup = () => {
		if (popup.value) {
			popup.value.close()
		}
	}

	const saveQRCode = () => {
		// 这里可以实现保存二维码图片到本地的功能
		// 注意：需要用户授权相册权限
		uni.showModal({
			title: '提示',
			content: '是否保存二维码到相册？',
			success: (res) => {
				if (res.confirm) {
					// 保存图片逻辑
					uni.downloadFile({
						url: 'https://s2.loli.net/2025/11/15/fQ5bv8o2cxuC9da.jpg', // 二维码图片URL
						success: (downloadRes) => {
							uni.saveImageToPhotosAlbum({
								filePath: downloadRes.tempFilePath,
								success: () => {
									uni.showToast({
										title: '保存成功',
										icon: 'success'
									})
								},
								fail: (err) => {
									console.error('保存失败', err)
									uni.showToast({
										title: '保存失败',
										icon: 'none'
									})
								}
							})
						}
					})
				}
			}
		})
	}
</script>

<style lang="scss" scoped>
	.apply-container {
		min-height: 100vh;
		background-color: var(--uni-bg-color-grey);
		position: relative;
	}

	.decorative-header {
		height: 160rpx;
		border-radius: 0 0 40rpx 40rpx;
		overflow: hidden;
		position: relative;

		.header-pattern {
			position: absolute;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			opacity: 0.8;
		}
	}

	.main-content {
		position: relative;
		z-index: 2;
	}

	.welcome-section {
		margin-top: 60rpx;
		margin-bottom: 40rpx;

		.welcome-card {
			border-radius: 24rpx;
			overflow: hidden;
			box-shadow: 0 10rpx 30rpx rgba(66, 194, 158, 0.15);
		}

		.welcome-header {
			padding: 40rpx 30rpx 30rpx;
			display: flex;
			align-items: center;
			gap: 20rpx;
		}

		.welcome-icon {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			background: rgba(66, 194, 158, 0.1);
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.welcome-title {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 8rpx;
		}

		.welcome-main-text {
			font-size: 36rpx;
			font-weight: bold;
			color: var(--uni-text-color);
			line-height: 1.2;
		}

		.welcome-sub-text {
			font-size: 26rpx;
			color: var(--uni-text-color-grey);
		}

		.welcome-steps {
			padding: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: var(--uni-bg-color);
		}

		.step-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 10rpx;
			position: relative;
			z-index: 1;
		}

		.step-number {
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			font-weight: bold;
			color: var(--uni-text-color-inverse);
		}

		.step-text {
			font-size: 24rpx;
			color: var(--uni-text-color);
			white-space: nowrap;
		}

		.step-connector {
			flex: 1;
			height: 4rpx;
			background: linear-gradient(90deg, var(--uni-color-primary-main), var(--uni-color-primary-light));
			margin: 0 10rpx;
			position: relative;
			top: -30rpx;
		}
	}

	.apply-section {
		margin-bottom: 40rpx;

		.section-header {
			display: flex;
			align-items: center;
			gap: 12rpx;
			margin-bottom: 20rpx;
			padding-left: 10rpx;
		}

		.section-icon {
			width: 56rpx;
			height: 56rpx;
			border-radius: 50%;
			background: rgba(66, 194, 158, 0.1);
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.section-title {
			font-size: 32rpx;
			font-weight: bold;
			color: var(--uni-text-color);
		}

		.section-card {
			background: var(--uni-bg-color);
			border-radius: 20rpx;
			padding: 32rpx;
			box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
		}

		.section-content {
			margin-bottom: 30rpx;
		}

		.content-text {
			font-size: 28rpx;
			color: var(--uni-text-color-grey);
			line-height: 1.5;
		}

		.selection-area {
			margin-bottom: 40rpx;
		}

		.selection-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 24rpx;
		}

		.selection-title {
			font-size: 28rpx;
			font-weight: 500;
			color: var(--uni-text-color);
		}

		.selection-required {
			font-size: 24rpx;
			color: var(--uni-color-error);
		}

		.type-selection {
			display: flex;
			flex-direction: column;
			gap: 20rpx;
		}

		.type-option {
			border: 2rpx solid var(--uni-border-color);
			border-radius: 16rpx;
			padding: 24rpx;
			transition: all 0.3s ease;

			&.active {
				border-color: var(--uni-color-primary-main);
				background: rgba(66, 194, 158, 0.05);
			}
		}

		.option-content {
			display: flex;
			align-items: center;
			gap: 20rpx;
		}

		.option-icon {
			width: 56rpx;
			height: 56rpx;
			border-radius: 12rpx;
			background: var(--uni-bg-color-grey);
			display: flex;
			align-items: center;
			justify-content: center;

			.active & {
				background: var(--uni-color-primary-main);
			}
		}

		.option-info {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 6rpx;
		}

		.option-title {
			font-size: 30rpx;
			font-weight: 500;
			color: var(--uni-text-color);
		}

		.option-desc {
			font-size: 24rpx;
			color: var(--uni-text-color-grey);
		}

		.download-btn,
		.upload-btn,
		.group-btn {
			width: 100%;
			height: 88rpx;
			border-radius: 44rpx;
			font-size: 30rpx;
			font-weight: 500;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 12rpx;
			margin-top: 20rpx;
			transition: all 0.3s ease;

			&.disabled {
				opacity: 0.5;
				pointer-events: none;
			}
		}

		.file-type {
			margin-left: 8rpx;
			font-size: 24rpx;
			opacity: 0.9;
		}

		.section-tip {
			display: flex;
			align-items: center;
			gap: 8rpx;
			margin-top: 24rpx;
			padding: 16rpx;
			background: rgba(240, 173, 78, 0.1);
			border-radius: 12rpx;
		}

		.tip-text {
			font-size: 24rpx;
			color: var(--uni-color-warning);
			flex: 1;
		}

		.upload-guide {
			margin: 40rpx 0;
			display: flex;
			flex-direction: column;
			gap: 30rpx;
		}

		.guide-step {
			display: flex;
			align-items: center;
			gap: 20rpx;
		}

		.step-marker {
			width: 48rpx;
			height: 48rpx;
			border-radius: 50%;
			background: var(--uni-color-primary-light);
			color: var(--uni-text-color-inverse);
			font-size: 24rpx;
			font-weight: bold;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
		}

		.guide-text {
			font-size: 28rpx;
			color: var(--uni-text-color);
		}

		.qrcode-preview {
			margin: 40rpx 0;
			background: var(--uni-bg-color-grey);
			border-radius: 20rpx;
			padding: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 2rpx dashed var(--uni-color-primary-light);
		}

		.qrcode-placeholder {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 20rpx;
		}

		.qrcode-hint {
			font-size: 26rpx;
			color: var(--uni-text-color-grey);
		}
	}

	.bottom-tips {
		.tips-card {
			background: var(--uni-bg-color);
			border-radius: 20rpx;
			padding: 32rpx;
			box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
			border-left: 6rpx solid var(--uni-color-warning);
		}

		.tips-header {
			display: flex;
			align-items: center;
			gap: 12rpx;
			margin-bottom: 24rpx;
		}

		.tips-title {
			font-size: 30rpx;
			font-weight: bold;
			color: var(--uni-text-color);
		}

		.tips-content {
			display: flex;
			flex-direction: column;
			gap: 16rpx;
		}

		.tip-item {
			font-size: 26rpx;
			color: var(--uni-text-color-grey);
			line-height: 1.5;
		}
	}

	.popup-content {
		width: 600rpx;
		background: var(--uni-bg-color);
		border-radius: 24rpx;
		overflow: hidden;
		padding: 40rpx;

		.popup-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30rpx;
		}

		.popup-title {
			font-size: 32rpx;
			font-weight: bold;
			color: var(--uni-text-color);
		}

		.qrcode-image {
			margin: 30rpx 0;
			display: flex;
			justify-content: center;
		}

		.qrcode-img {
			width: 400rpx;
			height: 400rpx;
			border-radius: 12rpx;
		}

		.popup-footer {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 24rpx;
			margin-top: 30rpx;
		}

		.footer-text {
			font-size: 26rpx;
			color: var(--uni-text-color-grey);
			text-align: center;
		}

		.save-btn {
			width: 100%;
			height: 80rpx;
			border-radius: 40rpx;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 12rpx;
		}
	}
</style>