<template>
  <div id="app">
    <div class="nav-head-wrap">
      <div class="nav-tab-a">
        <div class="logo-wrap">
          <img src="./assets/logo.png" alt="">
          <h2>校园教案资源管理平台</h2>
        </div>
        <router-link to="/">资源首页</router-link>
        <router-link to="/exam">在线考堂</router-link>
        <router-link to="/self">个人空间</router-link>
        <router-link to=" /back">后台管理</router-link>
        <div class="user-wrap">
          <!--<img src="./assets/images/12.jpg" alt="">
          <span>洋洋洋</span>-->
          <router-link to="/To_Login"><span class="logo-span">请登录</span></router-link>
          
        </div>
      </div>
    </div>

    <div class="wrapper">
      <div class="content">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'App'
  }
</script>

<style>
  /* .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  } */
  /* .fade-enter, .fade-leave-to {
    opacity: 0;
  } */
</style>
