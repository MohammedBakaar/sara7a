import { roleEnum } from "../enums/index.js"
import { UnauthorizedException } from "../exceptions/exceptions.js"

export const authentication = (authorizationLevel = roleEnum.user) => {
    return (req,res,next) => {
        let role = req.user.role
        if (role < authorizationLevel) {
            UnauthorizedException({})
        }
        next()
    }
}