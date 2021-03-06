import request from '@/utils/request';
export async function fakeAccountLogin(params) {
  return request('/login/account', {
    method: 'POST',
    body: params,
  });
}
export async function registe(params) {
  return request('/registe', {
    method: 'POST',
    body: params,
  });
}
export async function getFakeCaptcha(email) {
  return request(`/captcha?email=${email}`);
}
