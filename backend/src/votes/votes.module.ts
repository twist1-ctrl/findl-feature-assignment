import { Module } from '@nestjs/common';
import { VotesController } from './votes.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [VotesController],
  providers: [PrismaService],
})
export class VotesModule {}
