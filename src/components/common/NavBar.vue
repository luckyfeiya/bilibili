<template>
    <div class="navbar">
        <div class="logo" @click="$router.push('/home')">
            <img src="@assets/blogo.png" alt="">
        </div>
        <div>
            <p>
                请输入内容
                <van-icon class="ipt-icon" name="search" />
            </p>
        </div>
        <div>
                <img :src="userInfo.user_img" alt="" v-if="userInfo.user_img" @click="$router.push('/edit')">
                <img src="@assets/default_img.jpg" alt="" v-else @click="$router.push('/login')">   
            <p>下载App</p>
        </div>
    </div>
</template>

<script>

export default {
    name:'NavBar',
    props:['userInfo']
}
</script>

<style scoped lang="less">
    .navbar{
        height: 12.5vw;
        background-color: #fff;
        display: flex;
        .logo{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 110px;
            img{
                width: 100%;
            }
        }
        div:nth-child(2){
            flex: 1;
            display: flex;
            align-items: center;
            p{
                height: 26px;
                background-color: #f4f4f4;
                width: 100%;
                border-radius: 10px;
                position: relative;
                font-size: 12px;
                line-height: 26px;
                padding-left: 25px;
                color: #aaa;
                .ipt-icon{
                    position: absolute;
                    left: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
        div:nth-child(3){
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 24px;
                height: 24px;
                border-radius: 12px;
            }
            p{
                padding: 5px 10px;
                margin: 0 8px;
                background-color: #fb7299;
                color: #fff;
                font-size: 13px;
                border-radius: 3px;
            }
        }
    }
</style>