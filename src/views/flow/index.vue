<template>
  <div class="app-container">
    <div class="ops">
      <el-button size="mini" @click="handleAddWater">添加</el-button>
    </div>
    <div class="waters-table">
      <el-table
        :data="waters"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="标题"
        />
        <el-table-column
          label="进度"
        >
          <template slot-scope="scope">
            <el-progress :percentage="scope.row.progress" :format="progressFormat" :status="progressStatus(scope.row.progress)" />
          </template>
        </el-table-column>
        <el-table-column
          label="流"
        >
          <template slot-scope="scope">
            {{ scope.row.flow.name }}
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleToWaterPage(scope.row)">查看</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="add water"
      :visible.sync="addWaterVisible"
      width="50%"
      center
    >
      <el-form :model="createWaterInput" :inline="true" size="mini">
        <el-form-item label="标题">
          <el-input v-model="createWaterInput.name" />
        </el-form-item>
        <el-form-item label="流类别">
          <el-select v-model="createWaterInput.flow_id">
            <el-option v-for="value in flows" :key="value.id" :label="value.name" :value="value.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addWaterVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="doCreateWater">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createWater,
  getFlows, getWaters } from '@/api/flow'

export default {
  name: 'Index',
  data() {
    return {
      addWaterVisible: false,
      createWaterInput: {
        name: '',
        flow_id: ''
      },
      flows: [],
      waters: []
    }
  },
  mounted() {
    this.doGetWaters()
  },
  methods: {
    handleAddWater() {
      this.addWaterVisible = true
      this.doGetFlows()
    },
    doGetFlows() {
      getFlows({}).then(res => {
        this.flows = res.data
      })
    },
    doGetWaters() {
      const listQuery = {
        associations: [
          {
            name: 'Flow'
          }
        ],
        order_by: {
          column: 'created_at',
          desc: true
        }
      }
      getWaters(listQuery).then(res => {
        this.waters = res.data
      })
    },
    doCreateWater() {
      const water = this.createWaterInput
      createWater(water).then(res => {
        this.$message.success('创建成功')
        this.doGetWaters()
      })
      this.addWaterVisible = false
    },
    handleToWaterPage(water) {
      this.$router.push({ path: `/work-flow/${water.id}` })
    },
    progressFormat(percentage) {
      return percentage === 100 ? '完成' : `${percentage}%`
    },
    progressStatus(percentage) {
      if (percentage < 30) {
        return 'exception'
      } else if (percentage < 60) {
        return 'warning'
      } else if (percentage < 100) {
        return 'primary'
      } else if (percentage === 100) {
        return 'success'
      }
    }
  }
}
</script>

<style scoped>
.ops {
  margin-bottom: 5px;
}
</style>
