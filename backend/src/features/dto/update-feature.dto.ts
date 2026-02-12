import { PartialType } from '@nestjs/mapped-types';
import { CreateFeatureDto } from './create-feature.dto';
import { IsOptional, IsEnum } from 'class-validator';

export enum FeatureStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export class UpdateFeatureDto extends PartialType(CreateFeatureDto) {
  @IsOptional()
  @IsEnum(FeatureStatus)
  status?: FeatureStatus;
}
