import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import { CreateWishlistDto } from "./dto/create-wishlist.dto"
import { UpdateWishlistDto } from "./dto/update-user.dto"

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: string) {
    return this.prisma.wishlist.findMany({
      where: {
        userId
      },
      include: {
        items: true
      }
    })
  }

  async getPublicWishlists(userId: string) {
    return this.prisma.wishlist.findMany({
      where: {
        userId,
        accessLevel: 'PUBLIC'
      },
      include: {
        items: true
      }
    })
  }

  async getOne(userId: string, listId: string) {
    return this.prisma.wishlist.findFirst({
      where: {
        userId,
        id: listId
      }
    })
  }

  async getPublicWishlist(userId: string, listId: string) {
    return this.prisma.wishlist.findFirst({
      where: {
        userId,
        id: listId,
        accessLevel: 'PUBLIC'
      }
    })
  }

  async create(dto: CreateWishlistDto, userId: string) {
    return this.prisma.wishlist.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId
          }
        }
      }
    })
  }

  async update(dto: UpdateWishlistDto, userId: string, listId: string) {
    return this.prisma.wishlist.update({
      where: {
        userId,
        id: listId
      },
      data: dto
    })
  }

  async delete(listId: string) {
    return this.prisma.wishlist.delete({
      where: {
        id: listId
      }
    })
  }
}
