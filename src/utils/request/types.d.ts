import { AxiosRequestConfig } from 'axios'
import { AxiosTransform } from './axiosTransform'

export interface CreateAxiosOptions extends AxiosRequestConfig {
  transform?: AxiosTransform
  requestOptions?: RequestOptions
  authenticationScheme?: string
}

// 上传文件
export interface UploadFileParams {
  // 其他参数
  data?: Recordable
  // 文件参数接口字段名
  name?: string
  // 文件
  file: File | Blob
  // 文件名称
  filename?: string
  [key: string]: any
}

export interface RequestOptions {
  // 是否忽略超时时间
  ignoreTimeout?: boolean
  // 请求参数拼接到url
  joinParamsToUrl?: boolean
  // 是否显示提示信息
  isShowMessage?: boolean
  // 是否解析成JSON
  isParseToJson?: boolean
  // 成功的文本信息
  successMessageText?: string
  // 是否显示成功信息
  isShowSuccessMessage?: boolean
  // 是否显示失败信息
  isShowErrorMessage?: boolean
  // 错误的文本信息
  errorMessageText?: string
  // 是否加入url
  joinPrefix?: boolean
  // 接口地址， 不填则使用默认apiUrl
  apiUrl?: string
  // 请求拼接路径
  urlPrefix?: string
  // 是否添加时间戳
  joinTime?: boolean
  // 不进行任何处理，直接返回
  isTransformResponse?: boolean
  // 是否携带token
  withToken?: boolean
}
