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
        wishlistID: id
      }
    })
  }

  async create(dto: CreateWishlistItemDto, wishlistID: string) {
    return this.prisma.wishlistItem.create({
      data: {
        ...dto,
        wishlist: {
          connect: {
            id: wishlistID
          }
        }
      }
    })
  }

  async update(dto: UpdateWishlistItemDto, wishlistID: string, itemId: string) {
    return this.prisma.wishlistItem.update({
      where: {
        wishlistID,
        id: itemId
      },
      data: dto
    })
  }

  async delete(wishlistID: string, itemID: string) {
    return this.prisma.wishlistItem.delete({
      where: {
        wishlistID,
        id: itemID
      }
    })
  }
}
