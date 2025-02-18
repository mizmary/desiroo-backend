import { PriceRange, Priority, Prisma } from "@prisma/client"
import { IsBoolean, IsEnum, IsJSON, IsOptional, IsString, IsUrl } from "class-validator"

export class CreateWishlistItemDto {
  @IsString()
  title: string

  @IsString()
  @IsOptional()
  description?: string

  @IsOptional()
  @IsUrl()
  link: string

  @IsEnum(PriceRange)
  priceRange: PriceRange

  @IsEnum(Priority)
  priority: Priority

  @IsJSON()
  imagesURL: Prisma.JsonValue

  @IsBoolean()
  @IsOptional()
  isReserved?: boolean
}
