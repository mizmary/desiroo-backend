import { IsEmail, IsString, MinLength } from "class-validator"

export class AuthDto {
  @IsEmail()
  email: string

  @MinLength(8, {
    message: "Password must be at least 6 characters long"
  })
  @IsString()
  password: string

  @IsString()
  @MinLength(3, { message: "Name must be at least 3 characters long" })
  name: string
}

export class LoginDTO {
  @IsEmail()
  email: string

  @MinLength(8, {
    message: "Password must be at least 6 characters long"
  })
  @IsString()
  password: string
}
