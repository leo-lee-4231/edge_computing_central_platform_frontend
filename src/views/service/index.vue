<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-edit">
        创建通讯消息
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="100">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="消息名称" width="200">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="参数" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.parameter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template>
          <el-button-group>
            <el-button type="primary" icon="el-icon-set-up">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <div class="filter-container" style="margin-top: 10px">
      <el-button class="filter-item" type="primary" icon="el-icon-edit">
        创建服务接口
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="interfaceList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="100">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="接口名称" width="200">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="输入消息" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.input }}</span>
        </template>
      </el-table-column>
      <el-table-column label="输出消息" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.output }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template>
          <el-button-group>
            <el-button type="primary" icon="el-icon-set-up">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <el-form ref="form" label-width="120px" style="margin-top: 10px">
      <el-form-item label="获取接口文件">
        <el-button type="primary" icon="el-icon-document">
          下载文件
        </el-button>
        <el-button type="success" icon="el-icon-check" circle />
        <span>edgecomputing-test-java-android-protobuf.zip</span>
      </el-form-item>
      <el-form-item label="上传服务端代码">
        <el-button type="primary" icon="el-icon-upload">zip压缩文件上传</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getMessage, getInterface } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      interfaceList: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getMessage().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
      getInterface().then(response => {
        this.interfaceList = response.data.items
      })
    }
  }
}
</script>

<style scoped>

</style>
