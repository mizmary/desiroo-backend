import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import { CreateWishlistItemDto } from "./dto/create-wishlist-item.dto"
import { UpdateWishlistItemDto } from "./dto/update-wishlist-item.dto"

@Injectable()
export class WishlistItemService {
  constructor(private prisma: PrismaService) {}

  async getAll(id: string) {
    return this.prisma.wishlistItem.findMany({
      where: {
        wishlistId: id
      }
    })
  }

  async getOne(wishlistId: string, id: string) {
    return this.prisma.wishlistItem.findFirst({
      where: {
        wishlistId: wishlistId,
        id: id
      }
    })
  }

  async create(dto: CreateWishlistItemDto, wishlistId: string) {
    return this.prisma.wishlistItem.create({
      data: {
        ...dto,
        wishlist: {
          connect: {
            id: wishlistId
          }
        }
      }
    })
  }

  async update(dto: UpdateWishlistItemDto, wishlistId: string, itemId: string) {
    return this.prisma.wishlistItem.update({
      where: {
        wishlistId,
        id: itemId
      },
      data: dto
    })
  }

  async delete(wishlistId: string, itemId: string) {
    return this.prisma.wishlistItem.delete({
      where: {
        wishlistId,
        id: itemId
      }
    })
  }
}
