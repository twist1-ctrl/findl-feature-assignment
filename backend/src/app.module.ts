import { Module } from '@nestjs/common';
import { FeaturesModule } from './features/features.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [PrismaModule, FeaturesModule, UserModule, VotesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
