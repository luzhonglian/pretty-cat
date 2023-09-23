<template>
  <div>
    <el-card>
      <el-page-header :icon="null" title="用户管理">
        <template #content>
          <span class="text-large font-600 mr-3"> 用户列表 </span>
        </template>
      </el-page-header>
      <!-- -------------------------------------------------- -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="用户名" />
        <!-- -------------------- -->
        <el-table-column prop="avatar" label="头像">
          <template #default="scope">
            <el-avatar
              :size="60"
              :src="
                scope.row.avatar
                  ? 'http://localhost:3000' + scope.row.avatar
                  : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
              "
            />
          </template>
        </el-table-column>
        <!-- -------------------- -->
        <el-table-column prop="role" label="角色">
          <template #default="scope">
            <el-tag v-if="scope.row.role === 1">管理员</el-tag>
            <el-tag v-else type="success">编辑</el-tag>
          </template>
        </el-table-column>
        <!-- -------------------- -->
        <el-table-column prop="" label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
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
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- -------------------------------------------------- -->
    <el-dialog v-model="dialogVisible" title="用户编辑" width="50%">
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
        <el-form-item label="简介" prop="introduction">
          <el-input
            v-model="userForm.introduction"
            :rows="4"
            type="textarea"
            placeholder="请输入简介"
          />
        </el-form-item>
        <!-- -------------------- -->
      </el-form>
      <!-- -------------------- -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="editConfirm"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import axios from "axios";
import { InfoFilled } from "@element-plus/icons-vue";
import { useStore } from "vuex";

//-------------------------------------------------------------------处理用户编辑开始
const dialogVisible = ref(false);
const handleEdit = (data) => {
  dialogVisible.value = true;
  Object.assign(userForm, data);
};
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
  role: [{ required: true, message: "要有角色的喔", trigger: "blur" }],
  introduction: [{ required: true, message: "要有简介的喔", trigger: "blur" }],
});
const userForm = reactive({
  username: "",
  password: "",
  role: "",
  introduction: "",
});
const editConfirm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      //    axios请求去后台修改用户信息
      await axios.patch(`backstage-api/user/${userForm._id}`, userForm);
      //  成功后关闭并显示修改成功
      dialogVisible.value = false;
      ElMessage.success({
        message: "编辑成功",
        type: "success",
      });
      //重新调用getTabelData()方法
      getTableData();
    } else {
      ElMessage.error({
        message: "表单验证失败",
        type: "error",
      });
    }
  });
};
//-----------------------------------------------------------处理用户编辑结束
const store = useStore();

onMounted(() => {
  getTableData();
});
const tableData = ref([]);
const getTableData = async () => {
  let result = await axios.get("backstage-api/user/list");
  //更改store使个人中心修改同步
  store.commit(
    "setUserInfo",
    result.data.data.find(
      (item) => item.username === store.state.userInfo.username
    )
  );
  tableData.value = result.data.data.sort((a, b) => {
    return a.role - b.role;
  });
};

const handleDelete = async (data) => {
  await axios.delete(`backstage-api/user/list/${data._id}`);
  getTableData();
};
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
</style>
