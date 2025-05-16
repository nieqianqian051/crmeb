// +---------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +---------------------------------------------------------------------
// | Copyright (c) 2016~2023 https://www.crmeb.com All rights reserved.
// +---------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +---------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +---------------------------------------------------------------------

import axios from 'axios';
import { Message } from 'element-ui';
import { getCookies, removeCookies } from '@/libs/util';


const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 600000, // 请求超时时间
});

axios.defaults.withCredentials = true; // 携带cookie

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // console.log(config)
    if (config.kefu) {
      let baseUrl = process.env.VUE_APP_BASE_API.replace(/adminapi/, 'kefuapi');
      config.baseURL = baseUrl;
    } else {
      config.baseURL = process.env.VUE_APP_BASE_API;
    }
    if (config.file) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    const token = getCookies('token');
    // const kefuToken = getCookies('kefu_token');
    // if (token || kefuToken) {
    //   config.headers['maijiToken'] = config.kefu ? 'Bearer ' + kefuToken : 'Bearer ' + token;
    // }
    config.headers['Authorization'] = token;
    return config;
  },
  (error) => {
      // console.log(11,error)
    // do something with request error
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  (response) => {
      // console.log(response)
      const code = response.data.code || 200;
      const msg = response.data.msg
      if(response.request.responseType ===  'blob' || response.request.responseType ===  'arraybuffer'){
          return response.data
      }
      if (code === 401) {
          return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
      } else
          if (code === 500) {
          Message({ message: msg, type: 'error' })
          return Promise.reject(new Error(msg))
      } else if (code === 601) {
          Message({ message: msg, type: 'warning' })
          return Promise.reject(new Error(msg))
      } else if (code !== 200) {
          Message({ message: msg, type: 'error'})
          return Promise.reject(new Error(msg))
      } else {
          return response.data
      }
  },
  (error) => {
    Message.error(error.msg);
    return Promise.reject(error);
  },
);

export default service;
