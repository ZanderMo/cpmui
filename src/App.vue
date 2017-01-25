<template>
  <div id="app">
    <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true">iCoolPy物联</x-header>
    <div class="header-space"></div>
    <actionsheet :menus="menus" v-model="showMenus" show-cancel>aaaa</actionsheet>
    <router-view></router-view>
    <tabbar>
      <tabbar-item link="/Hubs">
        <img slot="icon" src="./assets/images/icon_nav_button.png">
        <span slot="label">设备</span>
      </tabbar-item>
      <tabbar-item show-dot>
        <img slot="icon" src="./assets/images/icon_nav_msg.png">
        <span slot="label">Message</span>
      </tabbar-item>
      <tabbar-item selected link="/component/demo">
        <img slot="icon" src="./assets/images/icon_nav_article.png">
        <span slot="label">Explore</span>
      </tabbar-item>
      <tabbar-item badge="2" link="/Login">
        <img slot="icon" src="./assets/images/icon_nav_cell.png">
        <span slot="label">登陆</span>
      </tabbar-item>
    </tabbar>
    <div class="foot-space"></div>
  </div>
</template>

<script>
  import { XHeader, Actionsheet, Tabbar, TabbarItem } from 'vux' 
  export default {
    name: 'app',
    components: {
      XHeader,
      Actionsheet,
      Tabbar,
      TabbarItem
    },
    data() {
      return {
        menus: {
          menu1: 'Take Photo',
          menu2: 'Choose from photos'
        },
        showMenus: false
      }
    },
  }
</script>

<style lang="less">
body{
  margin: 0px;
  padding: 0px;
  background-color:#fbf9fe; 
  a:link,a:visited,a:hover,a:active {
    text-decoration:none;
  }
    #app {
      margin: 0px;
      padding: 0px;
      .foot-space{
        height:100px;
      }
      .header-space{
        height: 45px;
      }
      .weui_tabbar{
        position:fixed;
      }
      .vux-header{
        position:fixed;
        width:100%;
        top:0px;
        z-index: 100;
      }
      
    }
  }
</style>