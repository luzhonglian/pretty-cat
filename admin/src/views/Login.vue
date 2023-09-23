<template>
  <div class="container">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="110px"
      class="demo-ruleForm"
    >
      <h2>欢迎来到美猫网</h2>
      <!-- ----------------------------------------------- -->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <!-- ----------------------------------------------- -->
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <!-- ----------------------------------------------- -->
      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {  reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const ruleForm = reactive({
  username: "",
  password: "",
});
const ruleFormRef = ref();
const rules = reactive({
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 15, message: "密码要在3-15个字符之间", trigger: "blur" },
  ],
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 15, message: "用户名要在3-15个字符之间", trigger: "blur" },
  ],
});
function resetForm() {
  ruleForm.password = "";
  ruleForm.username = "";
}
function submitForm() {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      //   console.log(ruleForm);
      axios
        .post("/backstage-api/user/login", ruleForm)
        .then((res) => {
          if (res.data.ActionType === "ok") {
            store.commit("setDynamicStatus", false);
            store.commit("setUserInfo", res.data.data);
            router.push("/home");
          } else {
            ElMessage.error("用户名或密码错误");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      ElMessage.error({
        message: "用户名或密码格式有误",
        type: "error",
      });
      return false;
    }
  });
}

</script>

<style lang="less" scoped>
.el-form {
  position: absolute;
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
  text-align: center;
  min-width: 150px;
  background-color: rgba(233, 242, 246, 0.6);
}
h2{
  margin-bottom: 10px;
  margin-top: 5px;
}
.demo-ruleForm {
  width: 300px;
  padding-right: 40px;
}
.container{
  height: 100vh;
  width: 100%;
  // position: relative;
  background-image: url('@/assets/4.jpg');
  background-size: cover;
}
</style>
