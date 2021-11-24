import { BaseApiUrl } from '../constants'

import ax from 'axios'

export const nodeAxios = ax.create({
  baseURL: `${BaseApiUrl}`,
  headers: {
    common: {
      'Content-Type': 'application/json'
    }
  },
  timeout: 50000
})

nodeAxios.interceptors.response.use(
  res => res,
  err => {
    console.log('🚀 ~ file: axios.js ~ line 19 ~ err', err)
    throw err
  }
)
