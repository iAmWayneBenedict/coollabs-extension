import config from '@/lib/config'
import axios from 'axios'

const request = axios.create({
  baseURL: config.SERVER_API,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

request.interceptors.request.use(
  (config) => {
    // add config here before the request is sent

    return config
  },
  (error) => Promise.reject(error),
)

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => Promise.reject(error),
)

export default request
