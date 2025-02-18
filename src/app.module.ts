import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AuthModule } from "./auth/auth.module"
import { ConfigModule } from "@nestjs/config"
import { WishlistModule } from "./wishlist/wishlist.module"
import { UserModule } from "./user/user.module"
import { WishlistItemModule } from "./wishlist-item/wishlist-item.module"

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, WishlistModule, WishlistItemModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
