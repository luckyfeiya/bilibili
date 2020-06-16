<template>
    <div>
        <div class="editbanner" @click="bannerClick">
            <span>{{left}}</span>
            <span><slot name="right"></slot></span>
        </div>
    </div>
</template>

<script>
export default {
    name:'EditBanner',
    props:['left','right'],
    methods:{
        bannerClick(){
            this.$emit('bannerClick')
        }
    }
}
</script>

<style lang="less">
    .editbanner{
        background-color: #fff;
        padding: 15px;
        font-size: 14px;
        color: #999;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>