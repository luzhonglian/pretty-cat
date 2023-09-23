<template>
  <div class="navbar">
    <el-menu
      :default-active="route.fullPath"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/cat">美猫欣赏与领养</el-menu-item>
      <el-menu-item index="/food">猫粮推荐</el-menu-item>
      <el-menu-item index="" @click="handleClick">登录后台</el-menu-item>
      <div class="nav-right">
        <el-icon :size="30" @click="toggleDark()">
          <i-ep-moon v-if="isDark" />
          <i-ep-sunny v-else />
        </el-icon>
        <span>欢迎来到美猫网</span>
      </div>
    </el-menu>
  </div>
</template>

<script setup>
import { useDark, useToggle } from "@vueuse/core";
const isDark = useDark();
const toggleDark = useToggle(isDark);

const route = useRoute();
const handleClick = () => {
  window.open("http://localhost:8081/#/login", "_blank");
};
</script>

<style lang="less" scoped>
.nav-right {
  line-height: 58.4px;
  text-align: center;
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
}
.navbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
