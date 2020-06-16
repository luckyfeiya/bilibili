<template>
  <div class="userdatail">
    <div>
      <div class="user_img">
          <img :src="model.user_img" alt="" v-if="model.user_img"/>
          <img src="@assets/default_img.jpg" alt="" v-else>
          </div>
      <div class="user_edit">
        <div>
          <p>
            <span>0</span>
            <span class="user_text">粉丝</span>
          </p>
          <p>
            <span>54</span>
            <span class="user_text">关注</span>
          </p>
          <p>
            <span>0</span>
            <span class="user_text">获赞</span>
          </p>
        </div>
        <div @click="$router.push('/edit')">
          <div class="user_editbtn">编辑资料</div>
        </div>
      </div>
    </div>
    <div>
      <h2>{{model.name}}</h2>
      <p v-if="model.user_desc">{{model.user_desc}}</p>
      <p v-else>这个人很神秘什么都没有写</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserDetail",
  props:['userInfo'],
  data(){
      return{
          model:{}
      }
  },
  methods:{
      async getData(){
          const res = await this.$http.get('/user/' + localStorage.getItem('id'));
          // console.log(res);
          this.model = res.data[0];
      }
  },
  created(){
      this.getData();
  }
};
</script>

<style scoped lang="less">
.userdatail {
  > div:nth-child(1) {
    display: flex;
  }
  background-color: #fff;
  padding: 0 12px;
  .user_img {
    margin-right: 20px;
    img {
      width: 85px;
      height: 85px;
      border-radius: 50%;
    }
  }
  .user_edit {
    flex: 1;
    div:nth-child(1) {
      display: flex;
      p {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 13px;
        .user_text {
          color: #aaa;
        }
      }
    }
    div:nth-child(2) {
      padding: 5px 10px;
      .user_editbtn {
        border: 1px solid #fb7a9f;
        padding: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fb7a9f;
        border-radius: 3px;
      }
    }
  }
  >div:nth-child(2){
      h2{
          margin: 10px 0 3px 0;
          font-weight: 400;
      }
      p{
          padding: 0;
          margin: 0;
          color: #999;
          font-size: 13px;
      }
  }
}
</style>
