<template>
  <div class="app-container">
    <!--  标题栏  -->
    <el-row :gutter="10">
      <el-col :span="6">
        <div class="title">
          <span class="big-title">十月份</span><span class="description-content">账单详情</span>
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
            <el-table
              :data="opMonData"
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
                  {{ scope.row.account }}
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
              >
                <el-button>录入</el-button>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="operations day">
            <el-table
              row-key="id"
              :data="opDayData"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
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
                  {{ scope.row.account }}
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
              >
                <el-button>录入</el-button>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </div>
    </el-row>
    <el-row>
      <div id="chart" class="chart" :style="{height:height,width:width}" />
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
        <el-descriptions title="用户信息">
          <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
          <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
          <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
          <el-descriptions-item label="备注">
            <el-tag size="small">学校</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
        </el-descriptions>
      </div>
    </el-row>
    <el-button @click="doGetIncome">默认按钮</el-button>
  </div>
</template>

<script>
import { getIncome } from '@/api/book-keeping'
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
      chart: null,
      eatSummary: '吃饭总结',
      eatAvg: 42.5,
      eatLimit: 40,
      incomeInfo: {}
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('chart'))
      // const data = [['10-01', 40], ['10-02', 10], ['10-03', 0], ['10-04', 20], ['10-05', 50], ['10-06', 30], ['10-07', 10], ['10-08', 100], ['10-09', 20], ['10-10', 85], ['10-11', 20], ['10-12', 50], ['10-13', 100], ['10-14', 386], ['10-15', 85], ['10-16', 85], ['10-17', 20], ['10-18', 0], ['10-19', 30], ['10-20', 40], ['10-21', 85], ['10-22', 0], ['10-23', 0], ['10-24', 0], ['10-25', 0], ['10-26', 0], ['10-27', 0], ['10-28', 0], ['10-29', 0], ['10-30', 0], ['10-31', 20]]
      // const dateList = data.map(function(item) {
      //   return item[0]
      // })
      // const valueList = data.map(function(item) {
      //   return item[1]
      // })
      this.chart.setOption({
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
    doGetIncome() {
      getIncome('income-1s9reeg3xv').then(resp => {
        this.incomeInfo = resp
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
  background-color: $my_light_red;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 100px;
}
</style>
