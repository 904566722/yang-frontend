<template>
  <div class="app-container">
    <!--  标题栏  -->
    <el-row :gutter="10">
      <el-col :span="6">
        <div class="title">
          <span class="big-title">{{ yearMon.year }}年{{ yearMon.mon }}月份</span><span class="description-content">账单详情</span>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="title" />
      </el-col>
    </el-row>
    <!--  操作区域，录入收支信息  -->
    <el-row :gutter="10">
      <div class="operations">
        <el-col :span="12">
          <div class="operations month">
            <el-row>
              <el-table
                :data="monIncomeCtgs"
              >
                <el-table-column
                  label="名称"
                >
                  <template slot-scope="scope">
                    {{ scope.row.name }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="数目"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.incomes.length > 0"> {{ scope.row.incomes[0].amount }}</span>
                    <el-input v-if="scope.row.incomes.length === 0" v-model="createIncomeInput.amount" type="number" aria-placeholder="输入金额" style="width: 100px" />
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                >
                  <template slot-scope="scope">
                    <el-button v-if="scope.row.incomes.length === 0" type="primary" size="mini" @click="handleCreateIncome(scope)">录入</el-button>
                    <el-button v-if="scope.row.incomes.length > 0" type="info" size="mini" @click="handleUpdateIncome(scope)">修改</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row>
              <el-table
                :data="monOutcomeCtgs"
              >
                <el-table-column
                  label="名称"
                >
                  <template slot-scope="scope">
                    {{ scope.row.name }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="数目"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.outcomes.length > 0"> {{ scope.row.outcomes[0].amount }}</span>
                    <el-input v-if="scope.row.outcomes.length === 0" v-model="createOutcomeInput.amount" type="number" aria-placeholder="输入金额" style="width: 100px" />
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                >
                  <template slot-scope="scope">
                    <el-button v-if="scope.row.outcomes.length === 0" type="primary" size="mini" @click="handleCreateOutcome(scope)">录入</el-button>
                    <el-button v-if="scope.row.outcomes.length > 0" type="info" size="mini" @click="handleUpdateOutcome(scope)">修改</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="operations day">
            <el-table
              row-key="id"
              :data="dayOutcomeCtgs"
              :tree-props="{children: 'outcomes', hasChildren: 'hasChildren'}"
            >
              <el-table-column
                label="名称"
              >
                <template slot-scope="scope">
                  {{ scope.row.name }}
                </template>
              </el-table-column>
              <el-table-column
                label="数目"
              >
                <template slot-scope="scope">
                  {{ scope.row.amount }}
                </template>
              </el-table-column>
              <el-table-column
                label="说明"
              >
                <template slot-scope="scope">
                  {{ scope.row.remark }}
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
              >
                <el-button size="mini">录入</el-button>
              </el-table-column>
            </el-table>

            <el-table
              row-key="id"
              :data="otherOutcomeCtgs[0].outcomes"
            >
              <el-table-column
                label="弹性支出"
              >
                <template slot-scope="scope">
                  {{ scope.row.remark }}
                </template>
              </el-table-column>
              <el-table-column
                label="数目"
              >
                <template slot-scope="scope">
                  {{ scope.row.amount }}
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
              >
                <template slot-scope="scope">
                  <el-button size="mini">修改</el-button>
                  <el-button size="mini" type="danger" @click="doDeleteOutcome(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </div>
    </el-row>
    <el-row>
      <div id="chart-day" class="chart" :style="{height:height,width:width}" />
      <div class="chart-summary">
        <el-col :span="12">
          <el-alert
            title="吃饭"
            type="warning"
            :closable="false"
          >
            日均支出：<span class="chart-summary bold">{{ eatAvg }}</span>，对比告警值：<span class="chart-summary bold">{{ eatLimit }}</span>
            ，推荐之后日支出：<span class="chart-summary bold">23</span>，当前总计支出：<span class="chart-summary bold">1000</span>
          </el-alert>
        </el-col>
        <el-col :span="12">
          <el-alert
            title="弹性支出"
            type="info"
            :closable="false"
          >
            本月共 <span class="chart-summary bold">3</span> 笔弹性支出，总计支出：<span class="chart-summary bold">107</span>
          </el-alert>
        </el-col>
      </div>
    </el-row>
    <el-row>
      <div class="income-estimate">
        <el-descriptions :column="3" border>
          <el-descriptions-item label="活性收入预计">6000</el-descriptions-item>
          <el-descriptions-item label="住房公积金">2760</el-descriptions-item>
          <el-descriptions-item label="总存入">8760</el-descriptions-item>
        </el-descriptions>
      </div>
    </el-row>
    <el-row>
      <div id="chart-mon" class="chart" :style="{height:height,width:width}" />
    </el-row>
    <el-row>
      <div class="income-estimate">
        <el-descriptions :column="3" border>
          <el-descriptions-item label="活性收入总存">24000</el-descriptions-item>
          <el-descriptions-item label="住房公积金">13800</el-descriptions-item>
          <el-descriptions-item label="总存入">37800</el-descriptions-item>
        </el-descriptions>
      </div>
    </el-row>
    <el-button @click="doGetIncome">默认按钮</el-button>

    <el-dialog
      title="提示"
      :visible.sync="updateIncomeDialog"
      width="50%"
      center
    >
      <el-form :model="incomeCtgInfo" :inline="true" size="mini">
        <el-form-item label="收入类别">
          <el-input v-model="incomeCtgInfo.name" style="width: 100px" disabled />
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-if="incomeCtgInfo.incomes.length > 0" v-model="incomeCtgInfo.incomes[0].amount" style="width: 100px" disabled />
          ->
          <el-input v-model="updateIncomeInput.amount" style="width: 100px" />
        </el-form-item>
        <el-form-item label="收入说明">
          <el-input v-model="incomeCtgInfo.incomes[0].remark" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="updateIncomeDialog = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="doUpdateIncome">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="updateOutcomeDialog"
      width="50%"
      center
    >
      <el-form :model="outcomeCtgInfo" :inline="true" size="mini">
        <el-form-item label="支出类别">
          <el-input v-model="outcomeCtgInfo.name" style="width: 100px" disabled />
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-if="outcomeCtgInfo.outcomes.length > 0" v-model="outcomeCtgInfo.outcomes[0].amount" style="width: 100px" disabled />
          ->
          <el-input v-model="updateOutcomeInput.amount" style="width: 100px">s</el-input>
        </el-form-item>
        <el-form-item label="支出说明">
          <el-input v-model="outcomeCtgInfo.outcomes[0].remark" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="updateOutcomeDialog = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="doUpdateOutcome">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getIncome, getCtgs, getYearMon, getIncomeCtgs, getOutcomeCtgs,
  createIncome, createOutcome,
  updateIncome, updateOutcome,
  deleteOutcome
} from '@/api/book-keeping'
import { parseTime } from '@/utils'
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'
export default {
  name: 'Index',
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      aaa: false,
      yearMon: {
        year: 1998,
        mon: 12
      },
      opMonData: [
        {
          name: '工资',
          account: 9115
        },
        {
          name: '租金',
          account: 2000
        },
        {
          name: '水电',
          account: 200
        },
        {
          name: '住房公积金',
          account: 2670
        }
      ],
      incomeCtgs: [],
      createIncomeInput: {
        amount: undefined,
        income_category_id: ''
      },
      createOutcomeInput: {
        amount: undefined,
        outcome_category_id: ''
      },
      updateIncomeDialog: false,
      updateOutcomeDialog: false,
      incomeCtgInfo: {
        incomes: [
          {
            remark: undefined
          }
        ]
      },
      outcomeCtgInfo: {
        outcomes: [
          {
            remark: undefined
          }
        ]
      },
      updateIncomeInput: {
        id: undefined,
        amount: undefined,
        remark: undefined
      },
      updateOutcomeInput: {
        id: undefined,
        amount: undefined,
        remark: undefined
      },
      outcomeCtgs: [],
      monIncomeCtgs: [],
      monOutcomeCtgs: [],
      dayOutcomeCtgs: [],
      otherOutcomeCtgs: [{ outcomes: [] }],
      otherOutcomeDeleteVisible: false,
      opDayData: [
        {
          id: 1,
          name: '今日饭钱',
          account: 20
        },
        {
          id: 2,
          name: '弹性支出',
          account: 195,
          children: [
            {
              id: 21,
              name: '购买游戏',
              account: 45
            },
            {
              id: 22,
              name: '购买电池',
              account: 20
            },
            {
              id: 23,
              name: '出去吃饭',
              account: 130
            }
          ]
        }
      ],
      chartDay: null,
      chartMon: null,
      eatSummary: '吃饭总结',
      eatAvg: 42.5,
      eatLimit: 40,
      incomeInfo: {}
    }
  },
  mounted() {
    this.initPageInfo()
    this.initChart()
    this.initChartMon()
    this.doGetCtgs()// debug
  },
  methods: {
    initPageInfo() {
      const curTime = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
      getYearMon(curTime).then(resp => {
        const data = resp.data
        this.yearMon = {
          year: data.year,
          mon: data.mon
        }
        this.doGetMonIncomeCtgs()
        this.doGetMonOutcomeCtgs()
        this.doGetOtherOutcomeCtgs()
      })
      this.doGetDayOutcomeCtgs()
    },
    initChart() {
      this.chartDay = echarts.init(document.getElementById('chart-day'))
      this.chartDay.setOption({
        title: {
          text: '日支出统计图',
          textStyle: {
            color: '#333',
            fontWeight: 'normal',
            fontsize: 18
          },
          left: '20'
        },
        xAxis: {
          name: '日期',
          type: 'category',
          data: ['10-1', '10-2', '10-3', '10-4', '10-5', '10-6', '10-7', '10-8', '10-9', '10-10', '10-11', '10-12', '10-13', '10-14', '10-15', '10-16', '10-17', '10-18', '10-19', '10-20', '10-21', '10-22']
        },
        yAxis: {
          name: '金额',
          type: 'value'
        },
        legend: {
          show: true,
          data: ['吃饭', '弹性支出']
        },
        series: [
          {
            name: '吃饭',
            data: [10, 20, 0, 40, 50, 33, 26, 30, 20, 22, 50, 22, 100, 198, 211, 23, 55, 65, 33, 22, 400],
            type: 'line'
          },
          {
            name: '弹性支出',
            data: [0, 0, 0, '-', '-', '-', 0, 20, 0, 0, 0, 0, 100, 40],
            type: 'line',
            colorBy: 'data'
          }
        ],
        visualMap: {
          show: false,
          type: 'piecewise',
          seriesIndex: 0,
          min: 0,
          max: 400,
          pieces: [
            { max: 30, color: '#67CCB5' },
            { min: 30, max: 60, color: '#458BDD' },
            { min: 60, max: 100, color: '#F6CD42' },
            { min: 100, max: 200, color: '#EF8598', label: '开销有点大了,哥' },
            { min: 200, max: 1000, color: '#C33280', label: '吃龙肝凤胆了?' }
          ]
        },
        tooltip: {
          show: true,
          trigger: 'axis'
          // formatter: '日期: {b} <br/> 吃饭: {c0} <br/> 弹性支出: {c1}'
        },
        toolbox: {
          show: true,
          right: '100',
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        }
      })
    },
    initChartMon() {
      this.chartMon = echarts.init(document.getElementById('chart-mon'))
      this.chartMon.setOption({
        title: {
          text: '月存入统计图',
          textStyle: {
            color: '#333',
            fontWeight: 'normal',
            fontsize: 18
          },
          left: '20'
        },
        xAxis: {
          name: '月份',
          type: 'category',
          data: ['2021-7', '2021-8', '2021-9', '2021-10', '2021-11', '2021-12']
        },
        yAxis: {
          name: '金额',
          type: 'value'
        },
        legend: {
          show: true,
          data: ['活性存入', '住房公积金', '总存入']
        },
        series: [
          {
            name: '活性存入',
            data: [6666, 7115, 7234, 7000, 5000, 5423],
            type: 'line'
          },
          {
            name: '住房公积金',
            data: [2750, 2750, 2750, 2750, 2765, 2750],
            type: 'line',
            colorBy: 'data'
          },
          {
            name: '总存入',
            data: [9416, 9865, 9984, 9750, 7765, 8173],
            type: 'line',
            colorBy: 'data'
          }
        ],
        visualMap: {
          show: false,
          type: 'piecewise',
          seriesIndex: 0,
          min: 0,
          max: 400,
          pieces: [
            { max: 5000, color: '#EF8598' },
            { min: 5000, max: 6000, color: '#F6CD42' },
            { min: 6000, color: '#67CCB5' }
          ]
        },
        tooltip: {
          show: true,
          trigger: 'axis'
          // formatter: '日期: {b} <br/> 吃饭: {c0} <br/> 弹性支出: {c1}'
        },
        toolbox: {
          show: true,
          right: '100',
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        }
      })
    },
    doGetIncome() {
      getIncome('income-1s9reeg3xv').then(resp => {
        this.incomeInfo = resp
      })
    },
    doGetCtgs() {
      const listQuery = {
        'page_index': 1,
        'page_size': 10,
        'show_delete': true
      }
      getCtgs('m', listQuery).then(resp => {
        const data = resp.data
        this.incomeCtgs = data.income_ctgs
        this.outcomeCtgs = data.outcome_ctgs
      })
    },
    doGetYearMOn(curTime) {
      getYearMon(curTime).then(resp => {
        const data = resp.data
        this.yearMon = {
          year: data.year,
          mon: data.mon
        }
      })
    },
    doGetMonIncomeCtgs() {
      const listQuery = {
        'op_unit': 'm',
        'associations': [
          {
            'name': 'Incomes',
            'belong_year': this.yearMon.year,
            'belong_mon': this.yearMon.mon
          }
        ]
      }
      getIncomeCtgs(listQuery).then(resp => {
        this.monIncomeCtgs = resp.data
      }).catch(err => {
        this.$message({
          message: err.message,
          type: 'error'
        })
      })
    },
    doGetMonOutcomeCtgs() {
      const listQuery = {
        'op_unit': 'm',
        'associations': [
          {
            'name': 'Outcomes',
            'belong_year': this.yearMon.year,
            'belong_mon': this.yearMon.mon
          }
        ]
      }
      getOutcomeCtgs(listQuery).then(resp => {
        this.monOutcomeCtgs = resp.data
      })
    },
    doGetDayOutcomeCtgs() {
      const listQuery = {
        'op_unit': 'd',
        'associations': [
          {
            'name': 'Outcomes'
          }
        ]
      }
      getOutcomeCtgs(listQuery).then(resp => {
        this.dayOutcomeCtgs = resp.data
      })
    },
    doGetOtherOutcomeCtgs() {
      const listQuery = {
        'op_unit': 'o',
        'associations': [
          {
            'name': 'Outcomes',
            'belong_year': this.yearMon.year,
            'belong_mon': this.yearMon.mon
          }
        ]
      }
      getOutcomeCtgs(listQuery).then(resp => {
        this.otherOutcomeCtgs = resp.data
      })
    },
    handleCreateIncome(scope) {
      console.log(scope) // debug
      this.createIncomeInput.income_category_id = scope.row.id
      const input = {
        income: {
          amount: parseFloat(this.createIncomeInput.amount),
          income_category_id: this.createIncomeInput.income_category_id
        }
      }
      this.doCreateIncome(input)
    },
    doCreateIncome(input) {
      createIncome(input).then(resp => {
        this.$message.success('录入成功')
        this.doGetMonIncomeCtgs()
      })
    },
    handleCreateOutcome(scope) {
      console.log(scope) // debug
      this.createOutcomeInput.outcome_category_id = scope.row.id
      const input = {
        outcome: {
          amount: parseFloat(this.createOutcomeInput.amount),
          outcome_category_id: this.createOutcomeInput.outcome_category_id
        }
      }
      this.doCreateOutcome(input)
    },
    doCreateOutcome(input) {
      createOutcome(input).then(resp => {
        this.$message.success('录入成功')
        this.doGetMonOutcomeCtgs()
      })
    },
    handleUpdateIncome(scope) {
      this.incomeCtgInfo = scope.row
      this.updateIncomeDialog = true
      this.updateIncomeInput.id = this.incomeCtgInfo.incomes[0].id
      this.updateIncomeInput.remark = this.incomeCtgInfo.incomes[0].remark
    },
    doUpdateIncome() {
      const income = this.updateIncomeInput
      income.amount = parseFloat(this.updateIncomeInput.amount)
      updateIncome(income).then(resp => {
        this.$message.success('修改成功')
        this.updateIncomeDialog = false
        this.doGetMonIncomeCtgs()
        this.updateIncomeInput.amount = undefined
      })
    },
    handleUpdateOutcome(scope) {
      this.outcomeCtgInfo = scope.row
      this.updateOutcomeDialog = true
      this.updateOutcomeInput.id = this.outcomeCtgInfo.outcomes[0].id
      this.updateOutcomeInput.remark = this.outcomeCtgInfo.outcomes[0].remark
    },
    doUpdateOutcome() {
      const outcome = this.updateOutcomeInput
      outcome.amount = parseFloat(this.updateOutcomeInput.amount)
      updateOutcome(outcome).then(resp => {
        this.$message.success('修改成功')
        this.updateOutcomeDialog = false
        this.doGetMonOutcomeCtgs()
        this.updateOutcomeInput.amount = undefined
      }).catch(err => {
        console.log(err)
      })
    },
    doDeleteOutcome(outcomeId) {
      this.otherOutcomeDeleteVisible = false
      deleteOutcome(outcomeId).then(resp => {
        this.$message.success('删除成功')
        this.doGetOtherOutcomeCtgs()
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/styles/color";
.title{
  background-color: #4AB7BD;
  height: 40px;
  margin-bottom: 10px;
  padding: 5px 0;
}
.operations{
  background-color: #2ac06d;
  margin-bottom: 10px;
}
.operations.month{
  background-color: #6BA2D6;
}
.operations.day{
  background-color: #2b2f3a;
}
.chart{
  background-color: white;
  padding-top: 10px;
}
.chart-summary{
  margin-bottom: 10px;
  font-size: 14px;
}
.chart-summary.bold{
  font-weight: bold;
}
.income-estimate{
  background-color: white;
  margin-top: 10px;
  margin-bottom: 10px;
}
#chart-mon{
  margin-bottom: 10px;
}
</style>
