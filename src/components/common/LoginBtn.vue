<template>
    <div class="btnparent">
        <div class="loginbtn" @click='registerClick'>{{btnText}}</div>
    </div>
</template>

<script>
export default {
    name:'LoginBtn',
    props:['btnText'],
    methods:{
        registerClick(){
            this.$emit('registerSubmit')
        }
    }
}
</script>

<style lang="less">
    .btnparent{
        padding: 15px 10px;
    }
    .loginbtn{
        height: 45px;
        background-color: #ff9db5;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        border-radius: 22.5px;
    }
</style>