import request from '@/utils/request';
import { stringify } from 'qs';

export function getList(parames) {
  return request(`/v1/shop/list?${stringify(parames)}`);
}
export function removeData(id) {
  return request(`/v1/shop/remove/${id}`, {
    method: 'DELETE',
  });
}
