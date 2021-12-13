<template>
  <div>
    <el-card class="overview">
      <div slot="header" class="clearfix">
        <span>收入</span>
        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
      </div>
      <el-table
        :data="incomes"
      >
        <el-table-column
          label="名称"
        >
          <template slot-scope="scope">
            {{ scope.row.income_category.name }}
          </template>
        </el-table-column>
        <el-table-column
          label="数目"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.amount }}</span>
            <!--            <el-input v-if="scope.row.incomes.length === 0" v-model="createIncomeInput.amount" type="number" aria-placeholder="输入金额" style="width: 100px" />-->
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <!--          <template slot-scope="scope">-->
          <!--            <el-button v-if="scope.row.incomes.length === 0" type="primary" size="mini" @click="handleCreateIncome(scope)">录入</el-button>-->
          <!--            <el-button v-if="scope.row.incomes.length > 0" type="info" size="mini" @click="handleUpdateIncome(scope)">修改</el-button>-->
          <!--          </template>-->
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getIncomes } from '@/api/book-keeping'

export default {
  name: 'Incomes',
  props: {
    yearMon: Object
  },
  data() {
    return {
      incomes: []
    }
  },
  watch: {
    yearMon: function(newObj, oldObj) {
      this.doGetIncomes()
    }
  },
  mounted() {
    // this.initPageInfo()
    this.doGetIncomes()
  },
  methods: {
    // initPageInfo() {
    //   const curTime = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
    //   getYearMon(curTime).then(resp => {
    //     const data = resp.data
    //     this.yearMon = {
    //       year: data.year,
    //       mon: data.mon
    //     }
    //   })
    // },
    doGetIncomes() {
      const listQuery = {
        belong_year: this.yearMon.year,
        belong_mon: this.yearMon.mon,
        associations: [
          {
            name: 'IncomeCategory'
          }
        ]
      }
      getIncomes(listQuery).then(res => {
        this.incomes = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
