<template>
    <div class="home">
        <nav-bar :userInfo="model"></nav-bar>
        <div class="categorytab">
            <div class="category-ico" @click="$router.push('/editcategory')"><van-icon name="setting-o" /></div>
            <van-tabs v-model="active"  sticky>
            <van-tab v-for="(item, index) in category" 
            :key="index" 
            :title="item.title">
                <!-- 下拉加载更多 -->
                <van-list
                v-model="item.loading"
                :finished="item.finished"
                finished-text="没有更多了"
                :immediate-check="false"
                @load="onLoad"
                >
                <!-- 渲染文章 -->
                <div class="detailparent">
                    <detail 
                    class="detailitem"
                    :detailitem="categoryitem" 
                    v-for="(categoryitem, categoryindex) in item.list" 
                    :key="categoryindex"></detail>
                </div>
                </van-list>
            </van-tab>
        </van-tabs>
        </div>
    </div>
</template>

<script>
import NavBar from '@components/common/NavBar'
import Detail from './Detail.vue'

export default {
    name:'Home',
    components:{
        NavBar,
        Detail
    },
    data(){
        return{
            model:{},
            category:[],
            active:0
        }
    },
     activated(){
        this.selectCategory();
    },
    methods:{
        async getData(){
            const res = await this.$http.get('/user/'+ localStorage.getItem('id'));
            this.model = res.data[0];
        },
        async selectCategory(){
            if(localStorage.getItem('newCat')){
                let newCat = JSON.parse(localStorage.getItem('newCat'));
                this.changeCategory(newCat);
                return;
            }
            const res = await this.$http.get('/category');
            this.changeCategory(res.data);
        },
        changeCategory(data){
            const category1 = data.map((item,index) => {
                item.list =[];
                item.page=0;
                item.pagesize=10;
                item.finished = false;
                item.loading = false;
                return item;
            })

            this.category = category1;
            this.selectArticle();
        },
        async selectArticle(){
            const categoryitem = this.categoryItem();
            const res = await this.$http.get('/detail/'+ categoryitem._id,{
                params:{
                    page: categoryitem.page,
                    pagesize: categoryitem.pagesize
                }
            });
            categoryitem.list.push(...res.data);
            categoryitem.loading = false;
            if(res.data.length < categoryitem.pagesize){
                console.log('数据小于10条');
                categoryitem.finished = true;
            }
        },
        categoryItem(){
            const categoryitem = this.category[this.active];
            return categoryitem;
        },
        onLoad(){
            console.log('已经到底部了！');
            const categoryitem = this.categoryItem();
            setTimeout(() => {
                categoryitem.page += 1;
                this.selectArticle();
            }, 1000);
        }
    },
    created(){
        this.getData();
        this.selectCategory();
    },
    watch:{
        active(){
            // this.categoryItem();
            this.selectArticle();
        }
    }
}
</script>

<style lang="less" scoped>
    .home{
        background-color: #fff;
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
    .categorytab{
        position: relative;
        .category-ico{
            position: absolute;
            z-index: 5;
            right: 0;
            top: 1.944vw;
            padding: 1.389vw 2.778vw;
            background-color: white;
        }
    }
</style>