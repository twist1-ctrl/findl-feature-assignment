import { Controller, Post, Body } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('votes')
export class VotesController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async createVote(@Body() body: { featureId: number; userId: string }) {
    // Prevent voting for own feature
    if (!body.featureId) {
      return { error: 'featureId is required' };
    }
    const feature = await this.prisma.featureRequest.findUnique({
      where: { id: body.featureId },
      select: { createdBy: true },
    });
    if (feature && feature.createdBy === body.userId) {
      return { error: 'Cannot vote for your own feature' };
    }
    // Prevent duplicate votes
    const exists = await this.prisma.vote.findUnique({
      where: {
        featureId_userId: {
          featureId: body.featureId,
          userId: body.userId,
        },
      },
    });
    if (exists) {
      return { error: 'Already voted' };
    }
    return this.prisma.vote.create({
      data: {
        featureId: body.featureId,
        userId: body.userId,
      },
    });
  }
}
