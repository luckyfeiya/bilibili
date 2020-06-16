<template>
    <div>
        <login-top middleTop="bilibili登录">
            <div slot="right" style="font-size:13px" @click="$router.push('/register')">用户注册</div>
        </login-top>
        <login-text 
        label="账号"
        rule="^.{6,16}$"
        placeholder="请输入账号"
        @changeInput="res => model.username = res"
        ></login-text>
        <login-text 
        label="密码" 
        type='password'
        rule="^.{6,16}$"
        placeholder="请输入密码"
        @changeInput="res => model.password = res"
        ></login-text>
        <login-btn btnText="登录" @registerSubmit='successSubmit'></login-btn>
    </div>
</template>

<script>
import LoginTop from '@components/common/LoginTop.vue'
import LoginText from '@components/common/LoginText.vue'
import LoginBtn from '@components/common/LoginBtn.vue'

export default {
    name:'Register',
    data(){
        return{
            model:{
                name:'',
                username:'',
                password:''
            }
        }
    },
    methods:{
        async successSubmit(){
            let rulg = /^.{6,16}$/;
            if(rulg.test(this.model.username) && rulg.test(this.model.password)){
                const res = await this.$http.post('/login',this.model);
                this.$msg.fail(res.data.msg);
                localStorage.setItem('token',res.data.token);
                localStorage.setItem('id',res.data.id);
                setTimeout(() => {
                    this.$router.push('/userinfo');
                }, 1000);
            }else{
                this.$msg.fail('格式不正确,请重新输入！');
            }
        }
    },
    components:{
        LoginTop,
        LoginText,
        LoginBtn
    }
}
</script>

<style lang="less">
    
</style>