import request from '@/utils/request';
import { stringify } from 'qs';

export function getList(parames) {
  return request(`/v1/shop/list`, {
    method: 'POST',
    body: {
      ...parames,
    },
  });
}
export function removeData(id) {
  return request(`/v1/shop/remove/${id}`, {
    method: 'DELETE',
  });
}
export function updateShop(parames) {
  return request('/v1/shop/update', {
    method: 'POST',
    body: {
      ...parames,
    },
  });
}

export function createShop(parames) {
  return request('/v1/shop/create', {
    method: 'PUT',
    body: {
      ...parames,
    },
  });
}
