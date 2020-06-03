<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="基础镜像">
        <el-button type="success">生成初始镜像</el-button>
        <el-button type="success" icon="el-icon-check" circle />
        <span>edgecomputing-test-java-android-grpc</span>
      </el-form-item>
      <el-form-item label="文件上传">
        <el-button type="primary" icon="el-icon-upload">zip压缩文件上传</el-button>
      </el-form-item>
      <el-form-item label="镜像修改">
        <el-row style="margin-bottom: 20px;">
          <el-button type="primary" icon="el-icon-upload">Dockerfile文件上传</el-button>
        </el-row>
        <el-row>
          <textarea placeholder="请输入Dockerfile内容" style="height: 200px; width: 100%" />
        </el-row>
      </el-form-item>
      <el-form-item label="镜像操作">
        <el-button type="primary">应用镜像</el-button>
        <el-button type="warning">测试镜像</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认镜像并上传</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

