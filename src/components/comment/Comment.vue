<template>
    <div class="comment">
        <p class="comment-title">
            <span>评论</span>
            <span>({{this.lens}})</span>
        </p>

        <div class="comment-myuser">
            <img :src="myuser.user_img" alt="" v-if="myuser">
            <img src="@assets/default_img.jpg" alt="" v-else>
            <input type="text" placeholder="说点什么吧..." v-model="commentContent" ref="postIpt">
            <button @click="commentSubmit">发表</button>
        </div>
        <comment-text @commentLength="commentLength" @publishClick="publishClick" ref="commentText"></comment-text>
    </div>
</template>

<script>
import CommentText from './CommentText'
export default {
    name:'Comment',
    components:{
        CommentText
    },
    data(){
        return{
            myuser:null,
            lens: null,
            commentContent:''
        }
    },
    methods:{
        async getData(){
            const res = await this.$http.get('/user/' + localStorage.getItem('id'));
            this.myuser = res.data[0];
            console.log(this.myuser);
        },
        commentSubmit(){
            if((!localStorage.getItem('id') || !localStorage.getItem('token')) && !this.myuser){
                this.$msg.fail('请先登录！');
                return;
            }
            this.$emit('postComment',this.commentContent);
            this.commentContent = '';
        },
        commentLength(data){
            this.lens = data;
        },
        publishClick(id){
            this.$emit('publishClick',id);
            this.onfoucus();
        },
        onfoucus(){
            this.$refs.postIpt.focus();
        }
    },
    created(){
        if(localStorage.getItem('id')){
            this.getData();
        }
    },
    updated(){
        // this.onfoucus();
    }
}
</script>

<style lang="less" scoped>
    .comment{
        padding: 30px 10px 0 10px;
        .comment-title{
            span:nth-child(2){
                color: #aaa;
                margin-left: 10px;
            }
        }
        .comment-myuser{
            padding: 10px 0 ;
            display: flex;
            img{
                width: 25px;
                height: 25px;
                border-radius: 50%;
            }
            input{
                outline: none;
                border: 0;
                background-color: #f4f4f4;
                border-radius: 13px;
                font-size: 12px;
                color: #aaa;
                padding: 0 20px 0 15px;
                margin-left: 10px;
            }
            button{
                outline: none;
                border: 0;
                background-color: #fb7299;
                border-radius: 12px;
                color: #fff;
                font-size: 14px;
                padding: 0 10px;
                margin-left: 10px;
            }
        }
    }
</style>