<template>
  <!-- --------------------header for search -->
  <div class="cat-header">
    <div class="search">
      <el-popover
        placement="bottom"
        title="检索内容"
        width="50%"
        trigger="click"
        :visible="showPopover"
      >
        <template #reference>
          <el-input
            v-model="searchText"
            class="w-50 m-2"
            placeholder="检索内容"
            :prefix-icon="Search"
            type="search"
            size="large"
            @click="showPopover = true"
            @blur="showPopover = false"
          />
        </template>
        <div v-if="searchResult.length">
          <div
            class="search-result"
            v-for="item in searchResult"
            :key="item._id"
            @click="handleClick(item._id)"
          >
            {{ item.title }}
          </div>
        </div>

        <div v-else>
          <el-empty description="无匹配内容的喔" :image-size="30" />
        </div>
      </el-popover>
    </div>
  </div>
  <!-- --------------------top for show recent lists -->
  <div class="cat-top" style="display: inline-block">
    <!-- -------------------- 骨架屏-->
    <el-space alignment="start" :size="20" v-if="topCatList.length === 0">
      <el-skeleton style="width: 22vw; display: inline-block" animated>
        <template #template class="xxxx">
          <el-skeleton-item
            variant="image"
            style="width: 280px; height: 240px"
          />
          <div style="padding: 14px">
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
            <el-skeleton-item variant="p" style="width: 50%" />
          </div>
        </template>
      </el-skeleton>
      <el-skeleton style="width: 22vw; display: inline-block" animated>
        <template #template class="xxxx">
          <el-skeleton-item
            variant="image"
            style="width: 280px; height: 240px"
          />
          <div style="padding: 14px">
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
            <el-skeleton-item variant="p" style="width: 50%" />
          </div>
        </template>
      </el-skeleton>
      <el-skeleton style="width: 22vw; display: inline-block" animated>
        <template #template class="xxxx">
          <el-skeleton-item
            variant="image"
            style="width: 280px; height: 240px"
          />
          <div style="padding: 14px">
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
            <el-skeleton-item variant="p" style="width: 50%" />
          </div>
        </template>
      </el-skeleton>
      <el-skeleton style="width: 22vw; display: inline-block" animated>
        <template #template class="xxxx">
          <el-skeleton-item
            variant="image"
            style="width: 280px; height: 240px"
          />
          <div style="padding: 14px">
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
            <el-skeleton-item variant="p" style="width: 50%" />
          </div>
        </template>
      </el-skeleton>
    </el-space>
    <el-row :gutter="20">
      <el-col
        :span="6"
        v-for="item in topCatList"
        :key="item._id"
        @click="handleClick(item._id)"
      >
        <div>
          <el-card :body-style="{ padding: '0px' }">
            <img :src="'http://localhost:3000' + item.cover" class="image" />
            <div style="padding: 14px">
              <span>{{ item.title }}</span> &nbsp
              <span
                :style="{
                  fontSize: '14px',
                  color:
                    item.category === 1
                      ? 'rgb(228, 95, 24)'
                      : 'rgb(57, 154, 244)',
                }"
                >{{ item.category == 1 ? "美猫欣赏" : "美猫领养" }}</span
              >
              <div class="bottom">
                <time class="time">{{ item.editTime }}</time>
              </div>
            </div>
          </el-card>
        </div></el-col
      >
    </el-row>
  </div>

  <div class="cat-tab" style="margin: 0 20px">
    <el-row :gutter="20">
      <!-- -------------------- -->
      <el-col :span="18">
        <el-tabs v-model="activeName" class="demo-tabs">
          <el-tab-pane
            :label="item.label"
            :name="item.name"
            v-for="item in categories"
            :key="item.name"
          >
            <el-card
              :body-style="{ padding: '0px' }"
              v-for="data in groupedList[item.name]"
              style="margin-bottom: 5px; overflow: hidden"
              @click="handleClick(data._id)"
            >
              <img
                :src="'http://localhost:3000' + data.cover"
                class="image"
                style="float: left; height: 120px; width: 180px"
              />
              <div style="position: relative; left: 150px; top: 30px">
                《<span>{{ data.title }}</span
                >》

                <div class="bottom">
                  <time class="time">{{ data.editTime }}</time>
                </div>
              </div>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <!-- -------------------- -->
      <el-col :span="6" class="cat-timeline">
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in groupedList[activeName]"
            :key="index"
            :timestamp="item.editTime"
          >
            {{ item.title }}
          </el-timeline-item>
        </el-timeline>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { dayjs } from "element-plus";
import axios from "axios";
import _ from "lodash";
import { useRouter } from "vue-router";
const searchText = ref("");
const showPopover = ref(false);
const catList = ref([]);
onMounted(async () => {
  let result = await axios.get("/web-api/cat/list");
  catList.value = result.data.data;
  catList.value.forEach((item) => {
    item.editTime = dayjs(item.editTime).format("YYYY-MM-DD HH:mm");
  });
});
const searchResult = computed(() => {
  return searchText.value === ""
    ? []
    : catList.value.filter((item) => item.title.includes(searchText.value));
});
//----------------------------------------top
const topCatList = computed(() => {
  return catList.value.slice(0, 4);
});
//----------------------------------------tab
const categories = [
  { label: "美猫欣赏", name: 1 },
  { label: "美猫领养", name: 2 },
];
const groupedList = computed(() => {
  return _.groupBy(catList.value, (item) => item.category);
});
const activeName = ref(1);
//----------------------------------------点击跳转处理
const router = useRouter();
const handleClick = (_id) => {
  // console.log(_id);
  router.push("/cat/" + _id);
};
</script>

<style lang="less" scoped>
.cat-header {
  height: 400px;
  width: 100%;
  background-image: url("../assets/666.jpg");
  background-size: cover;
  position: relative;
  .search {
    position: absolute;
    width: 50%;
    top: 320px;
    left: 28%;
    opacity: 0.85;
    text-align: center;
    .el-input {
      width: 100%;
    }
  }
}
.search-result {
  &:hover {
    color: rgba(255, 0, 0, 0.6);
    cursor: pointer;
  }
}
.cat-top {
  margin: 5px 10px;

  img {
    width: 100%;
    height: 240px;
  }
}
.el-card {
  &:hover {
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.402);
    margin-top: -5px;
  }
  time {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.667);
  }
}
.cat-timeline {
  margin-top: 50px;
}
</style>
