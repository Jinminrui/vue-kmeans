import request from '@/utils/request'

// 调用上传文件接口
export function uploadFiles(data) {
  return request({
    url: '/api/upload',
    method: 'post',
    data
  })
}
