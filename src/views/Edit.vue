<template>
    <div v-if="model" class="editViews">
        <div style="margin-bottom:10px"><nav-bar :userInfo="model"></nav-bar></div>

        <div class="uploadFile">
            <van-uploader preview-size="100vw" class="uploadImg" :after-read="afterRead" />
            <edit-banner left="头像" >
                <img :src="model.user_img" slot="right" v-if="model.user_img">
                <img src="@assets/default_img.jpg" slot="right" v-else>
            </edit-banner>
        </div>

        <edit-banner left="昵称" @bannerClick="show = true">
            <a href="javascript:;" slot="right">{{model.name}}</a>
        </edit-banner>

        <edit-banner left="账号" >
            <a href="javascript:;" slot="right">{{model.username}}</a>
        </edit-banner>

        <edit-banner left="性别" @bannerClick="gendershow = true">
            <a href="javascript:;" slot="right" v-if="model.gender==1">男</a>
            <a href="javascript:;" slot="right" v-else-if="model.gender == 0">女</a>
            <a href="javascript:;" slot="right" v-else></a>
        </edit-banner>

        <edit-banner left="出生日期" ></edit-banner>

        <edit-banner left="个性签名" @bannerClick="textshow = true">
            <a href="javascript:;" slot="right">{{model.user_desc}}</a>
        </edit-banner>

        <div class="editback" @click="$router.push('/userinfo')">返回个人中心</div>

        <van-dialog 
        v-model="show" title="新的用户名" 
        show-cancel-button 
        @confirm="nameConfirmClick"
        @cancel="value = ''"
        >
            <van-field v-model="value" autofocus placeholder="请输入用户名" />
        </van-dialog>

        <van-dialog 
        v-model="textshow" 
        title="新的个性签名" 
        show-cancel-button 
        @confirm="descConfirmClick"
        @cancel="value = ''"
        >
            <van-field v-model="value" type="textarea" autofocus placeholder="说点什么吧..." />
        </van-dialog>

        <van-action-sheet 
        v-model="gendershow" 
        :actions="actions" 
        cancel-text="取消"
        @select="onSelect" />

    </div>
</template>

<script>
import NavBar from '@components/common/NavBar'
import EditBanner from '@components/common/EditBanner'
export default {
    name:'Eidt',
    components:{
        NavBar,
        EditBanner
    },
    data(){
        return{
            model:{},
            show:false,
            textshow:false,
            gendershow:false,
            value:'',
            actions:[
                {name:'男',val:1},
                {name:'女',val:0}
            ]
        }
    },
    methods:{
        async selectUser(){
            const res = await this.$http.get('/user/' + localStorage.getItem('id'));
            this.model = res.data[0];
            console.log(res);
        },
        async afterRead(file){
            const formdata = new FormData();
            formdata.append('file',file.file);
            const res = await this.$http.post('/upload',formdata);
            // console.log(res);
            this.model.user_img = res.data.url;
            this.UserUpdata();
        },
        async UserUpdata(){
            const res = await this.$http.post('/update/' + localStorage.getItem('id'),this.model);
            console.log(res);
            if(res.status==200){
                this.$msg.fail('修改成功!');
            }else{
                this.$msg.fail('修改失败!');
            }
            
        },
        nameConfirmClick(){
            this.model.name = this.value;
            this.value = '';
            this.UserUpdata();
        },
        descConfirmClick(){
            this.model.user_desc = this.value;
            this.value = '';
            this.UserUpdata();
        },
        onSelect(data){
            // console.log(data);
            this.model.gender = data.val;
            this.UserUpdata();
            this.gendershow = false;
        }
    },
    created(){
        this.selectUser();
    }
}
</script>

<style lang="less">
    .editViews a{
        color: #333;
    }
    .editViews img{
        width: 46px;
        height: 46px;
        border-radius: 50%;
    }
    .uploadFile{
        position: relative;
        overflow: hidden;
        .uploadImg{
            position: absolute;
            opacity: 0;
        }
    }
    .editback{
        margin-top: 5.556vw;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 15px 0;
        color: #999;
        font-size: 4vw;
    }
</style>