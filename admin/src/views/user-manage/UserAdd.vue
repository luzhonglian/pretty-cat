<template>
  <div>
    <el-page-header :icon="null" title="用户管理">
      <template #content>
        <span class="text-large font-600 mr-3"> 添加用户 </span>
      </template>
    </el-page-header>
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
      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password" type="password" />
      </el-form-item>
      <!-- -------------------- -->
      <el-form-item label="角色" prop="role">
        <el-select v-model="userForm.role" placeholder="请选择角色">
          <el-option
            v-for="item in allRoles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!-- -------------------- -->
      <el-form-item label="性别" prop="gender">
        <el-select v-model="userForm.gender" placeholder="请选择性别">
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
      <!-- --------------------头像 -->
      <el-form-item label="头像" prop="avatar">
        <Upload :pic="userForm.avatar" @newAvatar="avaChange" />
      </el-form-item>
      <!-- -------------------- -->
      <el-form-item>
        <el-button type="primary" @click="saveChange">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { upload } from "@/utils/upload";
import { useRouter } from "vue-router";
const router = useRouter();
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
    { required: true, message: "要有密码的喔", trigger: "blur" },
    {
      min: 3,
      max: 15,
      required: true,
      message: "密码要在3-15个字符之间",
      trigger: "blur",
    },
  ],
  role: [{ required: true, message: "要有角色的喔", trigger: "blur" }],
  gender: [{ required: true, trigger: "blur" }],
  introduction: [{ required: true, message: "要有简介的喔", trigger: "blur" }],
  avatar: [{ required: true }],
});
const userForm = reactive({
  username: "",
  password: "",
  role: "",
  avatar: "",
  gender: "",
  introduction: "",
  file: null,
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
const allRoles = [
  {
    value: 1,
    label: "管理员",
  },
  {
    value: 2,
    label: "编辑",
  },
];
const saveChange = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload("/backstage-api/user/add", userForm);
      ElMessage.success({
        message: "保存成功",
        type: "success",
      });
      router.push("/user-manage/user-list");
    } else {
      ElMessage.error({
        message: "表单验证失败",
        type: "error",
      });
    }
  });
};
const avaChange = (rawFile) => {
  userForm.avatar = URL.createObjectURL(rawFile);
  // console.log(userForm.avatar); blob:http://localhost:8080/c9fd7dd5-35cf-44b7-89cb-43655dc775d3
  userForm.file = rawFile;
  // console.log(userForm.file); File对象
};
</script>

<style lang="less" scoped>
.el-form {
  margin-top: 80px auto;
  .el-form-item {
    min-width: 400px;
    max-width: 600px;
  }
}

.el-page-header {
  margin-bottom: 30px;
}
</style>
