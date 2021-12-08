import request from '@/utils/request'

export function createSortKlg(sortKlg) {
  return request({
    url: '/water/sort-klg',
    method: 'post',
    data: {
      sort_knowledge: sortKlg
    }
  })
}

export function createTodo(todo) {
  return request({
    url: '/water/todo',
    method: 'post',
    data: {
      todo: todo
    }
  })
}

export function getFlows(listQuery) {
  return request({
    url: '/flows',
    method: 'post',
    data: listQuery
  })
}

export function getWaters(listQuery) {
  return request({
    url: '/waters ',
    method: 'post',
    data: listQuery
  })
}

export function getSortKlgs(listQuery) {
  return request({
    url: '/water/sort-klgs',
    method: 'post',
    data: listQuery
  })
}

export function getWater(waterId) {
  return request({
    url: `/water/${waterId}`,
    method: 'get'
  })
}

export function createWater(water) {
  return request({
    url: '/water',
    method: 'post',
    data: {
      water: water
    }
  })
}

