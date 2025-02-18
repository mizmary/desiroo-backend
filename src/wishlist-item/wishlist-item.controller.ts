import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from "@nestjs/common"
import { WishlistItemService } from "./wishlist-item.service"
import { Auth } from "src/auth/decorators/auth.decorator"
import { CreateWishlistItemDto } from "./dto/create-wishlist-item.dto"
import { UpdateWishlistItemDto } from "./dto/update-wishlist-item.dto"

@Controller("user/wishlists")
export class WishlistItemController {
  constructor(private readonly wishlistItemService: WishlistItemService) {}

  @Get(":wishlistID/items")
  @Auth()
  async getAll(@Param("wishlistID") wishlistID: string) {
    return this.wishlistItemService.getAll(wishlistID)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post(":wishlistID")
  @Auth()
  async create(@Body() dto: CreateWishlistItemDto, @Param("wishlistID") wishlistID: string) {
    return this.wishlistItemService.create(dto, wishlistID)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(":wishlistID/:itemID")
  @Auth()
  async update(
    @Body() dto: UpdateWishlistItemDto,
    @Param("wishlistID") wishlistID: string,
    @Param("itemID") itemID: string
  ) {
    return this.wishlistItemService.update(dto, wishlistID, itemID)
  }

  @HttpCode(200)
  @Delete(":wishlistID/:itemID")
  @Auth()
  async delete(@Param("wishlistID") wishlistID: string, @Param("itemID") itemID: string) {
    return this.wishlistItemService.delete(wishlistID, itemID)
  }
}
