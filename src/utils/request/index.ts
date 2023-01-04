import settings from '@/config/settings'
import { VAxios } from './axios'
import { AxiosTransform, CreateAxiosOptions } from './axiosTransform'
import { ContentTypeEnum, ResponseCode } from '@/enums/http'
import { Message } from '@arco-design/web-vue'
import type { RequestOptions } from './types'

const { apiUrl, urlPrefix, requestTimeout } = settings

// 数据处理
const transform: AxiosTransform = {
  transformRequestData(res, options) {
    if (!res?.data) {
      throw new Error('请求出错, 暂无数据!')
    }

    const { isTransformResponse } = options
    if (isTransformResponse) {
      return res.data
    }

    const { data, msg, code } = res.data
    // 调用message逻辑
    showMessage(options, code, msg)
    return data
  }
}

function showMessage(options: RequestOptions, code: number, msg?: string) {
  const {
    isShowMessage = true,
    isShowErrorMessage = true,
    isShowSuccessMessage,
    successMessageText,
    errorMessageText
  } = options

  const isSuccess = ResponseCode.SUCCESS === code

  if (isShowMessage) {
    if (isSuccess && isShowSuccessMessage) {
      Message.success(msg || successMessageText || '请求成功')
    } else if (!isSuccess && isShowErrorMessage) {
      Message.error(msg || errorMessageText || '请求失败')
    }
  }
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    Object.assign(opt || {}, {
      timeout: requestTimeout * 1000,
      authenticationScheme: '',
      // 接口前缀
      prefixUrl: urlPrefix,
      headers: {
        'Content-Type': ContentTypeEnum.JSON
      },
      // 数据处理方式
      transform,
      // 配置项，下面的选项都可以在独立的接口请求中覆盖
      requestOptions: {
        // 默认将prefix 添加到url
        joinPrefix: true,
        // 是否返回原生响应头 比如：需要获取响应头时使用该属性
        isReturnNativeResponse: false,
        // 需要对返回数据进行处理
        isTransformResponse: true,
        // post请求的时候添加参数到url
        joinParamsToUrl: false,
        // 格式化提交参数时间
        formatDate: false,
        // 消息提示类型
        errorMessageMode: 'none',
        // 接口地址
        apiUrl: apiUrl,
        // 接口拼接地址
        urlPrefix: urlPrefix,
        //  是否加入时间戳
        joinTime: true,
        // 忽略重复请求
        ignoreCancelToken: true,
        // 是否携带token
        withToken: true
      },
      withCredentials: false
    })
  )
}

export const http = createAxios()
