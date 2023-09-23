<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="uploadAva"
    >
      <img v-if="props.pic" :src="blobPicUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon">
        <i-ep-plus />
      </el-icon>
    </el-upload>
  </div>
</template>

<script setup>
let props = defineProps({ pic: String });
let emits = defineEmits(["newAvatar"]);

let blobPicUrl = computed(() => {
  return props.pic.includes("blob")
    ? props.pic
    : "http://localhost:3000" + props.pic;
});
let uploadAva = (file) => {
  /* 
  console.log(file);
  {name: 'bosi.webp', percentage: 0, status: 'ready', size: 7128, raw: File, …}
  raw:file是图片的二进制形式
  */
  emits("newAvatar", file.raw);
};
</script>

<style lang="less" scoped>
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

::v-deep .avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

::v-deep .el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
}
</style>
