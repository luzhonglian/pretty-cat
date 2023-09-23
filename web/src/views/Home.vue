<template>
  <div>
    <el-carousel height="calc(100vh - 60px)">
      <el-carousel-item :key="1">
        <div
          :style="{ backgroundImage: `url(${require('@/assets/3.jpg')})` }"
          class="kitten"
        ></div>
      </el-carousel-item>
      <el-carousel-item :key="2">
        <div
          :style="{ backgroundImage: `url(${require('@/assets/7.jpg')})` }"
          class="kitten"
        ></div>
      </el-carousel-item>
      <el-carousel-item :key="3">
        <div
          :style="{ backgroundImage: `url(${require('@/assets/5.jpg')})` }"
          class="kitten"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <div class="intro">小猫的存在<br />让生活更快乐</div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.el-carousel {
  div {
    height: 100%;
    width: 100%;
    background-size: cover;
  }
}
.intro {
  position: absolute;
  right: 80px;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  color: #130303bb;
  font-weight: 700;
  /* background-color: rgba(0,0,0,0.5); */
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
</style>
