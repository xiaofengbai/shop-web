import request from '@/utils/request';

export function getList(parames) {
  return request(`/v1/shop/list?page=${parames.page}&pageSize=${parames.pageSize}`);
}
export function removeData(id) {
  return request(`/v1/shop/remove/${id}`, {
    method: 'DELETE',
  });
}
