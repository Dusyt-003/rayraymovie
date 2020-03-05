<template>
  <div class="buy">
    <div class="buy-nav clearfix">
      <div class="fl serach">
        <span class="fr serach-icon">
          <van-icon name="search" />
        </span>
      </div>
      <div class="fl toggle">
        <div class="toggle-content">
          <div class="fl active">电影</div>
          <div class="fl">影院</div>
        </div>
      </div>
      <div class="fr location">广州</div>
    </div>
    <div><router-view></router-view></div>
  </div>
</template>

<script>
export default {
  name: "buy"
};
</script>

<style lang="less" scoped>
.buy {
  .serach {
    width: 30px;
    height: 40px;
    .serach-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;

      margin-top: 10px;
    }
  }
  .toggle {
    width: calc(~"100% - 70px");
    height: 40px;

    .toggle-content {
      width: 120px;
      margin: 0 auto;
      background-color: #f9f9fb;
      text-align: center;
      border-radius: 10px;
      overflow: hidden;
      line-height: 20px;
      margin-top: 10px;
      font-size: 14px;
      > div {
        width: 60px;
        height: 20px;
        color: #8798af;
        &.active {
          background-color: #fff;
         color:#1a1817;
        }
      }
    }
  }
  .location {
    
   
    line-height: 40px;
    width: 40px;
    height: 40px;
  }
}
</style>