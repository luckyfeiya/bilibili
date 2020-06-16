<template>
  <div class="commentItems">
    <div class="userInfo" v-for="(item, index) in commentChild" :key="index">
      <div>
            <div class="infoTop">
                <!-- 评论者头像 -->
                <div class="userImg">
                    <img v-if="item.userinfo.user_img" :src="item.userinfo.user_img"/>
                    <img v-else src="@assets/default_img.jpg" />
                </div>

                <!-- 评论信息和日期 -->
                <div class="commentContent">
                    <p>
                        <span>{{ item.userinfo.name }}</span>
                        <span>{{ item.comment_date }}</span>
                    </p>
                </div>
            </div>

            <!-- 评论内容 -->
            <div class="itemContent">
                <div v-if="!temp">{{ item.comment_content }}<span class="publish" @click="itemClick(item.comment_id)" >回复</span></div>
                <div v-else>回复 <span style="color: #478ef0;">@{{item.parent_user_info.name}}</span>:{{ item.comment_content }}
                <span class="publish" @click="itemClick(item.comment_id)" >回复</span>
                </div>
            </div>
      </div>
      <!-- 子回复评论 -->
      <comment-item :commentChild="item.child" temp="true" @postChild="postChild" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentItem",
  props: ["commentChild","temp"],
  methods:{
      itemClick(id){
          this.$emit('postChild',id);
          this.$emit('postPublish',id);
      },
      postChild(id){
          this.itemClick(id);
      }
  }
};
</script>

<style lang="less">
.commentItems{
    .userInfo{
        .infoTop{
            display: flex;
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
                p{
                    margin: 0;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 100%;
                    span{
                        font-size: 13px;
                        color: #aaa;
                    }
                }
            }
        }
        .itemContent{
            padding-right: 20px;
            position: relative;
            font-size: 13px;
            margin-left: 40px;
            margin-bottom: 10px;
            .publish{
                color: red;
                position: absolute;
                right: 0;
            }
            .publish:hover{
                cursor: pointer;
                color: blue;
            }
        }
    }
}
</style>
