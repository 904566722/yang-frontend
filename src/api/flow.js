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

export function createWaterClt(waterClt) {
  return request({
    url: '/water/clt',
    method: 'post',
    data: {
      water_clt: waterClt
    }
  })
}

export function deleteWaterClt(waterCltId) {
  return request({
    url: `/water/clt/${waterCltId}`,
    method: 'delete'
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

export function getTodos(listQuery) {
  return request({
    url: '/water/todos',
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

export function getWaterClts(listQuery) {
  return request({
    url: '/water/clts',
    method: 'post',
    data: listQuery
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

export function updateWater(water) {
  return request({
    url: `/water/update/${water.id}`,
    method: 'post',
    data: {
      water: water
    }
  })
}

export function updateTodo(todo) {
  return request({
    url: `/water/todo/update/${todo.id}`,
    method: 'post',
    data: {
      todo: todo
    }
  })
}

export function updateWaterClt(waterClt) {
  return request({
    url: `/water/clt/update/${waterClt.id}`,
    method: 'post',
    data: {
      water_collection: waterClt
    }
  })
}

