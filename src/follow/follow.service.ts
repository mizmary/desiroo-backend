import { Injectable } from "@nestjs/common"

import { PrismaService } from "src/prisma.service"
import { CreateFollowDto } from "./dto/create-follow.dto"
import { DeleteFollowDto } from "./dto/delete-follow.dto"

@Injectable()
export class FollowService {
  constructor(private prisma: PrismaService) {}

  async followUser(dto: CreateFollowDto) {
    return this.prisma.follow.create({
      data: {
        followerId: dto.followerId,
        followingId: dto.followingId
      }
    })
  }

  async unfollowUser(dto: DeleteFollowDto) {
    return this.prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: dto.followerId,
          followingId: dto.followingId
        }
      }
    })
  }

  async getFollowers(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        followers: {
          include: {
            follower: true
          }
        }
      }
    })

    return user?.followers.map((f) => f.follower)
  }

  async getFollowing(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        following: {
          include: {
            following: {
              include: {
                reservedItems: true,
                wishlists: {
                  include: {
                    items: true
                  }
                }
              }
            }
          }
        }
      }
    })

    return user?.following.map((f) => {
      const followedUser = f.following

      const completedWishesCount = followedUser.wishlists
        .flatMap((wishlist) => wishlist.items)
        .filter((item) => item.isCompleted).length

      return {
        id: followedUser.id,
        name: followedUser.name,
        email: followedUser.email,
        bio: followedUser.bio,
        reservedCount: followedUser.reservedItems.length,
        completedWishesCount
      }
    })
  }

  async isFollowing(followerId: string, followingId: string) {
    const follow = await this.prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId
        }
      }
    })
    return !!follow
  }
}
