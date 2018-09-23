import axios from 'axios'
import NProgress from 'nprogress'
import config from '@/config'

const inst = axios.create({
  baseURL: config.baseURL,
  params: {
    api_key: config.api_key,
    language: config.language
  },
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

const requestHandler = config => {
  NProgress.start()
  return config
}

const errorHandler = error => {
  NProgress.done()
  return Promise.reject(error)
}

const responseHandler = response => {
  NProgress.done()
  return response
}

inst.interceptors.request.use(requestHandler, errorHandler)

inst.interceptors.response.use(responseHandler, errorHandler)

export default inst
