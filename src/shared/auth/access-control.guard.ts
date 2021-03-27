import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ResultError } from '../main.helper'


@Injectable()
export class ACGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  protected async getUser(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest()
    return request.user
  }

  protected async getUserRoles(context: ExecutionContext): Promise<string | string[]> {
    const user: any = await this.getUser(context)
    if (!user) throw new ResultError(null, 403, 403, 'Unauthorized')

    if (!user.roles) throw new ResultError(null, 403, 403, 'Denied')

    return user.roles
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {

    let roles = this.reflector.get<string[]>('roles', context.getHandler())

    const args = context.getArgByIndex(0)

    if (args.roles) roles = args.roles

    const userRoles = await this.getUserRoles(context)

    if (roles) {
      for (const role in roles) {
        if (userRoles?.includes(roles[role])) {
          return true
        }
      }
    }

    throw new ResultError(null, 403, 403, 'Denied')
  }
}