<template>
    <div @click="pathPush">
        <div class="detailitem">
            <div class="imgparent">
                <img :src="detailitem.img" alt="" style="width:100%; height:27.778vw">
                <div class="iconparent">
                    <div class="icon-play2"><span class="video">1233</span></div>
                    <div class="icon-file-text"><span class="comment">{{!detailitem.commentlen ? 66 : detailitem.commentlen}}</span></div> 
                </div>  
            </div>
            <p>{{detailitem.name}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'Detail',
    props:['detailitem'],
    methods:{
        pathPush(){
            if(this.$route.params.id != this.detailitem.id){
                this.$router.push('/article/' + this.detailitem.id);
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .detailitem{
        p{
            font-size: 3.333vw;
            margin: 0;
        }
        .imgparent{
            position: relative;
            .iconparent{
                display: flex;
                justify-content: space-between;
                position: absolute;
                left: 0;
                right: 0;
                bottom: 8px;
                color: #fff;
                padding: 0 5px;
                background: linear-gradient(0deg,rgba(0,0,0,0.85),transparent);
                font-size: 14px;
            }
        }
    }
</style>