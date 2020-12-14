import request from "./config/axios";

export const login = (data) => {
  return request({
    url:'/api/user/login',
    method:'post',
    data
  })
};
