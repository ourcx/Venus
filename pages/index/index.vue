<template>
  <view class="home-container uni-theme-green">
    <!-- 主要内容 -->
    <scroll-view 
      class="main-content" 
      scroll-y 
      :refresher-enabled="true" 
      :refresher-triggered="refreshing"
      @refresherrefresh="onRefresh"
    >
      <!-- 1. 轮播图：使用 uni-app 原生 swiper -->
      <view class="swiper-section">
        <swiper 
          class="swiper" 
          :indicator-dots="true" 
          :indicator-color="uniTextColorGrey" 
          :indicator-active-color="uniColorPrimaryMain"
          :autoplay="true" 
          :interval="3000" 
          :circular="true" 
          :duration="500"
        >
          <swiper-item v-for="(item, index) in bannerList" :key="index">
            <image 
              :src="item" 
			  mode="scaleToFill" 
              class="swiper-image"
              @click="handleBannerClick(index)"
            />
          </swiper-item>
        </swiper>
      </view>

      <!-- 2. 欢迎标语：使用绿色主题卡片 -->
      <view class="welcome-section">
        <view class="custom-card primary-card">
          <view class="card-header">
            <text class="card-title">欢迎来到星河圆梦</text>
          </view>
          <view class="card-body welcome-content">
            <uni-icons type="star-filled" size="40" color="var(--uni-color-primary-main)" />
            <text class="welcome-desc">每个孩子都能独立思考并朝着梦想前进</text>
          </view>
        </view>
      </view>

      <!-- 3. 快捷入口 -->
      <view class="quick-entrance">
        <view class="quick-grid">
          <view 
            class="quick-item" 
            v-for="item in quickList" 
            :key="item.id"
            @click="handleQuickClick(item)"
          >
            <uni-icons :type="item.icon" size="40" :color="item.color" />
            <text class="quick-text">{{ item.title }}</text>
          </view>
        </view>
      </view>
	  
	  <!-- 6. 统计数据 -->
	  <view class="stats-section">
	    <view class="custom-card gradient-light">
	      <view class="card-body">
	        <view class="section-title data-display">2009-2025服务成果</view>
	        <view class="stats-grid">
	          <view 
	            class="stat-item" 
	            v-for="stat in stats" 
	            :key="stat.id"
	          >
	            <text class="stat-number  data-display">{{ stat.value }}</text>
	            <text class="stat-label data-display">{{ stat.label }}</text>
	          </view>
	        </view>
	      </view>
	    </view>
	  </view>

      <!-- 4. 核心功能 -->
      <view class="function-section">
        <view class="section-title">核心功能</view>
        
        <!-- 服务展示 -->
        <view class="func-card" @click="goToService">
          <view class="function-item">
            <uni-icons type="home-filled" size="30" color="var(--uni-color-primary-main)" />
            <view class="function-info">
              <text class="function-name">服务成果展示</text>
              <text class="function-desc">查看我们的服务项目与成果</text>
            </view>
            <uni-icons type="arrowright" size="20" color="var(--uni-text-color-grey)" />
          </view>
        </view>

        <!-- 招新报名 -->
        <view class="func-card" @click="goToRecruitment">
          <view class="function-item">
            <uni-icons type="person-filled" size="30" color="var(--u-warning)" />
            <view class="function-info">
              <text class="function-name">招新报名</text>
              <text class="function-desc">加入我们，一起创造不凡</text>
              <view class="function-tag">
                <uni-tag text="火热进行中" size="small" type="error" />
              </view>
            </view>
            <uni-icons type="arrowright" size="20" color="var(--uni-text-color-grey)" />
          </view>
        </view>

        <!-- 团队动态 -->
        <view class="func-card" @click="goToDynamic">
          <view class="function-item">
            <uni-icons type="image" size="30" color="var(--u-success)" />
            <view class="function-info">
              <text class="function-name">团队动态</text>
              <text class="function-desc">了解我们的最新活动</text>
            </view>
            <uni-icons type="arrowright" size="20" color="var(--uni-text-color-grey)" />
          </view>
        </view>
      </view>

      <!-- 5. 最新动态 -->
      <view class="dynamic-section">
        <view class="section-header">
          <text class="section-title">最新动态</text>
          <text class="section-more primary-link" @click="goToDynamic">查看更多</text>
        </view>
        
        <view class="dynamic-list">
          <view 
            class="dynamic-card"
            v-for="item in dynamicList"
            :key="item.id"
            @click="showDynamicDetail(item)"
          >
            <view class="dynamic-tag">
              <uni-tag :text="item.tag" size="small" :type="item.tagType" />
            </view>
            <text class="dynamic-content">{{ item.content }}</text>
            <view class="dynamic-footer">
              <text class="dynamic-time">{{ item.time }}</text>
              <view class="dynamic-actions">
                <view class="action-item">
                  <uni-icons type="hand-up" size="16" color="var(--uni-text-color-grey)" />
                  <text class="action-count">{{ item.likes }}</text>
                </view>
                <view class="action-item">
                  <uni-icons type="chat" size="16" color="var(--uni-text-color-grey)" />
                  <text class="action-count">{{ item.comments }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 7. 联系我们 -->
      <view class="contact-section">
        <view class="custom-card">
          <view class="card-body contact-content">
            <uni-icons type="phone-filled" size="30" color="var(--uni-color-primary-main)" />
            <text class="contact-title text-primary-dark">联系我们</text>
            <text class="contact-info">邮箱：service@xingheyuanmeng.com</text>
            <text class="contact-info">电话：400-123-4567</text>
            <button 
              class="contact-btn primary-outline-btn" 
              type="default" 
              size="mini" 
              @click="contactUs"
            >
              在线咨询
            </button>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 8. 底部操作栏 -->
    <view class="bottom-action">
      <button 
        class="action-btn primary-btn gradient-primary" 
        @click="goToRecruitment"
      >
        <uni-icons type="plus" size="20" color="var(--uni-text-color-inverse)" />
        立即报名
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 响应式数据
const refreshing = ref(false)

// 主题变量（在JS中也可以使用）
const uniColorPrimaryMain = '#42C29E'
const uniTextColorGrey = '#999'
const uniColorPrimaryDark = '#339E80'

// 轮播图数据
const bannerList = reactive([
  'https://s2.loli.net/2025/11/15/fQ5bv8o2cxuC9da.jpg',
  'https://s2.loli.net/2025/11/15/fQ5bv8o2cxuC9da.jpg',
  'https://s2.loli.net/2025/11/15/fQ5bv8o2cxuC9da.jpg',
])

// 快捷入口 - 使用主题颜色
const quickList = ref([
  { id: 1, title: '服务', icon: 'home', color: uniColorPrimaryMain, path: '/pages/service/list' },
  { id: 2, title: '报名', icon: 'person', color: '#f0ad4e', path: '/pages/recruitment/form' },
  { id: 3, title: '动态', icon: 'image', color: '#4cd964', path: '/pages/dynamic/list' },
  { id: 4, title: '我的', icon: 'settings', color: '#909399', path: '/pages/mine/index' },
])

// 动态数据
const dynamicList = ref([
  {
    id: 1,
    content: '星河圆梦第100场社区服务活动圆满结束，感谢所有志愿者的辛勤付出！',
    tag: '活动回顾',
    tagType: 'primary',
    time: '2小时前',
    likes: 124,
    comments: 23
  },
  {
    id: 2,
    content: '2024年招新计划正式启动，诚邀有志之士加入我们的团队！',
    tag: '招新公告',
    tagType: 'warning',
    time: '昨天',
    likes: 89,
    comments: 12
  },
  {
    id: 3,
    content: '环保公益活动将于本周六举行，欢迎大家踊跃参与！',
    tag: '活动预告',
    tagType: 'success',
    time: '3天前',
    likes: 56,
    comments: 8
  }
])

// 统计数据
const stats = ref([
  { id: 1, label: '大学生志愿者', value: '1596人' },
  { id: 2, label: '收益少年儿童', value: '5671人' },
  { id: 3, label: '乡村夏令营', value: '76场' },
  { id: 4, label: '遍及营点学校', value: '32所' }
])

// 页面加载
onLoad(() => {
  console.log('首页加载')
})

// 方法定义
const onRefresh = () => {
  refreshing.value = true
  setTimeout(() => {
    refreshing.value = false
    uni.showToast({
      title: '刷新成功',
      icon: 'success'
    })
  }, 1000)
}

const handleBannerClick = (index) => {
  console.log('点击轮播图:', index)
  if (index === 0) {
    goToService()
  } else if (index === 1) {
    goToRecruitment()
  } else {
    goToDynamic()
  }
}

const handleQuickClick = (item) => {
  uni.navigateTo({
    url: item.path
  })
}

const goToService = () => {
  uni.navigateTo({
    url: '/pages/service/list'
  })
}

const goToRecruitment = () => {
  uni.navigateTo({
    url: '/pages/recruitment/form'
  })
}

const goToDynamic = () => {
  uni.navigateTo({
    url: '/pages/dynamic/list'
  })
}

const showDynamicDetail = (item) => {
  uni.showModal({
    title: item.tag,
    content: item.content,
    confirmText: '查看详情',
    success: (res) => {
      if (res.confirm) {
        uni.navigateTo({
          url: `/pages/dynamic/detail?id=${item.id}`
        })
      }
    }
  })
}

const contactUs = () => {
  uni.showActionSheet({
    itemList: ['拨打电话', '发送邮件'],
    success: (res) => {
      if (res.tapIndex === 0) {
        uni.makePhoneCall({
          phoneNumber: '4001234567'
        })
      } else if (res.tapIndex === 1) {
        uni.setClipboardData({
          data: 'service@xingheyuanmeng.com',
          success: () => {
            uni.showToast({
              title: '邮箱已复制',
              icon: 'success'
            })
          }
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
// 导入主题变量 - 假设这些变量定义在 uni.scss 或全局样式文件中
// 这里直接使用变量名，实际项目中确保这些变量已定义

.home-container {
  min-height: 100vh;
  background-color: var(--uni-bg-color-grey);
  padding-bottom: 120rpx;
}

.main-content {
  padding-bottom: 30rpx;
}

/* 轮播图样式 */
.swiper-section {
  margin: 20rpx;
  border-radius: var(--uni-border-radius-lg);
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(66, 194, 158, 0.15);
}

.swiper {
  height: 250rpx;
}

.swiper-image {
  width: 100%;
  height: 100%;
}

/* 自定义卡片样式 */
.custom-card {
  background: var(--uni-bg-color);
  border-radius: var(--uni-border-radius-lg);
  margin: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(66, 194, 158, 0.08);
  overflow: hidden;
}

.primary-card {
  border-left: 6rpx solid var(--uni-color-primary-main);
  box-shadow: 0 2rpx 12rpx rgba(66, 194, 158, 0.15);
}

.card-header {
  padding: 30rpx 30rpx 0;
}

.card-title {
  font-size: 34rpx;
  font-weight: bold;
  color: var(--uni-text-color);
}
.welcome-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
}

.welcome-desc {
  font-size: 28rpx;
  color: var(--uni-text-color-grey);
}

/* 快捷入口 */
.quick-entrance {
  @extend .custom-card;
  padding: 40rpx 20rpx;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10rpx;
}

.quick-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
  padding: 20rpx 0;
  
  &:active {
    background-color: var(--uni-bg-color-hover);
    border-radius: var(--uni-border-radius-base);
  }
}

.quick-text {
  font-size: 24rpx;
  color: var(--uni-text-color);
  text-align: center;
}

/* 功能区域 */
.function-section {
  @extend .custom-card;
  padding: 30rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: var(--uni-text-color);
  margin-bottom: 30rpx;
}

.func-card {
  background: var(--uni-bg-color-grey);
  border-radius: var(--uni-border-radius-base);
  margin-bottom: 20rpx;
  padding: 24rpx;
  border-left: 4rpx solid transparent;
  
  &:active {
    background: rgba(66, 194, 158, 0.08);
  }
  
  // 为不同功能添加不同的左侧边框色
  &:nth-child(2) { // 服务展示
    border-left-color: var(--uni-color-primary-main);
  }
  
  &:nth-child(3) { // 招新报名
    border-left-color: var(--u-warning);
  }
  
  &:nth-child(4) { // 团队动态
    border-left-color: var(--u-success);
  }
}

.function-item {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.function-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.function-name {
  font-size: 30rpx;
  font-weight: 500;
  color: var(--uni-text-color);
}

.function-desc {
  font-size: 26rpx;
  color: var(--uni-text-color-grey);
}

.function-tag {
  margin-top: 5rpx;
}

/* 动态区域 */
.dynamic-section {
  @extend .custom-card;
  padding: 30rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.section-more {
  font-size: 26rpx;
  
  &:active {
    opacity: 0.7;
  }
}

.dynamic-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.dynamic-card {
  background: var(--uni-bg-color-grey);
  border-radius: var(--uni-border-radius-base);
  padding: 28rpx;
  border-top: 2rpx solid rgba(66, 194, 158, 0.1);
  
  &:active {
    background: rgba(66, 194, 158, 0.05);
  }
}

.dynamic-tag {
  margin-bottom: 15rpx;
}

.dynamic-content {
  display: block;
  font-size: 28rpx;
  color: var(--uni-text-color);
  line-height: 1.5;
  margin-bottom: 20rpx;
}

.dynamic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dynamic-time {
  font-size: 24rpx;
  color: var(--uni-text-color-grey);
}

.dynamic-actions {
  display: flex;
  gap: 30rpx;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.action-count {
  font-size: 22rpx;
  color: var(--uni-text-color-grey);
}

/* 统计数据 */
.stats-section {
  .custom-card {
    padding: 30rpx;
  }
}

.gradient-light {
  background: linear-gradient(135deg, var(--uni-color-primary-light), var(--uni-color-primary-lighter)) !important;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10rpx;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
  padding: 20rpx 0;
}

.stat-number {
  font-size: 38rpx;
  font-weight: bold;
}

.stat-label {
  font-size: 24rpx;
  color: var(--uni-text-color);
  opacity: 0.9;
}

/* 联系我们 */
.contact-section {
  @extend .custom-card;
  padding: 40rpx 30rpx;
  border-top: 4rpx solid var(--uni-color-primary-light);
}

.contact-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
  text-align: center;
}

.contact-title {
  font-size: 32rpx;
  font-weight: bold;
}

.contact-info {
  font-size: 26rpx;
  color: var(--uni-text-color);
  line-height: 1.5;
}

.contact-btn {
  margin-top: 10rpx;
  border-radius: 40rpx;
  padding: 12rpx 36rpx;
  font-size: 26rpx;
}

/* 底部操作栏 */
.bottom-action {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--uni-bg-color);
  padding: 20rpx 30rpx;
  z-index: 1000;
}

.action-btn {
  border-radius: 50rpx;
  font-size: 32rpx;
  height: 84rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  border: none;
}

.gradient-primary {
  background: linear-gradient(135deg, var(--uni-color-primary-dark), var(--uni-color-primary-main)) !important;
}

/* 使用主题变量定义的类 */
.text-primary-dark { 
  color: var(--uni-color-primary-dark) !important; 
}

.text-primary-main { 
  color: var(--uni-color-primary-main) !important; 
}

.bg-primary-light { 
  background-color: var(--uni-color-primary-light) !important; 
}

.primary-link {
  color: var(--uni-color-primary-main) !important;
  
  &:active {
    color: var(--uni-color-primary-dark) !important;
  }
}

.primary-btn {
  background-color: var(--uni-color-primary-main) !important;
  border-color: var(--uni-color-primary-main) !important;
  color: var(--uni-text-color-inverse) !important;
  
  &:active {
    background-color: var(--uni-color-primary-dark) !important;
  }
}

.primary-outline-btn {
  background-color: transparent !important;
  border: 2rpx solid var(--uni-color-primary-main) !important;
  color: var(--uni-color-primary-main) !important;
  
  &:active {
    background-color: rgba(66, 194, 158, 0.1) !important;
  }
}

.data-display{
	color: white !important;
}
</style>