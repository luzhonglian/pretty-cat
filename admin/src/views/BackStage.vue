<template>
  <div>
    <el-container>
      <aside-menu class="my-menu"></aside-menu>
      <el-container direction="vertical">
        <top-header></top-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import AsideMenu from "@/components/AsideMenu.vue";
import TopHeader from "@/components/TopHeader.vue";
</script>

<style lang="less" scoped>
.el-main{
  max-width: 900px;
}

</style>
