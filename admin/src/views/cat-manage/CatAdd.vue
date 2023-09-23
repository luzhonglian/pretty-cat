<template>
  <div>
    <el-page-header :icon="null" title="猫猫管理">
      <template #content>
        <span class="text-large font-600 mr-3"> 新增美猫 </span>
      </template>
    </el-page-header>
    <!-- -------------------------------------------------- -->
    <el-form
      ref="catFormRef"
      :model="catForm"
      :rules="catRules"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <!-- -------------------- -->
      <el-form-item label="标题" prop="title">
        <el-input v-model="catForm.title" />
      </el-form-item>
      <!-- -------------------- -->
      <el-form-item label="内容" prop="content">
        <Editor @contentInput="handleContentInput" />
      </el-form-item>
      <!-- -------------------- -->
      <el-form-item label="类别" prop="category">
        <el-select v-model="catForm.category">
          <el-option
            v-for="item in allCategories"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!-- -------------------- -->
      <el-form-item label="封面" prop="cover">
        <Upload :pic="catForm.cover" @newAvatar="picChange" />
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
const router=useRouter()
const catFormRef = ref(null);
const catRules = reactive({
  title: [
    { required: true, message: "不能没有用户名的喔", trigger: "blur" },
    {
      min: 2,
      required: true,
      message: "标题至少2个字符",
      trigger: "blur",
    },
  ],
  content: [{ required: true, message: "要有内容的喔", trigger: "blur" }],
  category: [{ required: true, message: "要有类别的喔", trigger: "blur" }],
  cover: [{ required: true }],
});
const catForm = reactive({
  title: "",
  content: "",
  category: 1,
  cover: "",
  file: null,
  isPublished: 0,
});
const allCategories = [
  {
    value: 1,
    label: "美猫欣赏",
  },
  {
    value: 2,
    label: "美猫领养",
  },
];
const handleContentInput = (content) => {
  catForm.content = content;
};
const picChange = (rawFile) => {
  catForm.cover = URL.createObjectURL(rawFile);
  catForm.file = rawFile;
};
const confirmAdd = () => {
  catFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload("/backstage-api/cat/add", catForm);
      // 提交表单
      ElMessage.success({
        message: "添加成功",
        type: "success",
      });
      router.push("/cat-manage/cat-list");
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
