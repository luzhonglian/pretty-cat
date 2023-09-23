<template>
  <div>
    <el-card>
      <el-page-header :icon="null" title="猫粮推荐">
        <template #content>
          <span class="text-large font-600 mr-3"> 猫粮列表 </span>
        </template>
      </el-page-header>
      <!-- -------------------------------------------------- -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="标题" />
        <!-- -------------------- -->
        <el-table-column prop="introduction" label="概要" />
        <!-- -------------------- -->
        <el-table-column prop="editTime" label="更新时间">
          <template #default="scope">
            {{ getEditTime(scope.row.editTime) }}
          </template>
        </el-table-column>
        <!-- -------------------- -->
        <!-- -------------------- -->
        <el-table-column prop="" label="操作">
          <template #default="scope">
            <el-button
              type="success"
              :icon="Edit"
              circle
              @click="handleEdit(scope.row)"
            />
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
  </div>
</template>

<script setup>
import axios from "axios";
import { dayjs } from "element-plus";

import { Delete, Edit, InfoFilled } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const tableData = ref([]);
onMounted(() => {
  getTableData();
});
const getTableData = async () => {
  let result = await axios.get("backstage-api/food/list");
  tableData.value = result.data.data.sort(
    (a, b) => new Date(b.editTime) - new Date(a.editTime)
  );
};

const getEditTime = (editTime) => {
  return dayjs(editTime).format("YY/MM/DD   HH:mm");
};

const handleDelete = async (data) => {
  await axios.delete(`backstage-api/food/${data._id}`);
  getTableData();
};
const router = useRouter();
const handleEdit = (row) => {
  router.push(`/food-manage/food-edit/${row._id}`);
};
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
