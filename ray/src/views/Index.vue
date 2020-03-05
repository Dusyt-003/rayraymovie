<template>
    <div class="index">

        <div>
            <!-- 二级路由 -->
            <keep-alive><router-view></router-view></keep-alive>
            

        </div>

<van-tabbar v-model="tabbarActive" active-color="#FF371C" inactive-color="#1A1817">
  <van-tabbar-item v-for="(item,index) in tabbarData" :key="index" :name="item.name" :icon="item.icon" @click="togglePage({name:item.name})">{{item.title}}</van-tabbar-item>
 
</van-tabbar>
    </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'

const {mapState} = createNamespacedHelpers('indexModule/')
    export default {
        name:"index",

        data() {
            return {
                 tabbarActive:'buy'
            };
        },
       
       computed:{
           ...mapState(['tabbarData'])
       },

       methods:{
           togglePage(o){
               this.$router.push(o)
           }
       }
    }
</script>

<style lang="less" scoped>
.index{
    padding-bottom: calc(~"1.33333rem + 5px")
}
</style>