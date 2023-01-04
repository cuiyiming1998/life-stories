import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { isFunction } from '@/utils/is'
import { CreateAxiosOptions, RequestOptions } from './types'
import { cloneDeep } from 'lodash-es'

export class VAxios {
  private axiosInstance: AxiosInstance
  private options: CreateAxiosOptions

  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  // 获取axios实例
  getInstance(): AxiosInstance {
    return this.axiosInstance
  }

  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config)
  }

  // 自定义请求头
  setHeader(headers: any): void {
    if (!this.getInstance()) {
      return
    }
    Object.assign(this.axiosInstance.defaults.headers, headers)
  }

  // 获取transform方法
  private getTransform() {
    const { transform } = this.options
    return transform
  }

  configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) {
      return
    }
    this.createAxios(config)
  }

  /**
   * description
   * 请求
   *
   * @param {AxiosRequestConfig} config axios配置
   * @param {RequestOptions} options 自定义配置
   * @return {}
   *
   */
  request<T = BasicResponseModel>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<BasicResponseModel<T>> {
    const transform = this.getTransform()
    let conf: AxiosRequestConfig = cloneDeep(config)

    // 覆盖默认的config
    const { requestOptions } = this.options
    const opt: RequestOptions = Object.assign({}, requestOptions, options)

    // 执行beforeRequestHook
    const { beforeRequestHook, requestCatch, transformRequestData } =
      transform || {}
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt)
    }

    // @ts-ignore
    // conf.requestOptions = opt // 给赋值一下

    return new Promise<
      BasicResponseModel<T> | AxiosResponse<BasicResponseModel<T>>
    >((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<BasicResponseModel<T>>>(conf)
        .then((res: AxiosResponse<BasicResponseModel<T>>) => {
          const isCancel = axios.isCancel(res)
          // 没被取消 执行transform
          if (
            transformRequestData &&
            isFunction(transformRequestData) &&
            !isCancel
          ) {
            try {
              const ret = transformRequestData(res, opt)
              return !!ret ? resolve(ret) : reject(ret)
            } catch (err) {
              return reject(err || new Error('request error!'))
            }
          }
        })
        .catch((e: Error) => {
          // 执行钩子
          if (requestCatch && isFunction(requestCatch)) {
            reject(requestCatch(e))
            return
          }
          reject(e)
        })
    })
  }

  private setupInterceptors() {
    const transform = this.getTransform()
    if (!transform) {
      return
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch
    } = transform

    // 如果有请求拦截器, 那么axios use一下
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (requestInterceptors && isFunction(requestInterceptors)) {
          config = requestInterceptors(config, this.options)
        }
        return config
      },
      undefined
    )

    // 请求catch同理
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(
        undefined,
        requestInterceptorsCatch
      )

    // 响应拦截器同理
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res)
      }
      return res
    }, undefined)

    // catch同理
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(
        undefined,
        responseInterceptorsCatch
      )
  }
}
