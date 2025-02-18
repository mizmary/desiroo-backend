import { Module } from "@nestjs/common"
import { WishlistItemService } from "./wishlist-item.service"
import { WishlistItemController } from "./wishlist-item.controller"
import { PrismaService } from "src/prisma.service"

@Module({
  controllers: [WishlistItemController],
  providers: [WishlistItemService, PrismaService],
  exports: [WishlistItemService]
})
export class WishlistItemModule {}
