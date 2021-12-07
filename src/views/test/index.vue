<template>
  <div class="app-container">
    <el-upload
      class="avatar-uploader"
      action="http://127.0.0.1:8888/v1/upload/image"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>

<script>

export default {
  name: 'Test',
  data() {
    return {
      imageUrl: '',
      file: {}
    }
  },
  created() {
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      this.file = file
      console.log(file)
    }
  }
}
</script>

<style scoped>
</style>
