import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

@Injectable()
export class FeaturesService {
  constructor(private prisma: PrismaService) {}

  async create(createFeatureDto: CreateFeatureDto) {
    return this.prisma.featureRequest.create({
      data: {
        title: createFeatureDto.title,
        description: createFeatureDto.description,
        createdBy: createFeatureDto.createdBy,
      },
      include: {
        creator: true,
        votes: true,
        reactions: true,
      },
    });
  }

  async findAll(search?: string) {
    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }
      : undefined;
    return this.prisma.featureRequest.findMany({
      where,
      include: {
        creator: true,
        votes: true,
        reactions: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.featureRequest.findUnique({
      where: { id: parseInt(id) },
      include: {
        creator: true,
        votes: true,
        reactions: true,
      },
    });
  }

  async update(id: string, updateFeatureDto: UpdateFeatureDto) {
    const { createdBy, ...updateData } = updateFeatureDto;
    return this.prisma.featureRequest.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        creator: true,
        votes: true,
        reactions: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.featureRequest.delete({
      where: { id: parseInt(id) },
    });
  }
}
