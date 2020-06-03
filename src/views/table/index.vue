<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="应用名称" style="width: 200px;" class="filter-item" />
      <el-select placeholder="状态" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select placeholder="排序方式" style="width: 140px" class="filter-item">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        创建应用
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
      <el-table-column align="center" label="ID" width="50">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="应用名称" width="120">
        <template slot-scope="scope">
          <router-link :to="'/application/design/'" class="link-type">
            <span>{{ scope.row.name }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="语言-平台" width="140" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.language }}</span>
        </template>
      </el-table-column>
      <el-table-column label="CPU" width="60" align="center">
        <template slot-scope="scope">
          {{ scope.row.cpu }}
        </template>
      </el-table-column>
      <el-table-column label="内存" width="70" align="center">
        <template slot-scope="scope">
          {{ scope.row.memory }}
        </template>
      </el-table-column>
      <el-table-column label="磁盘" width="70" align="center">
        <template slot-scope="scope">
          {{ scope.row.disk }}
        </template>
      </el-table-column>
      <el-table-column label="带宽" width="70" align="center">
        <template slot-scope="scope">
          {{ scope.row.bandwidth }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button :type="scope.row.status | powerFilter" icon="el-icon-switch-button">{{ scope.row.status | powerNameFilter }}</el-button>
            <el-button type="warning" icon="el-icon-monitor">
              <router-link :to="'/application/image/'">
                <span>镜像制作</span>
              </router-link></el-button>
            <el-button type="primary" icon="el-icon-set-up">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTiTle" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item label="应用名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="语言-平台" prop="language">
          <el-select v-model="temp.language" class="filter-item" placeholder="Please select">
            <el-option v-for="item in languageTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="CPU权重值" prop="cpu">
          <el-input v-model="temp.cpu" />
        </el-form-item>
        <el-form-item label="内存大小" prop="memory">
          <el-select v-model="temp.memory" class="filter-item" placeholder="Please select">
            <el-option v-for="item in memoryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="磁盘大小" prop="disk">
          <el-select v-model="temp.disk" class="filter-item" placeholder="Please select">
            <el-option v-for="item in diskTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="带宽权重值" prop="bandwidth">
          <el-input v-model="temp.bandwidth" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'

const languageTypeOptions = [
  { key: 'Java - Android', display_name: 'Java - Android' },
  { key: 'Kotlin - Android', display_name: 'Kotlin - Android' },
  { key: 'Python - Linux', display_name: 'Python - Linux' },
  { key: 'go - Linux', display_name: 'go - Linux' },
  { key: 'Objective-C - IOS', display_name: 'Objective-C - IOS' },
  { key: 'Swift - IOS', display_name: 'Swift - IOS' }
]

const memoryTypeOptions = [
  { key: '1', display_name: '1GB' }
]

const diskTypeOptions = [
  { key: '8', display_name: '8GB' }
]

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        available: 'success',
        unavailable: 'danger',
        ready: 'warning'
      }
      return statusMap[status]
    },
    powerFilter(status) {
      const statusMap = {
        available: 'danger',
        unavailable: 'gray',
        ready: 'success'
      }
      return statusMap[status]
    },
    powerNameFilter(status) {
      const statusMap = {
        available: '停用',
        unavailable: '启用',
        ready: '启用'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      statusOptions: ['online', 'offline', 'error'],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      dialogFormVisible: false,
      dialogTiTle: '创建应用',
      temp: {
        id: undefined,
        name: '',
        language: '',
        cpu: '',
        memory: '',
        disk: '',
        bandwidth: ''
      },
      languageTypeOptions,
      memoryTypeOptions,
      diskTypeOptions
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        language: '',
        cpu: '',
        memory: '',
        disk: '',
        bandwidth: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    voidFunc() {
    }
  }
}
</script>
