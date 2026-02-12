import { Module } from '@nestjs/common';
import { FeaturesModule } from './features/features.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, FeaturesModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
