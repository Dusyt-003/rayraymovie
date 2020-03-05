<template>
  <div id="app">
    <!-- 一级路由 -->
    <router-view />
  </div>
</template>

<style lang="less">
// 全局样式
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix::after {
  display: block;
  content: "";
  clear: both;
}
.auto-img{
  width: 100%;
  display: block;
}
.one-text{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
