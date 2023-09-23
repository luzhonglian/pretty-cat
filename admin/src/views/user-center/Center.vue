<template>
  <div>
    <el-page-header :icon="null" title="美猫网">
      <template #content>
        <span class="text-large font-600 mr-3"> 个人中心 </span>
      </template>
    </el-page-header>
    <!-- -------------------------------------------------- -->
    <el-row :gutter="20" class="el-row">
      <el-col :span="7">
        <el-card class="box-card">
          <el-avatar :size="100" :src="avatarSrc" />
          <p>{{ username }}</p>
          <h3>{{ role == 1 ? "管理员" : "编辑" }}</h3>
        </el-card>
      </el-col>

      <el-col :span="15">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <!-- -------------------------------------------------- -->
          <el-form
            ref="userFormRef"
            :model="userForm"
            :rules="userRules"
            label-width="120px"
            class="demo-ruleForm"
            status-icon
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" />
            </el-form-item>
            <!-- -------------------- -->
            <el-form-item label="新密码" prop="password">
              <el-input v-model="userForm.password" type="password" />
            </el-form-item>
            <!-- -------------------- -->
            <el-form-item label="性别" prop="gender">
              <el-select
                v-model="userForm.gender"
                placeholder="Select"
                style="width: 100%"
              >
                <el-option
                  v-for="item in allGenders"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <!-- -------------------- -->
            <el-form-item label="简介" prop="introduction">
              <el-input
                v-model="userForm.introduction"
                :rows="4"
                type="textarea"
                placeholder="请输入简介"
              />
            </el-form-item>
            <!-- -------------------- -->
            <el-form-item label="头像" prop="avatar">
              <Upload :pic="userForm.avatar" @newAvatar="avaChange" />
            </el-form-item>
            <!-- -------------------- -->
            <el-form-item>
              <el-button type="primary" @click="saveChange">保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { upload } from "@/utils/upload";
const userFormRef = ref(null);
const userRules = reactive({
  username: [
    { required: true, message: "不能没有用户名的喔", trigger: "blur" },
    {
      min: 3,
      max: 15,
      required: true,
      message: "用户名要在3-15个字符之间",
      trigger: "blur",
    },
  ],
  password: [
    {
      min: 3,
      max: 15,
      message: "密码要在3-15个字符之间",
      trigger: "blur",
    },
  ],
  gender: [{ required: true, trigger: "blur" }],
  introduction: [{ required: true, message: "要有简介的喔", trigger: "blur" }],
  avatar: [{ required: true }],
});
const store = useStore();
const { username, avatar, gender, introduction, role } = store.state.userInfo;
const userForm = reactive({
  username,
  avatar,
  gender,
  introduction,
  file: null,
  password: "",
});
const allGenders = [
  {
    value: 0,
    label: "保密",
  },
  {
    value: 1,
    label: "男",
  },
  {
    value: 2,
    label: "女",
  },
];
let avatarSrc = computed(() => {
  return store.state.userInfo.avatar
    ? "http://localhost:3000" + store.state.userInfo.avatar
    : "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
});
const avaChange = (rawFile) => {
  userForm.avatar = URL.createObjectURL(rawFile);
  // console.log(userForm.avatar); blob:http://localhost:8080/c9fd7dd5-35cf-44b7-89cb-43655dc775d3
  userForm.file = rawFile;
  // console.log(userForm.file); File对象
};
const saveChange = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      //因userForm里有文件，需要用FormData进行处理
      let res = await upload("/backstage-api/user/upload", userForm);
      if (res.ActionType === "ok") {
        store.commit("setUserInfo", res.data);
        ElMessage.success({
          message: "保存成功",
          type: "success",
        });
        // console.log(res.data.data.avatar); /avatars/861a9ec1a2a30c0df94a95adb32dea27
        //后端返回的是相对地址，要加host
      }
    } else {
      ElMessage.error({
        message: "表单验证失败",
        type: "error",
      });
    }
  });
};
</script>

<style lang="less" scoped>
.el-row {
  margin-top: 20px;
  .box-card {
    text-align: center;
  }
}
</style>
