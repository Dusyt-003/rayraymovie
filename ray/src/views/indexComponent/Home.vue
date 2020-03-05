<template>
  <div class="home">
    
    <div>
      <van-search placeholder="请输入搜索关键词" />
    </div>
    <div class="banner-box">
      <div class="banner">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item>
            <img class="auto-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575957621760&di=dd98785cdf1be88054cd70e0aee759cc&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-05-07%2F5aefe314c18af.jpg" alt="">
          </van-swipe-item>
          <van-swipe-item>
            <img class="auto-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576552887&di=da8a45ccaff9530b631785b94b81f4e1&imgtype=jpg&er=1&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F0%2F5417ca4eabf61.jpg" alt="">
          </van-swipe-item>
          <van-swipe-item>
            <img class="auto-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575958167177&di=05a48bdd016b463809f6cf421e24bbf9&imgtype=0&src=http%3A%2F%2Fdingyue.nosdn.127.net%2FIPLL8LeIEDeFYhdcbew4ZyijaBzLTenjJM2LTuORKOESk1553050989285compressflag.jpeg" alt="">
          </van-swipe-item>

        </van-swipe>
      </div>
    </div>

    <!-- 新片榜 -->
    <div class="new-movie">
      <div class="new-movie-title">
        <span class="fl">新片榜</span>
        <span class="fr" @click="changeNewMovieData">换一换</span>
      </div>
      <div class="new-movie-content">
        <div class="new-movie-box clearfix">
          <div class="new-movie-item" v-for="(item, index) in showNewMovieData.data" :key="index" :id="item.id" @click="viewMovieDetail({name: 'movieDetail', params: {id: item.id}})">
            <div class="new-movie-img">
              <img class="auto-img" :src="item.images.small" alt="">
            </div>
            <div class="new-movie-name one-text">{{item.title}}</div>
            <div class="star-box">
              <div class="fl clearfix star-box-count">
                <!-- 灰星 -->
                <div ref="noactivestar" class="noactive-star">
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                </div>
                <!-- 黄星 -->
                <div class="active-star" :style="{width: item.width + 'px'}">
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                  <span>
                    <van-icon name="star-o" />
                  </span>
                </div>
              </div>
              <div class="fl star-score">{{item.rating.average}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'

  const {mapState} = createNamespacedHelpers('homeModule');

  export default {
    name: 'home',

    computed: {
      ...mapState(['baseUrl', 'newMovieData', 'showNewMovieData', 'isHasData', 'isInit'])
    },

    methods: {
      //换一换数据
      changeNewMovieData() {
        
        if (this.isHasData) {
         

          //提交换一换数据
          this.$store.commit('homeModule/toggleNewMovieData');
        }
      },

      //查看电影详情
      viewMovieDetail(o) {
        this.$router.push(o);
      }

    },

    created() {
  


      if (!this.isInit) {
        return;
      }

      //开启加载提示
      this.$toast.loading({
        duration: 0,
        message: '加载中...'
      });

      //初始化新片榜数据
      this.axios({
        method: 'GET',
        url: this.baseUrl + '/new_movies'
      }).then(result => {

        result.data.subjects.forEach((v) => {
          v.width = 0;
        })

       

        //提交actions
        this.$store
          .dispatch('homeModule/getNewMovieData', result.data.subjects)
          .then(() => {
            //根据星级平均分设置宽度
            let width = this.$refs.noactivestar[0].clientWidth;
     

            //提交modifyNewMovieData
            this.$store.commit('homeModule/modifyNewMovieData', width);

           

            this.$toast.clear();

          })

        

      }).catch(err => {

       

      })
    }
  }
</script>

<style lang="less" scoped>
  .home{
    .star-box-count{
      position: relative;
      width: 90px;
      margin-right: 5px;
      span{
        position: absolute;
        width: 18px;
        height: 18px;
        top: 0;
        font-size: 16px;
        &:nth-child(1){
          left: 0;
        }
        &:nth-child(2){
          left: 18px;
        }
        &:nth-child(3){
          left: 36px;
        }
        &:nth-child(4){
          left: 54px;
        }
        &:nth-child(5){
          left: 72px;
        }
      }
    }
    .noactive-star{
      height: 18px;
      position: relative;
      color: #e5e5e5;
    }

    .active-star{
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      height: 18px;
      color: #FDC03D;
      overflow: hidden;
    }

    .star-score{
      width: 24px;
      height: 18px;
      text-align: center;
      line-height: 18px;
      font-size: 14px;
      color: #FDC03D;
    }

    .banner-box{
      background-color: #fff;
      padding: 10px;
    }
    .banner{
      border-radius: 10px;
      overflow: hidden;
    }
    .new-movie{
      padding: 0 10px 10px;
      margin-top: 10px;
      background-color: #fff;
    }
    .new-movie-title{
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #f2f2f2;
      >span:nth-child(1){
        color: #070707;
        font-size: 18px;
      }

      >span:nth-child(2){
        color: #92835A;
        font-size: 14px;
      }
    }

    .new-movie-content{
      overflow-x: auto;
      margin-top: 10px;
      overflow-y: hidden;
    }
    .new-movie-box{
      width: 1040px;
      >.new-movie-item{
        float: left;
        width: 121.25px;
        margin-right: 10px;
      }
      >.new-movie-item:last-child{
        margin-right: 0px;
      }
    }
    .new-movie-img{
      border-radius: 10px;
      overflow: hidden;
      height: 162px;
    }
    .new-movie-name{
      padding: 10px 0;
      text-align: center;
      font-size: 14px;
      color: #282828;
    }
  }
</style>