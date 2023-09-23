<template>
  <div>
    <el-page-header :icon="null" title="猫粮推荐">
      <template #content>
        <span class="text-large font-600 mr-3">添加猫粮</span>
      </template>
    </el-page-header>
    <!-- -------------------------------------------------- -->
    <el-form
      ref="foodFormRef"
      :model="foodForm"
      :rules="foodRules"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <!-- -------------------- -->
      <el-form-item label="标题" prop="title">
        <el-input v-model="foodForm.title" />
      </el-form-item>
      <!-- -------------------- -->
      <el-form-item label="概要" prop="introduction">
        <el-input v-model="foodForm.introduction" :rows="1" type="textarea" />
      </el-form-item>
      <!-- -------------------- -->
      <el-form-item label="详细介绍" prop="detail">
        <el-input v-model="foodForm.detail" :rows="4" type="textarea" />
      </el-form-item>
      <!-- -------------------- -->
      <el-form-item label="封面" prop="cover">
        <Upload :pic="foodForm.cover" @newAvatar="picChange" />
      </el-form-item>
      <!-- -------------------- -->
      <el-form-item>
        <el-button type="primary" @click="confirmAdd">确认添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { upload } from "@/utils/upload";
import { useRouter } from "vue-router";
const router = useRouter();
const foodFormRef = ref(null);
const foodRules = reactive({
  title: [
    { required: true, message: "不能没有标题的喔", trigger: "blur" },
    {
      min: 3,
      required: true,
      message: "标题至少3个字符",
      trigger: "blur",
    },
  ],
  introduction: [{ required: true, message: "要有概要的喔", trigger: "blur" }],
  detail: [{ required: true, message: "要有详细介绍的喔", trigger: "blur" }],
  cover: [{ required: true }],
});
const foodForm = reactive({
  title: "",
  introduction: "",
  detail: '',
  cover: "",
  file: null,
});

const picChange = (rawFile) => {
  foodForm.cover = URL.createObjectURL(rawFile);
  foodForm.file = rawFile;
};
const confirmAdd = () => {
  foodFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload("/backstage-api/food/add", foodForm);
    // console.log(foodForm)
      // 提交表单
      ElMessage.success({
        message: "添加成功",
        type: "success",
      });
      router.push("/food-manage/food-list");
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
.el-page-header {
  margin-bottom: 30px;
}
</style>
