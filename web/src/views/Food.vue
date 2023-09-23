<template>
  <div>
    <el-carousel
      height="calc(100vh - 58.4px)"
      direction="vertical"
      v-if="loopList.length"
    >
      <el-carousel-item v-for="item in loopList" :key="item._id">
        <div
          :style="{
            backgroundImage: `url(http://localhost:3000${item.cover})`,
          }"
          class="bg-img"
        >
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <h2>{{ item.title }}</h2>
              </div>
            </template>
            <div>简介：{{ item.introduction }}</div>
            <br />
            <el-divider>
              <el-icon><i-ep-chicken /></el-icon>
            </el-divider>
            <div>详细介绍:</div>
            <br />
           
            <div style="padding-right:30% ;padding-left: 5%;">&nbsp;&nbsp;{{ item.detail }}</div>
          </el-card>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div v-else><el-empty description="暂无金主" /></div>
  </div>
</template>

<script setup>
import axios from "axios";

const loopList = ref([]);
onMounted(async () => {
  let result = await axios.get("/web-api/food/list");
  loopList.value = result.data.data.sort(
    (a, b) => new Date(b.editTime) - new Date(a.editTime)
  );
});
</script>

<style lang="less" scoped>
.bg-img {
  width: 100%;
  height: 100%;
  background-size: cover;
}

::v-deep .el-carousel {
  button {
    display: inline-block;

    height: 60px;
    width: 10px;
    background-color: rgba(12, 67, 49, 0.322);
  }
  .box-card {
    padding-top: 50px;
    width: 50%;
    height: 100%;
    background-color: rgba(252, 252, 252, 0.326);
  }
}
</style>
