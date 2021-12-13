<template>
  <div class="app-container">
    <!--    <div class="title">-->
    <!--      <span class="big-title">{{ water.name }}</span>-->
    <!--    </div>-->
    <aside>
      <span style="font-weight: bold">{{ water.name }}</span>
      <el-button type="info" size="small" plain style="float: right" @click="doUpdateWaterProgress">更新进度</el-button>
      <span style="float: right; margin-right: 3px"><el-input v-model="water.progress" size="mini" style="width: 55px" />/100</span>
    </aside>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card class="overview">
          <div slot="header" class="clearfix">
            <span>任务概览</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="handleUpdateWater">修改</el-button>
          </div>
          <div class="text item" v-html="water.over_view" />
          <el-empty v-if="water.over_view === ''" :image-size="100" description="没有任务概览信息" class="empty" />
        </el-card>
        <el-card class="sort-klg">
          <div slot="header" class="clearfix">
            <span>待回顾、整理的知识点</span>
          </div>
          <el-tag v-for="value in sortKlgs" :key="value.id" style="margin-right: 3px;margin-bottom: 5px">{{ value.title }}</el-tag>
          <el-empty v-if="sortKlgs.length === 0" :image-size="100" description="没有待回顾、整理的知识点" class="empty" />
          <el-row :gutter="10" style="margin-top: 10px">
            <el-col :span="12"><el-input v-model="createSortKlgInput.title" /></el-col>
            <el-col :span="12"><el-button size="small" type="success" @click="doCreateSortKlg">添加</el-button></el-col>
          </el-row>
        </el-card>
        <el-card class="todo">
          <div slot="header" class="clearfix">
            <span>勿忘TODO</span>
          </div>
          <!--          <el-tag v-for="value in todos" :key="value.id" style="margin-right: 3px; margin-bottom: 5px">{{ value.title }}</el-tag>-->
          <el-checkbox v-for="value in todos" :key="value.id" v-model="value.done" size="mini" style="margin-right: 3px; margin-bottom: 5px" border @change="handleDoneTodo(value)">{{ value.title }}</el-checkbox>
          <el-empty v-if="todos.length === 0" :image-size="100" description="没有todo" class="empty" />
          <el-row :gutter="10" style="margin-top: 10px">
            <el-col :span="12"><el-input v-model="createTodoInput.title" /></el-col>
            <el-col :span="12"><el-button size="small" type="success" @click="doCreateTodo">添加</el-button></el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="collection">
          <div slot="header" class="clearfix">
            <span>相关信息</span>
          </div>
          <el-input v-model="createWaterCltInput.content" type="textarea" :rows="2" placeholder="请输入内容" style="margin-bottom: 10px" />
          <!--          <el-tag v-for="label in dynamicLabels" :key="label" closable :disable-transitions="false" @close="handleCloseLabel(label)">{{ label }}</el-tag>-->
          <el-tag v-for="label in createWaterCltLabels" :key="label.id" closable :disable-transitions="false" @close="handleCloseLabel(label)">{{ label.name }}</el-tag>
          <el-input v-if="inputLabelVisible" ref="saveLabelInput" v-model="inputLabel" class="input-new-label" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" />
          <el-button v-else class="button-new-label" size="small" @click="showInputLabel">+ New Tag</el-button>
          <el-button size="small" type="success" @click="doCreateWaterClt">添加</el-button>
          <el-divider content-position="left">信息列表</el-divider>
          <el-empty v-if="waterClts.length === 0" :image-size="100" description="没有信息" class="empty" />
          <el-card v-for="clt in waterClts" :key="clt" shadow="hover" style="margin-bottom: 10px; white-space: pre-line">
            {{ clt.content }}
            <el-divider class="my-divider" />
            <el-tag v-for="label in clt.water_clt_labels" :key="label.id" size="mini">{{ label.name }}</el-tag>
            <el-button type="danger" size="mini" icon="el-icon-delete" style="float: right" @click="doDeleteWaterClt(clt.id)" />
            <el-button type="warning" size="mini" icon="el-icon-edit" style="float: right; margin-right: 3px" @click="handleUpdateWaterClt(clt)" />
          </el-card>
          <div class="block">
            <el-pagination
              :current-page.sync="waterCltsCurPage"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="waterCltsPageSize"
              layout="prev, pager, next, sizes, total"
              :total="waterCltsTotal"
              @size-change="handleWaterCltsSizeChange"
              @current-change="handleWaterCltsCurPageChange"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      title="更改任务概览"
      :visible.sync="updateWaterVisible"
      width="50%"
      center
    >
      <tinymce v-model="updateWaterInput.over_view" :height="300" />
      <div style="text-align: right">
        <el-button size="mini" type="info" @click="updateWaterVisible = false">取消</el-button>
        <el-button size="mini" type="warning" style="margin-top: 10px" @click="doUpdateWater">修改</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="修改相关信息"
      :visible.sync="updateWaterCltVisible"
      width="50%"
      center
    >
      <el-input v-model="updateWaterCltInput.content" type="textarea" autosize />
      <div style="text-align: right">
        <el-button size="mini" type="info" @click="updateWaterCltVisible = false">取消</el-button>
        <el-button size="mini" type="warning" style="margin-top: 10px" @click="doUpdateWaterClt">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { createSortKlg, createTodo, createWaterClt,
  deleteWaterClt,
  updateWater, updateTodo, updateWaterClt,
  getWater, getSortKlgs, getWaterClts, getTodos } from '@/api/flow'

