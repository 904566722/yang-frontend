<template>
  <div class="app-container">
    <div class="title">
      <span class="big-title">{{ water.name }}</span>
    </div>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card class="overview">
          <div><span class="second-title">任务概览</span></div>
          <div v-html="water.over_view" />
        </el-card>
        <el-card class="sort-klg">
          <div><span class="second-title">待回顾、整理的知识点</span></div>
          <el-tag v-for="value in sortKlgs" :key="value.id">{{ value.title }}</el-tag>
          <el-row :gutter="10">
            <el-col :span="12"><el-input v-model="createSortKlgInput.title" /></el-col>
            <el-col :span="12"><el-button size="mini" type="success" @click="doCreateSortKlg">添加</el-button></el-col>
          </el-row>
        </el-card>
        <el-card class="todo">
          <div><span class="second-title">勿忘TODO</span></div>
          <el-row :gutter="10">
            <el-col :span="12"><el-input v-model="createTodoInput.title" /></el-col>
            <el-col :span="12"><el-button size="mini" type="success" @click="doCreateSortKlg">添加</el-button></el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12" />
    </el-row>
  </div>
</template>

<script>
import { createSortKlg, createTodo,
  getWater, getSortKlgs } from '@/api/flow'

export default {
  name: 'WorkFlow',
  data() {
    return {
      waterId: 'water-cujero5k7o',
      water: {},
      createSortKlgInput: {
        title: '',
        water_id: ''
      },
      sortKlgs: [],
      createTodoInput: {
        title: '',
        water_id: ''
      }
    }
  },
  mounted() {
    this.doGetWater()
    this.doGetSortKlgs()
  },
  methods: {
    doGetWater() {
      getWater(this.waterId).then(res => {
        this.water = res.data
      })
    },
    doCreateSortKlg() {
      this.createSortKlgInput.water_id = this.waterId
      createSortKlg(this.createSortKlgInput).then(res => {
        this.$message.success('添加成功')
        this.doGetSortKlgs()
        this.createSortKlgInput.title = ''
      })
    },
    doCreateTodo() {
      createTodo(this.createTodoInput).then(res => {
        this.$message.success('添加成功')
      })
    },
    doGetSortKlgs() {
      const listQuery = {
        water_id: this.waterId
      }
      getSortKlgs(listQuery).then(res => {
        this.sortKlgs = res.data
      })
    }
  }
}
</script>

<style scoped>
.title{
  margin-bottom: 10px;
}
.overview{
  margin-bottom: 5px;
}
.sort-klg {
  margin-bottom: 5px;
}
</style>
