import request from '@/utils/request'

export function getIncome(incomeId) {
  return request({
    url: `/income/${incomeId}`,
    method: 'get'
  })
}

export function createIncome(income) {
  return request({
    url: '/income',
    method: 'post',
    data: income
  })
}

export function createOutcome(outcome) {
  return request({
    url: '/outcome',
    method: 'post',
    data: outcome
  })
}

export function deleteOutcome(outcomeId) {
  return request({
    url: `/outcome/${outcomeId}`,
    method: 'delete'
  })
}

export function updateIncome(income) {
  return request({
    url: `/income/${income.id}`,
    method: 'post',
    data: {
      income: income
    }
  })
}

export function updateOutcome(outcome) {
  return request({
    url: `/outcome/${outcome.id}`,
    method: 'post',
    data: {
      outcome: outcome
    }
  })
}

export function getCtgs(opUnit, listQuery) {
  return request({
    url: `/category/${opUnit}`,
    method: 'post',
    data: listQuery
  })
}

export function getIncomeCtgs(listQuery) {
  return request({
    url: '/income/categories',
    method: 'post',
    data: listQuery
  })
}

export function getOutcomeCtgs(listQuery) {
  return request({
    url: '/outcome/categories',
    method: 'post',
    data: listQuery
  })
}

export function getYearMon(curTime) {
  return request({
    url: '/year-mon',
    method: 'get',
    params: {
      'cur_time': curTime
    }
  })
}
