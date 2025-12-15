<template>
    <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y"
        @scroll="scroll">
    </scroll-view>
</template>

<script>
    //这个是链接公众号的列表
    export default {
        data() {
            return {
                scrollTop: 0
            }
        },
        methods: {
            scroll(e) {
                console.log(e.detail.scrollTop)
                this.scrollTop = e.detail.scrollTop
            }
        }
    }
</script>

<style></style>