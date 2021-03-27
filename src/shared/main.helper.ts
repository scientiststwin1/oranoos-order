import { HttpException } from "@nestjs/common"
import { RpcException } from "@nestjs/microservices"

export class Result {
    constructor(
      data: any,
      options?: {
        message?: string
        meta?: any
        code?: number
      },
    ) {
      this.data = data
      this.success = true
      if (options != undefined) {
        this.code = options.code != undefined ? options.code : 200
        this.message = options.message
        this.meta = options.meta
      }
    }
    success: boolean = true
    code: number = 200
    data: any
    meta: any
    message: string
  
    toString() {
      return `success=${this.success}, code=${this.code}, message=${this.message}, meta=${this.meta}, data=${this.data}`
    }
}

export class ResultError extends HttpException {
  constructor(
    data: any,
    code: number = 1001,
    statusCode: number = 400,
    // TODO: Change message to required
    message?: string,
  ) {
    super(data, statusCode)
    this.success = false
    this.code = code
    this.data = data
    this.message = message
  }
  success: boolean
  code: number
  data: any
  message: string

  getResponse(): string | object {
    return { success: this.success, code: this.code, data: this.data, message: this.message }
  }
}
export class RpcResultError extends RpcException {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(
    data: any,
    code = 1001,
    // statusCode = 400,
    // TODO: Change message to required
    message?: string,
  ) {
    super(data)
    this.success = false
    this.code = code
    this.data = data
    this.cmessage = message
  }
  success: boolean
  code: number
  data: any
  cmessage: string

  getResponse(): string | Record<string, unknown> {
    return { success: this.success, code: this.code, data: this.data }
  }
}