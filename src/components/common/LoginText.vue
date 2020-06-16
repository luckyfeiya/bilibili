<template>
    <div class="login_text">
        <van-field v-model="content" 
        :label="label" 
        :type="type"
        :placeholder="placeholder"
        :rule="rule"
        />
    </div>
</template>

<script>
export default {
    name:'LoginText',
    props:['label','type','placeholder','rule'],
    data(){
        return{
            content:''
        }
    },
    methods:{
        handleRulg(){
            const rue = new RegExp(this.rule);
            if(rue.test(this.content)){
                this.$emit('changeInput',this.content);
            }
        }
    },
    watch:{
        content(){
            this.handleRulg();
        }
    }
}
</script>

<style lang="less">
    .login_text{
        margin-top: 2px;
    }
</style>