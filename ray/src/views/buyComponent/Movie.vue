<template>
  <div class="movie">
    <van-tabs v-model="activeName" line-height="none" title-active-color="#ee0a24">
      <van-tab title="正在热映" name="a">
        <div
          class="movie-box clearfix"
          v-for="(item, index) in movieData.data.subjects"
          :key="index"
        >
          <div class="fl movie-img">
            <img class="auto-img" :src="item.images.medium" alt />
          </div>
          <div class="fr movie-item">
            <span class="one-item">{{item.title}}</span>
            <div class="movie-info clearfix">
              <span class="fl movie-grade">观影评分：</span>
              <span class="fl grade">{{item.rating.average}}</span>
            </div>
            <div class="movie-director one-text">{{item.directorsInfo}}</div>
            <div class="movie-actor">
              <span>{{item.avatarsInfo}}</span>
            </div>
            <div class="buy-btn">购票</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="即将上映" name="b">即将上映</van-tab>
    </van-tabs>
  </div>
</template>

<script>

import { createNamespacedHelpers } from "vuex";

const { mapState } = createNamespacedHelpers("movieModule");
export default {
  name: "movie",
  data() {
    return {
      activeName: "a"
    };
  },
  computed: {
    ...mapState(["movieData","params"])
  },
 method:{
    getMovieData(){

    }
  },
  created() {
    
    this.$toast.loading({
      duration:0,
      message: "加载中...",
     
    });
    // 请求数据
    this.axios({
      method: "GET",
      url:
        "https://douban.uieee.com/v2/movie/in_theaters",
      // 请求参数
        params:this.params
    })
      .then(result => {
        result.data.subjects.forEach(v => {
          //合并电影类型

          v.avatarsInfo = "";
          v.directorsInfo = "";
          //合并演员
          v.casts.forEach(item => {
            v.avatarsInfo += item.name + " / ";
          });
          v.directors.forEach(item => {
            v.directorsInfo += item.name;
          });

          v.avatarsInfo = v.avatarsInfo.slice(0, -3);
        });

      
        this.$store.commit("movieModule/changeMovieData", result);
         this.$toast.clear()
      })
     
      .catch(err => {
      
         this.$toast.clear()
      })
  },

  mounted(){
  window.onscroll = function (e) {
  // 函数节流和函数防抖

  let timers = []
  let timer = setTimeout(() => {
 for (let i = 0; i < timers.length; i++) {
    clearTimeout(timer[i])
    
  }

  //发去数据请求
  },600)
 
  timers.push(timer)
  } 

    
  }
 

};
</script>

<style lang="less">
.buy {
  .van-tabs__line {
    height: 0.02rem;
  }
  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border: none;
  }
  .movie {
    position: fixed;
    top: 40px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
  .movie-box {
    
    padding: 20px 0;
    padding-right: 50px;
    position: relative;
    margin: 10px 30px 10px 20px;
    border: 1px solid rgba(255, 134, 28, 0.1);
    box-shadow: 1px 1px 10px rgba(255, 134, 28, 0.2);
    border-radius: 10px;

    .movie-img {
      position: absolute;
      top: 15px;
      left: -10px;
      width: 80px;
      height: 100px;
      > img {
        border-radius: 5px;
        width: 80px;
        height: 100px;
      }
    }
    .movie-item {
      width: calc(~"100% - 100px");
      margin-left: 10px;
      color: #1a1817;
      .one-item {
        margin: 10px auto;
        font-size: 16px;
        font-weight: bold;
      }

      .movie-grade {
        font-weight: 700;
        margin: 10px auto;
        font-weight: 500;
      }
      .grade {
        font-weight: 700;
        margin: 10px auto;
        color: #ffa658;
      }
      .movie-director {
        font-weight: 600;
        color: #9f9f9f;
      }
      .movie-actor {
        font-weight: 600;
        color: #9f9f9f;
      }
      .buy-btn {
        background-color: #ff861c;
        border-radius: 20px;
        text-align: center;
        height: 25px;
        line-height: 25px;
        width: 60px;
        font-weight: 600;
        color: white;
        position: absolute;
        right: -10px;
        bottom: 10px;
      }
    }
  }
}
</style>