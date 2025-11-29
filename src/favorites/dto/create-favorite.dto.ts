import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FavoriteType } from '@/favorites/entities/favorite.entity';

export class CreateFavoriteDto {
  @IsEnum(FavoriteType)
  type: FavoriteType;

  @IsOptional()
  @IsString()
  destinationId?: string;

  @IsOptional()
  @IsString()
  tourId?: string;

  @IsOptional()
  @IsString()
  hotelId?: string;
}

