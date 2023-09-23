<template>
  <div>
    <el-page-header :icon="null" title="美猫网">
      <template #content>
        <span class="text-large font-600 mr-3"> 首页 </span>
      </template>
    </el-page-header>

    <el-card class="box-card">
      <el-row>
        <el-col :span="6"><el-avatar :size="60" :src="avatarSrc" /></el-col>
        <el-col :span="18"
          ><span style="line-height: 60px; font-size: 20px">{{
            welcomeWords
          }}</span></el-col
        >
      </el-row>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>广告位招租</span>
        </div>
      </template>
      <el-carousel :interval="3000" type="card" height="200px" v-if="carouselData.length">
        <el-carousel-item v-for="item in carouselData" :key="item._id">
          <div :style="{backgroundImage:`url(http://localhost:3000/${item.cover})`,backgroundSize:'cover'}">
            <h3 text="2xl" justify="center">{{ item.title }}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script setup>
import axios from "axios";
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const carouselData = ref([]);
onMounted(() => {
  getTableData();
});
const getTableData = async () => {
  let result = await axios.get("backstage-api/food/list");
  carouselData.value = result.data.data.sort(
    (a, b) => new Date(b.editTime) - new Date(a.editTime)
  );
};


let welcomeWords = computed(() => {
  return `人生在于体验，今天也要过得开心♥${
    new Date().getHours() < 20 ? "记得每天运动喔！" : "记得早睡喔！"
  }`;
});

let avatarSrc = computed(() => {
  return store.state.userInfo.avatar
    ? 'http://localhost:3000'+store.state.userInfo.avatar
    : "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
});
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 40px;
}

.el-carousel__item h3 {
  color: rgb(243, 238, 238);
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
