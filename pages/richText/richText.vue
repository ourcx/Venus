<template>
    <view class="rich-content">
        <rich-text :nodes="conttent" style="padding: 10rpx;"></rich-text>
    </view>
</template>

<script>
export default {
    data() {
        return {
            conttent: '',
            //这个要去请求公众号的富文本文章内容
        }
    },
    methods: {
        getContent() {
            wx.request({
                url: url,  //这里替换你的文章链接
                method: 'GET',
                success: res => {
                    var html = res.data
                    const start = res.data.indexOf('<div id="img-content"')
                    const end = res.data.indexOf('<div id="js_tags_preview_toast"')
                    html = html.slice(start, end)
                    html = html.replace('visibility: hidden; opacity: 0; ', '').replaceAll('data-src', 'src')
                    // console.log(html)

                    this.setData({
                        content: html,
                        loading: false
                    })
                }
            })
            //需要调整一些被官方隐藏的东西
        }
    }
}

</script>

<style></style>