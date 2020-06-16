<template>
    <div class="userinfo">
        <nav-bar :userInfo="model"></nav-bar>
        <img class="backImg" src="@assets/bannerTop_new.png" alt="">
        <user-detail :userInfo="model"></user-detail>
    </div>
</template>

<script>
import NavBar from '@components/common/NavBar.vue'
import UserDetail from '@/components/userComponents/UserDetail.vue'

export default {
    name:'UserInfo',
    data(){
        return{
            model:''
        }
    },
    methods:{
        async UserInfoData(){
            const res = await this.$http.get('/user/'+ localStorage.getItem('id'),{
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })

            this.model = res.data[0];
        }
    },
    created(){
        this.UserInfoData();
    },
    components:{
        NavBar,
        UserDetail
    }
}
</script>

<style scoped lang="less">
    .userinfo{
        .backImg{
            width: 100%;
            height: 101px;
        }
    }
</style>