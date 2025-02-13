import { Access } from "@prisma/client";
// import { Transform } from "class-transformer";
import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";

export class CreateWishlistDto{
    // @IsString()
    // userID: string

    @IsString()
    title: string

    @IsString()
    @IsOptional()
    description?: string

    @IsOptional()
    @IsBoolean()
    isGroupList: boolean

    @IsEnum(Access)
    @IsOptional()
    accessLevel: Access

}
