import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Put,
  UsePipes,
  ValidationPipe
} from "@nestjs/common"
import { UserService } from "./user.service"
import { Auth } from "src/auth/decorators/auth.decorator"
import { CurrentUser } from "src/auth/decorators/user.decorator"
import { UpdateUserDTO, UserDto } from "./dto/user.dto"

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth()
  async profile(@CurrentUser("id") id: string) {
    return this.userService.getProfile(id)
  }

  @Get(":id")
  @Auth()
  async getUserById(@Param("id") id: string) {
    const user = await this.userService.getById(id)
    const { password, ...rest } = user
    return { user: rest }
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @Auth()
  async updateProfile(
    @CurrentUser("id") id: string,
    @Body() dto: UpdateUserDTO
  ) {
    return this.userService.update(id, dto)
  }
}