export default {
  name: 'WorkFlow',
  components: { Tinymce },
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
      },
      todos: [],
      createWaterCltInput: {
        content: ''
      },
      dynamicLabels: [],
      createWaterCltLabels: [],
      inputLabel: '',
      inputLabelVisible: false,
      waterClts: [],
      waterCltsTotal: 0,
      waterCltsCurPage: 1,
      waterCltsPageSize: 5,
      updateWaterVisible: false,
      updateWaterInput: {
        over_view: ''
      },
      updateWaterCltVisible: false,
      updateWaterCltInput: {
        content: ''
      }
    }
  },
  mounted() {
    console.log(this.$route.params.id)
    this.waterId = this.$route.params.id
    this.doGetWater()
    this.doGetSortKlgs()
    this.doGetWaterClts()
    this.doGetTodos()
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
      this.createTodoInput.water_id = this.waterId
      createTodo(this.createTodoInput).then(res => {
        this.$message.success('添加成功')
        this.doGetTodos()
        this.createTodoInput.title = ''
      })
    },
    doGetSortKlgs() {
      const listQuery = {
        water_id: this.waterId
      }
      getSortKlgs(listQuery).then(res => {
        this.sortKlgs = res.data
      })
    },
    doGetTodos() {
      const listQuery = {
        water_id: this.waterId
      }
      getTodos(listQuery).then(res => {
        this.todos = res.data
      })
    },
    handleCloseLabel(label) {
      // this.dynamicLabels.splice(this.dynamicLabels.indexOf(label), 1)
      this.createWaterCltLabels.splice(this.createWaterCltLabels.indexOf(label), 1)
    },
    showInputLabel() {
      this.inputLabelVisible = true
      this.$nextTick(_ => {
        this.$refs.saveLabelInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const inputValue = this.inputLabel
      if (inputValue) {
        // this.dynamicLabels.push(inputValue)
        this.createWaterCltLabels.push({ name: inputValue })
      }
      this.inputLabelVisible = false
      this.inputLabel = ''
    },
    doCreateWaterClt() {
      const waterCltInput = {
        content: this.createWaterCltInput.content,
        water_id: this.waterId,
        water_clt_labels: this.createWaterCltLabels
      }
      createWaterClt(waterCltInput).then(res => {
        this.$message.success('添加成功')
        this.createWaterCltInput.content = ''
        this.createWaterCltLabels = []
        this.doGetWaterClts()
      })
    },
    doGetWaterClts() {
      const listQuery = {
        page_index: this.waterCltsCurPage,
        page_size: this.waterCltsPageSize,
        water_id: this.waterId,
        associations: [
          {
            name: 'WaterCltLabels'
          }
        ]
      }
      getWaterClts(listQuery).then(res => {
        this.waterClts = res.data
        this.waterCltsTotal = res.total
      })
    },
    handleUpdateWater() {
      this.updateWaterVisible = true
      const overView = this.water.over_view
      this.updateWaterInput.over_view = overView
    },
    doUpdateWater() {
      const updateWaterInput = {
        id: this.waterId,
        over_view: this.updateWaterInput.over_view
      }
      updateWater(updateWaterInput).then(res => {
        this.$message.success('修改成功')
        this.updateWaterVisible = false
        this.doGetWater()
      })
    },
    doUpdateWaterProgress() {
      const updateWaterInput = {
        id: this.waterId,
        progress: parseInt(this.water.progress)
      }
      updateWater(updateWaterInput).then(res => {
        this.$message.success('更新成功')
      })
    },
    handleDoneTodo(todo) {
      const todoInput = {
        id: todo.id,
        done: todo.done
      }
      updateTodo(todoInput).then(res => {
        this.$message.success('更新成功')
      })
    },
    handleWaterCltsCurPageChange(page) {
      this.waterCltsCurPage = page
      this.doGetWaterClts()
    },
    handleWaterCltsSizeChange(size) {
      this.waterCltsPageSize = size
      this.doGetWaterClts()
    },
    handleUpdateWaterClt(waterClt) {
      this.updateWaterCltVisible = true
      this.updateWaterCltInput = waterClt
    },
    doUpdateWaterClt() {
      const updateWaterCltInput = {
        id: this.updateWaterCltInput.id,
        content: this.updateWaterCltInput.content
      }
      updateWaterClt(updateWaterCltInput).then(res => {
        this.$message.success('修改成功')
        this.updateWaterCltVisible = false
        this.doGetWaterClts()
      })
    },
    doDeleteWaterClt(id) {
      deleteWaterClt(id).then(res => {
        this.$message.success('删除成功')
        this.doGetWaterClts()
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
.button-new-label {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-label {
  width: 90px;
  vertical-align: bottom;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.my-divider{
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>
