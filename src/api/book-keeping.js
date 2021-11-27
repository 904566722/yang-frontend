import request from '@/utils/request'

export function getIncome(incomeId) {
  return request({
    url: `/income/${incomeId}`,
    method: 'get'
  })
}
