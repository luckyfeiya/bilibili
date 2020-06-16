import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '@views/Register.vue'
import Login from '@views/Login.vue'
import UserInfo from '@views/UserInfo.vue'
import Edit from '@/views/Edit.vue'
import Article from '@views/Article.vue'
import EditCategory from '@views/EditCategory.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import http from '../../http'
import { Toast } from 'vant';
import { Uploader } from 'vant';



Vue.prototype.$msg = Toast
Vue.prototype.$http = http
Vue.use(Vant);
Vue.use(Uploader);
Vue.use(VueRouter)

  const routes = [
    {
      path:'/home',
      component:Home,
      meta:{
        keepalive:true
      }
    },
    {
      path:'/article/:id',
      component:Article
    },
    {
      path:'/register',
      component:Register
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/userinfo',
      component:UserInfo,
      meta:{
        istoken:true
      }
    },
    {
      path:'/edit',
      component:Edit,
      meta:{
        istoken:true
      }
    },
    {
      path:'/editcategory',
      component:EditCategory
    }
]

const router = new VueRouter({
  mode:'history',
  routes
})

router.beforeEach((to,from,next) => {
  if((!localStorage.getItem('token') || !localStorage.getItem('id')) && to.meta.istoken == true){
    router.push('/login')
    Vue.prototype.$msg.fail('请重新登录');
    return
  }
  next();
})

export default router
