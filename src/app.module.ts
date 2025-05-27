import { Module } from "@nestjs/common"
import { AuthModule } from "./auth/auth.module"
import { ConfigModule } from "@nestjs/config"
import { WishlistModule } from "./wishlist/wishlist.module"
import { UserModule } from "./user/user.module"
import { WishlistItemModule } from "./wishlist-item/wishlist-item.module"
import { FollowModule } from "./follow/follow.module"

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    WishlistModule,
    WishlistItemModule,
    FollowModule
  ]
})
export class AppModule {}
