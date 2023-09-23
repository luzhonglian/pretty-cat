<template>
  <el-aside :width="store.state.isCollapsed ? '80px' : '220px'">
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="store.state.isCollapsed"
      :collapse-transition="false"
      :router="true"
      :default-active="route.fullPath"
    >
      <el-menu-item index="/home">
        <el-icon><i-ep-home-filled></i-ep-home-filled> </el-icon>
        <span>首页</span>
      </el-menu-item>
      <!-- -------------------------------------------     -->

      <el-menu-item index="/user-center">
        <el-icon><i-ep-avatar></i-ep-avatar></el-icon>
        <span>个人中心</span>
        <!-- -------------------------------------------     -->
      </el-menu-item>
      <!-- ------------------------------------ -->
      <el-sub-menu index="/user-manage" v-admin>
        <template #title>
          <el-icon><i-ep-edit></i-ep-edit></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/user-manage/user-list">用户列表</el-menu-item>
        <el-menu-item index="/user-manage/user-add">添加用户</el-menu-item>
      </el-sub-menu>
      <!-- ------------------------------------ -->
      <el-sub-menu index="/cat-manage">
        <template #title>
          <el-icon><i-ep-picture-filled /></el-icon>
          <span>猫猫管理</span>
        </template>
        <el-menu-item index="/cat-manage/cat-list">美猫列表</el-menu-item>
        <el-menu-item index="/cat-manage/cat-add">新增美猫</el-menu-item>
      </el-sub-menu>
      <!-- ------------------------------------ -->
      <el-sub-menu index="/food-manage">
        <template #title>
          <el-icon><i-ep-knife-fork /></el-icon>
          <span>猫粮推荐</span>
        </template>
        <el-menu-item index="/food-manage/food-list">猫粮列表</el-menu-item>
        <el-menu-item index="/food-manage/food-add">添加猫粮</el-menu-item>
      </el-sub-menu>
      <!-- ------------------------------------ -->
    </el-menu>
  </el-aside>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const route = useRoute();
const store = useStore();
const vAdmin={
  mounted(el) {
    if(store.state.userInfo.role!==1){
      el.parentNode.removeChild(el);
    }
  },
}
</script>

<style lang="less" scoped>
.el-aside {
  height: 100vh;
}
.el-menu {
  height: 100vh;
}
</style>
