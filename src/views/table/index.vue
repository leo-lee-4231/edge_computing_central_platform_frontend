<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="节点名称" style="width: 200px;" class="filter-item" />
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
        添加边缘节点
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
      <el-table-column align="center" label="ID" width="60">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="名称" width="100">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="IP地址" width="130" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="端口" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.port }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="90" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button :type="scope.row.status | powerFilter" icon="el-icon-switch-button">{{ scope.row.status | powerNameFilter }}</el-button>
            <el-button :type="scope.row.status | restartFilter" icon="el-icon-refresh">重启</el-button>
            <el-button type="success" icon="el-icon-connection">关系管理</el-button>
            <el-button :type="scope.row.status | consoleFilter" icon="el-icon-monitor">远程终端</el-button>
            <el-button type="primary" icon="el-icon-set-up">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTiTle" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="节点名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="IP地址" prop="IP">
          <el-input v-model="temp.ip" />
        </el-form-item>
        <el-form-item label="端口" prop="port">
          <el-input v-model="temp.port" />
        </el-form-item>
        <el-form-item label="电源插件">
          <el-select v-model="temp.power" class="filter-item" placeholder="Please select">
            <el-option v-for="item in powerOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="远程控制插件">
          <el-select v-model="temp.console" class="filter-item" placeholder="Please select">
            <el-option v-for="item in consoleOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-button type="success" icon="el-icon-sort">
          测试节点
        </el-button>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="info">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        online: 'success',
        offline: 'gray',
        error: 'danger'
      }
      return statusMap[status]
    },
    powerFilter(status) {
      const statusMap = {
        online: 'danger',
        offline: 'success',
        error: 'gray'
      }
      return statusMap[status]
    },
    powerNameFilter(status) {
      const statusMap = {
        online: '关机',
        offline: '开机',
        error: 'gray'
      }
      return statusMap[status]
    },
    restartFilter(status) {
      const statusMap = {
        online: 'warning',
        offline: 'gray',
        error: 'gray'
      }
      return statusMap[status]
    },
    consoleFilter(status) {
      const statusMap = {
        online: 'info',
        offline: 'gray',
        error: 'gray'
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
      dialogTiTle: '添加边缘节点',
      temp: {
        id: undefined,
        name: '',
        ip: '',
        port: '',
        power: '',
        console: ''
      },
      powerOptions: [
        'IPMI',
        'SSH'
      ],
      consoleOptions: [
        'IPMI',
        'SSH'
      ]
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
        ip: '',
        port: '',
        power: '',
        console: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>
