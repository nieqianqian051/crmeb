/*
ajax请求函数模块
返回值: promise对象(异步返回的数据是: response.data)
 */
import axios from "axios";

export default function ajax(url, data = {}, type = "POST", maijiToken, contentType) {
  maijiToken = maijiToken
  return new Promise(function(resolve, reject) {
    let promise
    const config = { headers: { maijiToken } }
    if (contentType) config.headers["Content-Type"] = contentType
    let cancel  // 用于保存取消请求的函数
    if (type === "GET") {
      let dataStr = ""
      Object.keys(data).forEach(key => dataStr += `${key}=${data[key]}&`)
      if (dataStr !== "") url = `${url}?${dataStr.substring(0, dataStr.lastIndexOf("&"))}`
      promise = axios.get(url, config)
    } else {
      config.cancelToken = new axios.CancelToken((c) => cancel = c)
      promise = axios.post(url, data, config)
    }
    promise.then(function(response) {
                    resolve(response.data)
                  }).catch(function(error) {
                    reject(error)
                  })
  })
}
