<template>
    <div class="commentParent">
        <div class="commentitem" v-for="(item, index) in commentList" :key="index">
            <div class="userInfo">
            <div class="userImg" v-if="item.userinfo">
                <img v-if="item.userinfo.user_img" :src="item.userinfo.user_img" alt="">
                <img v-else src="@assets/default_img.jpg" alt="">
            </div>
            <div class="commentContent">
                <p>
                    <span v-if="item.userinfo">{{item.userinfo.name}}</span>
                    <span v-else>此用户未注册</span>
                    <span>{{item.comment_date}}</span>
                </p>
                <div>
                    {{item.comment_content}}
                    <span class="publish" @click="publishClick(item.comment_id)">回复</span>
                </div>
            </div>
        </div>
        <div style="padding-left: 30px;"><comment-item :commentChild="item.child" @postPublish="publishClick"></comment-item></div>
        </div>
    </div>
</template>

<script>
import CommentItem from './CommentItem'
export default {
    name:'CommentText',
    data(){
        return{
            commentList:null
        }
    },
    components:{
        CommentItem
    },
    methods:{
        async commentData(){
            const res = await this.$http.get('/comment/' + this.$route.params.id);
            console.log('评论数组的长度为:' + res.data.length);
            if(res.data){
                this.$emit('commentLength',res.data.length);
            }
            this.commentList = this.changeCommentData(res.data);
            console.log(this.commentList);
        },
        changeCommentData(arr){
            function fn(temp){
                let arr1 = [];
                for(var i = 0; i< arr.length; i++){
                    if(arr[i].parent_id == temp){
                        arr1.push(arr[i]);
                        arr[i].child = fn(arr[i].comment_id);
                    }
                }
                return arr1;
            }
            return fn(null);
        },
        publishClick(id){
            this.$emit('publishClick',id);
            console.log(id);
        }
    },
    created(){
        this.commentData();
    }
}
</script>

<style lang="less" scoped>
    .commentParent{
        padding: 10px;
        .commentitem{
            border-bottom:1px solid #e7e7e7 ;
            margin-bottom: 5px;
        }
        .userInfo{
            display: flex;
            margin-bottom: 10px ;
            .userImg{
            img{
                width: 35px;
                height: 35px;
                border-radius: 50%;
            }
            }
            .commentContent{
                flex: 1;
                margin-left: 10px;
                position: relative;
                p{
                    margin: 0;
                    display: flex;
                    justify-content: space-between;
                    color: #aaa;
                    font-size: 13px;
                    margin-bottom: 5px;
                }
                div{
                    font-size: 13px;
                }
                .publish{
                    position: absolute;
                    right: 0;
                    color: red;
                }
            }
        }
    }
</style>