<template>
  <el-header>
    <div class="left">
      <el-icon @click="handleMenu"><i-ep-menu></i-ep-menu></el-icon>
      美猫网后台管理
    </div>
    <div class="right">
      <el-icon :size="30" @click="toggleDark()">
        <i-ep-moon v-if="isDark" />
        <i-ep-sunny v-else />

      </el-icon>

      欢迎喜猫靓仔{{ person }}
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon :size="30"><i-ep-user-filled></i-ep-user-filled></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toUserCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click="quitLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useDark, useToggle } from "@vueuse/core";
const store = useStore();
const router = useRouter();
const isDark = useDark();
const toggleDark = useToggle(isDark);


let person = computed(() => {
  return store.state.userInfo.username == "lzl"
    ? "鲁仲连"
    : store.state.userInfo.username;
});
const handleMenu = () => {
  store.commit("setCollapse");
};
const toUserCenter = () => {
  router.push("/user-center");
};
const quitLogin = () => {
  router.push("/login");
};
</script>

<style lang="less" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-image: -moz-linear-gradient(
    45deg,
    rgb(255, 190, 158),
    rgb(168, 225, 255)
  );

  background-image: -webkit-linear-gradient(
    45deg,
    rgb(255, 190, 158),
    rgb(168, 225, 255)
  );

  background-image: linear-gradient(
    45deg,
    rgb(255, 190, 158),
    rgb(168, 225, 255)
  );
  font-size: 20px;
}
.left,
.right {
  display: flex;
  i {
    margin: auto;
  }
  align-items: center;
}
.left {
  margin-left: 10px;
}
</style>
