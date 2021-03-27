import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ResultError } from '../main.helper'
import { UserRole } from '../user.enum'


@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  protected async getUser(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest()
    return request.user
  }

  protected async getUserRoles(context: ExecutionContext): Promise<UserRole> {
    const user: any = await this.getUser(context)
    if (!user) throw new ResultError(null, 403, 403, 'Unauthorized')
    return user.role
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {

    const userRoles = await this.getUserRoles(context)

    if(userRoles == UserRole.ADMIN){
        return true
    }

    throw new ResultError(null, 403, 403, 'Denied')
  }
}