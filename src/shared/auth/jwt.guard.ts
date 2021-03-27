import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ResultError } from '../main.helper'


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw (
        err || new UnauthorizedException(new ResultError(null, null, HttpStatus.UNAUTHORIZED, 'UnAuthorized'))
      )
    }
    return user
  }
}