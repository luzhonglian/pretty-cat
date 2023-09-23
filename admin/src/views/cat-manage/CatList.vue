<template>
  <div>
    <el-card>
      <el-page-header :icon="null" title="猫猫管理">
        <template #content>
          <span class="text-large font-600 mr-3"> 美猫列表 </span>
        </template>
      </el-page-header>
      <!-- -------------------------------------------------- -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="标题" />
        <!-- -------------------- -->
        <el-table-column prop="category" label="类别">
          <template #default="scope">
            {{ getCategory(scope.row.category) }}
          </template>
        </el-table-column>
        <!-- -------------------- -->
        <el-table-column prop="editTime" label="更新时间">
          <template #default="scope">
            {{ getEditTime(scope.row.editTime) }}
          </template>
        </el-table-column>
        <!-- -------------------- -->
        <el-table-column prop="isPublished" label="是否发布">
          <template #default="scope">
            <el-switch
              v-model="scope.row.isPublished"
              :active-value="1"
              :inactive-value="0"
              @change="handlePublish(scope.row)"
            />
          </template>
        </el-table-column>
        <!-- -------------------- -->
        <el-table-column prop="" label="操作">
          <template #default="scope">
            <el-button
              type="success"
              :icon="View"
              circle
              @click="handlePreview(scope.row)"
            />
            <el-button type="primary" :icon="Edit" circle @click="handleEdit(scope.row)"/>
            <el-popconfirm
              width="220"
              confirm-button-text="确定"
              cancel-button-text="取消"
              :icon="InfoFilled"
              icon-color="#626AEF"
              title="你确定要删除吗?"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
            <el-button type="danger" :icon="Delete" circle />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
        <!-- -------------------- -->
      </el-table>
    </el-card>
    <!-- -----------dialog--------------------------------------- -->
    <el-dialog v-model="dialogVisible" title="美猫预览" width="50%">
      <h2>{{ previewData.title }}</h2>
      <div style="font-size: 14px">
        {{ getEditTime(previewData.editTime) }}
        {{ getCategory(previewData.category) }}
      </div>
      <el-divider>
        <el-icon><i-ep-fries /></el-icon>
      </el-divider>
      <div v-html="previewData.content" class="previewHTML"></div>
    </el-dialog>
  </div>
</template>

<script setup>
import axios from "axios";
import { dayjs } from "element-plus";

import { View, Delete, Edit,InfoFilled } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const tableData = ref([]);
const previewData = ref([]);
const dialogVisible = ref(false);
onMounted(() => {
  getTableData();
});
const getTableData = async () => {
  let result = await axios.get("backstage-api/cat/list/");
  tableData.value = result.data.data.sort(
    (a, b) => new Date(b.editTime) - new Date(a.editTime)
  );
};
const getCategory = (category) => {
  return category == 1 ? "美猫欣赏" : "美猫领养";
};
const getEditTime = (editTime) => {
  return dayjs(editTime).format("YY/MM/DD   HH:mm");
};
const handlePublish = async (row) => {
  const { _id, isPublished } = row;
  await axios.patch(`backstage-api/cat/${_id}`, row);
  getTableData();
};
const handlePreview = (row) => {
  dialogVisible.value = true;
  previewData.value = row;
};
const handleDelete = async (data) => {
  await axios.delete(`backstage-api/cat/${data._id}`);
  getTableData();
};
const router=useRouter()
const handleEdit = (row) => {
  router.push(`/cat-manage/cat-edit/${row._id}`)
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
::v-deep .previewHTML {
  img {
    max-width: 100%;
  }
}
</style>
