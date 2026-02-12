import { Test, TestingModule } from '@nestjs/testing';
import { FeaturesService } from './features.service';
import { PrismaService } from '../prisma/prisma.service';
import { FeatureStatus } from '@prisma/client';

describe('FeaturesService', () => {
  let service: FeaturesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeaturesService,
        {
          provide: PrismaService,
          useValue: {
            featureRequest: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<FeaturesService>(FeaturesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all features', async () => {
      const mockFeatures = [
        {
          id: 1,
          title: 'Feature 1',
          description: 'Description 1',
          createdBy: 'user-uuid-1',
          status: FeatureStatus.PENDING,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(prisma.featureRequest, 'findMany').mockResolvedValue(mockFeatures);

      const result = await service.findAll();
      expect(result).toBeDefined();
      expect(result).toEqual(mockFeatures);
    });
  });

  describe('findOne', () => {
    it('should return a feature by id', async () => {
      const mockFeature = {
        id: 1,
        title: 'Feature 1',
        description: 'Description 1',
        createdBy: 'user-uuid-1',
        status: FeatureStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.featureRequest, 'findUnique').mockResolvedValue(mockFeature);

      const result = await service.findOne('1');
      expect(result).toBeDefined();
      expect(result!.id).toBe(1);
    });
  });

  describe('create', () => {
    it('should create a new feature', async () => {
      const createFeatureDto = {
        title: 'New Feature',
        description: 'Feature description',
        createdBy: 'user-uuid-123',
      };

      const mockCreatedFeature = {
        id: 1,
        title: createFeatureDto.title,
        description: createFeatureDto.description,
        createdBy: createFeatureDto.createdBy,
        status: FeatureStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.featureRequest, 'create').mockResolvedValue(mockCreatedFeature);

      const result = await service.create(createFeatureDto);
      expect(result).toBeDefined();
      expect(result.title).toBe(createFeatureDto.title);
    });
  });
});
