import { IsUUID } from "class-validator"

export class DeleteFollowDto {
  @IsUUID()
  followerId: string

  @IsUUID()
  followingId: string
}
