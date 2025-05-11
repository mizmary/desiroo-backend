import { Controller, Post, Body, Delete, Get, Param } from "@nestjs/common"
import { FollowService } from "./follow.service"
import { CreateFollowDto } from "./dto/create-follow.dto"
import { DeleteFollowDto } from "./dto/delete-follow.dto"

@Controller("follow")
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  follow(@Body() dto: CreateFollowDto) {
    return this.followService.followUser(dto)
  }

  @Delete()
  unfollow(@Body() dto: DeleteFollowDto) {
    return this.followService.unfollowUser(dto)
  }

  @Get("followers/:id")
  getFollowers(@Param("id") userId: string) {
    return this.followService.getFollowers(userId)
  }

  @Get("following/:id")
  getFollowing(@Param("id") userId: string) {
    return this.followService.getFollowing(userId)
  }
}
