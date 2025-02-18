import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import { CreateWishlistDto } from "./dto/create-wishlist.dto"
import { UpdateWishlistDto } from "./dto/update-user.dto"

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  async getAll(userID: string) {
    return this.prisma.wishlist.findMany({
      where: {
        userID
      }
    })
  }

  async getOne(userID: string, listID: string) {
    return this.prisma.wishlist.findFirst({
      where: {
        userID,
        id: listID
      }
    })
  }

  async create(dto: CreateWishlistDto, userID: string) {
    return this.prisma.wishlist.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userID
          }
        }
      }
    })
  }

  async update(dto: UpdateWishlistDto, userID: string, listID: string) {
    return this.prisma.wishlist.update({
      where: {
        userID,
        id: listID
      },
      data: dto
    })
  }

  async delete(listID: string) {
    return this.prisma.wishlist.delete({
      where: {
        id: listID
      }
    })
  }
}
