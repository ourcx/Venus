<template>
    <view class="apply-container flex">
        <!-- 欢迎头 -->
        <view class="welcome-header flex">
            <view class="welcome-title">
                <text class="welcome-text">欢迎来到</text>
                <text class="welcome-text">Venus</text>
            </view>
            <view class="welcome-subtitle">
                <text class="welcome-text">根据一下指示完成报名操作</text>
            </view>
        </view>
        <!-- 获取报名文件 -->
        <view class="apply-file flex">
            <view class="file-title">
                <text class="file-text">获取报名文件</text>
            </view>
            <view class="file-content">
                <text class="file-text">请下载报名文件，填写信息，并上传至飞书小程序</text>
            </view>
            <view class="file-button">
                <checkbox-group @change="changeCheckbox">
                    <label>
                        <checkbox value="cb1" />营员
                    </label>
                    <label>
                        <checkbox value="cb2" />摄影总监
                    </label>
                    <label>
                        <checkbox value="cb3" />图文总监
                    </label>
                </checkbox-group>
                <button class="file-button-text" @click="downFile">下载报名文件</button>
            </view>
        </view>
        <!-- 跳转飞书小程序，上传报名文件 -->
        <view class="apply-file flex">
            <view class="file-title">
                <text class="file-text">上传报名文件</text>
            </view>
            <view class="file-content">
                <text class="file-text">请上传报名文件至飞书小程序</text>
            </view>
            <view class="file-button">
                <button class="file-button-text" @click="toFeiShu">上传报名文件</button>
            </view>
        </view>
        <!-- 加入招新群 -->
        <view class="apply-file flex">
            <view class="file-title">
                <text class="file-text">加入招新群</text>
            </view>
            <view class="file-content">
                <text class="file-text">请加入招新群，了解星河圆梦</text>
            </view>
            <view class="file-button">
                <button class="file-button-text" @click="displayQRcode('center')">加入招新群</button>
            </view>
        </view>
    </view>
    <uni-popup ref="popup" background-color="#fff" @change="change">
        <view class="popup-content">
            <image src="https://picsum.photos/350/350" mode=""></image>
        </view>
    </uni-popup>
</template>

<script>
    // 基本框架是这个，后面要根据 css 变量和具体内容做修改
export default {
    data() {
        return {
            type: '',
            fileType: '',
        }
    },
    methods: {
        toFeiShu() {
            uni.navigateToMiniProgram({
                shortLink: '#小程序://智能问卷/5wDK8hpcVC5byjs',
                success: (res) => {
                    console.log('跳转成功', res);
                },
                fail: (err) => {
                    console.error('跳转失败', err);
                    uni.showToast({ title: '跳转失败', icon: 'none' });
                }
            });
        },
        //飞书跳转
        displayQRcode(type) {
            this.type = type
            this.$refs.popup.open(type)
        },
        //显示二维码
        downFile() {
            //下载文件
            //根据fileType的值，下载文件
            if(this.fileType === ''){
                uni.showToast({ title: '请选择文件类型', icon: 'none' });
                return
            }
            switch (this.fileType) {
                case 'cb1':
                    uni.downloadFile({
                        url: 'https://picsum.photos/350/350',
                        success: (res) => {
                            console.log('下载成功', res);
                            uni.showToast({ title: '下载成功', icon: 'none' });
                        },
                        fail: (err) => {
                            console.error('下载失败', err);
                        }
                    })
                    break;
                case 'cb2':
                    uni.downloadFile({
                        url: 'https://picsum.photos/350/350',
                        success: (res) => {
                            console.log('下载成功', res);
                            uni.showToast({ title: '下载成功', icon: 'none' });
                        },
                        fail: (err) => {
                            console.error('下载失败', err);
                        }
                    })
                    break;
                case 'cb3':
                    uni.downloadFile({
                        url: 'https://picsum.photos/350/350',
                        success: (res) => {
                            console.log('下载成功', res);
                            uni.showToast({ title: '下载成功', icon: 'none' });
                        },
                        fail: (err) => {
                            console.error('下载失败', err);
                        }
                    })
                    break;
            }
        },
        changeCheckbox(e) {
            //获取checkbox的值
            let values = e.detail.value;
            this.fileType = values.join(',');
            console.log(this.fileType, "点击了 checkbox ");
        }
    }
}
</script>

<style lang="scss" scoped>
    .flex{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .apply-container{
        height: 100%;
        padding: 10rpx;
        background-color: #f5f5f5;

        .welcome-header{
            .welcome-title{ 
                font-size: 30rpx;
                font-weight: bold;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10rpx;
                color: #333;
            }
            .welcome-text{
                font-size: 20rpx;
                color: #666;
                text-align: center;
                margin-top: 10rpx;

            }
            .welcome-subtitle{
                font-size: 24rpx;
                color: #3e3e3e;
                text-align: center;
                font-weight: 700;
            }
        }

        .apply-file{
            margin-top: 20rpx;
            .file-title{
                font-size: 20rpx;
                color: #333;
                font-weight: 700;
                text-align: center;
                margin-bottom: 10rpx;
                .file-text{
                    font-size: 16rpx;
                    color: #666;
                }

                .ile-content{
                    font-size: 16rpx;
                    color: #666;
                    margin-top: 10rpx;
                    text-align: center;
                    .file-text{
                        font-size: 16rpx;
                        color: #666;
                    }
                }
                .file-button{
                    margin-top: 20rpx;
                    .file-button-text{ 
                        background-color: #333;
                        color: #fff;
                        padding: 10rpx 20rpx;
                        border-radius: 5rpx;
                        font-size: 16rpx;
                        
                    }

                }
            }
            .file-content{
                font-size: 16rpx;
                color: #666;
                margin-top: 10rpx;
                text-align: center;
                .file-text{
                    font-size: 16rpx;
                    color: #666;
                }
            }

        }
    }
    .popup-content{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        .image{
            width: 100%;
            height: 100%;
        }

    }
</style>