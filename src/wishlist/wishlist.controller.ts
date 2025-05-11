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
import { WishlistService } from "./wishlist.service"
import { CurrentUser } from "src/auth/decorators/user.decorator"
import { Auth } from "src/auth/decorators/auth.decorator"
import { CreateWishlistDto } from "./dto/create-wishlist.dto"

@Controller("user/wishlists")
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  @Auth()
  async getAll(@CurrentUser("id") userID: string) {
    return this.wishlistService.getAll(userID)
  }

  @Get(":id")
  @Auth()
  async getOne(@CurrentUser("id") userID: string, @Param("id") id: string) {
    return this.wishlistService.getOne(userID, id)
  }
  @Get("/public/:userId")
  @Auth()
  async getPublicWishlists(@Param("userId") userId: string) {
    return this.wishlistService.getPublicWishlists(userId)
  }

  @Get("/public/:userId/:listId")
  @Auth()
  async getPublicWishlist(@Param("userId") userId: string, @Param("listId") listId: string) {
    return this.wishlistService.getPublicWishlist(userId, listId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(
    @Body() dto: CreateWishlistDto,
    @CurrentUser("id") userID: string
  ) {
    return this.wishlistService.create(dto, userID)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(":id")
  @Auth()
  async update(
    @Body() dto: CreateWishlistDto,
    @CurrentUser("id") userID: string,
    @Param("id") id: string
  ) {
    return this.wishlistService.update(dto, userID, id)
  }

  @HttpCode(200)
  @Delete(":id")
  @Auth()
  async delete(@Param("id") id: string) {
    return this.wishlistService.delete(id)
  }
}
