import { Injectable } from "@nestjs/common"
import { hash } from "argon2"
import { AuthDto } from "src/auth/dto/auth.dto"
import { PrismaService } from "src/prisma.service"
import { UpdateUserDTO, UserDto } from "./dto/user.dto"

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        wishlists: true
      }
    })
  }

  getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  async create(dto: AuthDto) {
    const user = {
      email: dto.email,
      name: dto.name,
      password: await hash(dto.password)
    }

    return this.prisma.user.create({
      data: user
    })
  }

  async update(id: string, dto: UpdateUserDTO) {
    let data = dto
    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) }
    }

    return this.prisma.user.update({
      where: {
        id
      },
      data
    })
  }

  async getProfile(id: string) {
    const profile = await this.getById(id)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = profile

    return {
      user: rest
    }
  }
}
