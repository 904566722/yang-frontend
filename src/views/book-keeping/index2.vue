<template>
  <div class="app-container">
    <aside>
      <span class="big-title">{{ yearMon.year }}年{{ yearMon.mon }}月份</span><span class="description-content">账单详情</span>
    </aside>
    <el-row :gutter="10">
      <el-col :span="12">
        <incomes :year-mon="yearMon" />
      </el-col>
      <el-col :span="12" />
    </el-row>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { getYearMon } from '@/api/book-keeping'
import Incomes from '@/views/book-keeping/components/Incomes'

export default {
  name: 'Index2',
  components: {
    Incomes
  },
  data() {
    return {
      yearMon: {
        year: 1998,
        mon: 12
      },
      incomes: []
    }
  },
  mounted() {
    this.initPageInfo()
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
      })
    }
  }
}
</script>

<style scoped>

</style>
