import { IsEmail, IsOptional, IsString, MinLength } from "class-validator"

export class AboutUser {
  @IsOptional()
  bio?: string

  @IsOptional()
  tags?: string[]

  @IsOptional()
  shirtSizes?: string[]

  @IsOptional()
  shoeSizes?: string[]

  @IsOptional()
  ringSizes?: string[]

  @IsOptional()
  braceletSizes?: string[]

  @IsOptional()
  necklaceSizes?: string[]
}

export class UserDto extends AboutUser {
  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @MinLength(8, {
    message: "Password must be at least 6 characters long"
  })
  @IsString()
  password?: string

  @IsString()
  name: string

  @IsString()
  @IsOptional()
  avatar?: string;
}
