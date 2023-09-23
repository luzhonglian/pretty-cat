<template>
  <div>
    <el-skeleton
      style="width: 240px"
      animated
      v-if="Object.keys(currentCat).length === 0"
      :throttle="200"
    >
      <template #template>
        <div style="padding: 14px">
          <el-skeleton-item variant="p" style="width: 50%" />
          <div
            style="
              display: flex;
              align-items: center;
              justify-items: space-between;
            "
          >
            <el-skeleton-item variant="text" style="margin-right: 16px" />
            <el-skeleton-item variant="text" style="width: 30%" />
          </div>
         
        </div>
        <el-skeleton-item
            variant="image"
            style="width: 640px; height: 430px"
          />
      </template>
    </el-skeleton>
    <!-- -------------------- -->
    <el-row>
      <el-col :span="16" :offset="2" :pull="1">
        <div class="cat-title">
          <h2>{{ currentCat.title }}</h2>
          <br />
          <div>{{ currentCat.editTime }}</div>
        </div>
        <el-divider style="width: 90%; margin-left: 40px">
          <el-icon><i-ep-fries /></el-icon>
        </el-divider>
        <div v-html="currentCat.content" class="cat-content"></div>
      </el-col>
      <!-- -------------------- -->
      <el-col :span="5" :pull="1" :offset="1">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>最新美猫动态</span>
            </div>
          </template>
          <div
            v-for="item in recentCatList"
            :key="item._id"
            class="text item"
            @click="handleClick(item._id)"
          >
            <h3>{{ item.title }}</h3>
            <div>{{ item.editTime }}</div>
            <el-divider>
              <el-icon><i-ep-arrow-down /></el-icon>
            </el-divider>
          </div> </el-card
      ></el-col>
      <!-- -------------------- -->
    </el-row>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { dayjs } from "element-plus";
import { watchEffect } from "vue";
const currentCat = reactive({});
const recentCatList = ref([]);
const route = useRoute();
watchEffect(async () => {
  if (!route.params._id) {
    return;
  }
  let result = await axios.get("/web-api/cat/list/" + route.params._id);
  let topResult = await axios.get("/web-api/cat/toplist?limit=4");
  //   console.log(topResult.data.data);
  Object.assign(currentCat, result.data.data);
  currentCat.editTime = dayjs(currentCat.editTime).format("YYYY-MM-DD HH:mm");

  recentCatList.value = topResult.data.data;
  recentCatList.value.forEach((item) => {
    item.editTime = dayjs(item.editTime).format("YYYY-MM-DD HH:mm");
  });
});

const router = useRouter();
const handleClick = (_id) => {
  router.push("/cat/" + _id);
};
</script>

<style lang="less" scoped>
.cat-content {
  margin: 10px 200px 10px 40px;
  text-align: left;
}
.box-card {
  margin-top: 40px;
}
.cat-title {
  margin-top: 50px;
  margin-left: 40px;
}
</style>
