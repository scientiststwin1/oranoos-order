import { createParamDecorator } from '@nestjs/common'

export const User = createParamDecorator(async (data: string, ctx: any) => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
})

