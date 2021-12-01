import request from '@/utils/request'

export function createCollection(collection) {
  return request({
    url: '/collection',
    method: 'post',
    data: {
      collection: collection
    }
  })
}
