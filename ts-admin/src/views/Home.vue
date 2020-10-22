<template>
  <div class="main">
    <el-container style="height:100vh">
      <el-header height="60px">
        <div class="header-container">
          <div class="header-left">
            <img src="@/assets/logo.png" alt="" />
            <span>后台管理系统</span>
          </div>
          <div class="header-right">
            <el-dropdown :hide-on-click="false">
              <span class="el-dropdown-link">
                登陆/注册<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="180px">
          <el-menu
            v-if="MenuData.length > 0"
            style="height:100%"
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-submenu
              :index="item.name"
              v-for="(item, index) in MenuData"
              :key="item + index"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>{{ item.name }}</template
              >
              <el-menu-item
                :index="item1.path"
                v-for="(item1, index1) in item.children"
                :key="item1 + index1"
              >
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{ item1.name }}</span>
                </template></el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main><router-view :key="$route.path"></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
// import Vue from "vue";
import { Component, Vue } from "vue-property-decorator";
import MenuList from "../assets/MenuData";
@Component
export default class Home extends Vue {
  MenuData: Array<any> = [];
  created() {
    this.MenuData = MenuList;
    // console.log(this.MenuData);
  }
}
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
}
.el-header {
  background-color: #999;
  line-height: 60px;
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-left {
      img {
        width: 45px;
        height: 45px;
        vertical-align: middle;
      }
    }
    .header-right {
      height: 40px;
      line-height: 40px;
      text-align: center;
      span {
        cursor: pointer;
        font-size: 16px;
        text-decoration: none;
        &:hover {
          color: blue;
        }
      }
    }
  }
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
  // line-height: 160px;
}
</style>
