<template>
    <div class="articleitemparent">
        <nav-bar :userInfo="model"></nav-bar>
        <div class="itembox">
            <div class="articleitembox">
                <video controls :src="articleitem.content"></video>
            </div>
            <div class="articleitemtext">

                <div class="itemtop">
                    <span>{{detail.title}}</span>
                    <span>{{articleitem.name}}</span>
                </div>

                <div class="itemcenter">
                    <span>{{name.name}}</span>
                    <span>146.4万次观看</span>
                    <span>5281弹幕</span>
                    <span>{{articleitem.date}}</span>
                </div>

                <div class="itembottom">
                    <div @click="collectionClick" :class="{active: flag}">
                        <span class="icon-star-full"></span>
                        <span>收藏</span>
                    </div>
                    <div>
                        <span class="icon-box-add"></span>
                        <span>缓存</span>
                    </div>
                    <div>
                        <span class="icon-redo2"></span>
                        <span>分享</span>
                    </div>
                    <p v-if="careFlag == true || careFlag == false">
                        <span class="careAbout" @click="careClick" v-if="!careFlag">+ 关注</span>
                        <span class="cancelCare" @click="careClick" v-else>已关注</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="detailparent" >
            <detail class="detailitem" v-for="(item, index) in commondList" :key="index" :detailitem="item" />
        </div>
        <comment @postComment="postComment" @publishClick="publishClick" ref="comment"></comment>
    </div>
</template>

<script>
import NavBar from '@components/common/NavBar'
import Detail from './Detail'
import Comment from '@components/comment/Comment'
export default {
    name:'Article',
    components:{
        NavBar,
        Detail,
        Comment
    },
    data(){
        return{
            model:{},
            articleitem:{},
            detail:{},
            name:{},
            commondList:null,
            postCom:{
                article_id:'',
                parent_id:null,
                comment_content:'',
                comment_date:''
            },
            flag:'',
            careFlag: null
        }
    },
    methods:{
        async getData(){
            const res = await this.$http.get('/user/' + localStorage.getItem('id'));
            this.model = res.data[0];
        },
        async articleitemData(){
            // console.log(this.$route.params.id);
            const res = await this.$http.get('/article/' + this.$route.params.id);
            this.articleitem = res.data[0];
            this.detail = this.articleitem.category;
            this.name = this.articleitem.userinfo;
            // console.log(this.articleitem);
            this.careFlagUpdate();
        },

        async commondData(){
            const res = await this.$http.get('/commend');
            this.commondList = res.data;
            // console.log(this.commondList);
        },
        async postComment(data){
            this.postCom.article_id = this.$route.params.id;
            this.postCom.comment_content = data;
            let date = new Date();
            let m = date.getMonth() + 1;
            m = m<10? '0' + m : m;
            let d = date.getDate();
            d = d<10? '0' + d : d;
            let str = `${m}-${d}`;
            this.postCom.comment_date = str;
            const res = await this.$http.post('/comment_post/' + localStorage.getItem('id'),this.postCom);
            console.log(res);
            this.$refs.comment.$refs.commentText.commentData();
            this.postCom.parent_id = null;
            if(res.status == 200){
                this.$msg.fail('发表成功！');
            }
        },
        publishClick(id){
            this.postCom.parent_id = id;
        },
        async collectionClick(){
            if(localStorage.getItem('token')){
                const res = await this.$http.post('/collection/' + localStorage.getItem('id'),{
                    article_id : this.$route.params.id
                })
                console.log(res);
                if(res.data.code == 200){
                    this.$msg.fail(res.data.msg);
                    if(res.data.msg === '收藏成功'){
                        this.flag = true;
                    }else{
                        this.flag = false;
                    }
                }
            }
        },
        // 进入页面渲染flag数据
        async flagUpdate(){
            const res = await this.$http.get('/collection/' + localStorage.getItem('id'),{
                params:{
                    article_id: this.$route.params.id
                }
            });
            this.flag = res.data.success; 
        },
        // 关注用户功能
        async careClick(){
            if(localStorage.getItem('token')){
                const res = await this.$http.post('/sub_scription/' + localStorage.getItem('id'),{
                    sub_id: this.articleitem.userid
                })
                // console.log(res);
                if(res.data.code == 200){
                    if(res.data.msg === '关注成功'){
                        this.$msg.fail(res.data.msg);
                        this.careFlag = true;
                    }else{
                        this.$msg.fail(res.data.msg);
                        this.careFlag = false;
                    }
                }else{
                    this.$msg.fail(res.data.msg);
                }
            }
        },
        // 进入页面渲染careFlag数组
        async careFlagUpdate(){
            console.log(this.articleitem);
            const res = await this.$http.get('/sub_scription/' + localStorage.getItem('id'),{
                params:{
                    sub_id: this.articleitem.userid
                }
            });
            console.log(res);
            this.careFlag = res.data.success;   
        }
    },
    created() {
        if(localStorage.getItem('id')){
            this.getData(); 
            this.flagUpdate();
        }
        this.articleitemData();
        this.commondData();
        
    },
    watch:{
        $route() {
            this.getData();
            this.articleitemData();
            this.commondData();
        }
    }
}
</script>

<style lang="less" scoped>
    .articleitemparent{
        background-color: #fff;
        .itembox{
        width: 100%;
        .articleitembox{
            width: 100%;
            video{
                width: 100%;
            }
        }
        .articleitemtext{
            padding: 15px;
            .itemtop{
                span:nth-child(1){
                    padding: 0 10px;
                    color: #fb7299;
                    background-color: #f4f4f4;
                    border-radius: 10px;
                }
            }
            .itemcenter{
                padding: 10px 0;
                span{
                    color: #aaa;
                    margin-right: 10px;
                    font-size: 12px;
                }
                span:nth-child(1){
                    font-size: 4vw;
                    color: #000;
                    padding-right: 10px;
                }
                
            }
            .itembottom{
                position: relative;
                padding: 10px 0;
                display: flex;
                align-content: center;
                color: #757575;
                .active{
                    color: #fb7299;
                }
                div{
                    display: flex;
                    align-items: center;
                    margin-right: 15px;
                    span:nth-child(1){
                        font-size: 21px;
                    }
                    span:nth-child(2){
                        font-size: 12px;
                    }
                }
                .careAbout{
                    position: absolute;
                    right: 20px;
                    top: 10px;
                    background-color: red;
                    color: #fff;
                    font-size: 14px;
                    font-weight: 700;
                    padding: 3px 10px 3px 10px;
                    border: 1px solid pink;
                }
                .cancelCare{
                    position: absolute;
                    right: 20px;
                    top: 10px;
                    background-color: red;
                    color: #fff;
                    font-size: 14px;
                    font-weight: 700;
                    padding: 3px 10px 3px 10px;
                    border: 1px solid pink;
                }
            }
        }
    }
    .detailparent{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .detailitem{
            margin: 1.389vw 0;
            width: 45%;
        }
    }
    }
</style>