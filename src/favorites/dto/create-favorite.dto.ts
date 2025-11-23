import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FavoriteType } from '@/favorites/entities/favorite.entity';

export class CreateFavoriteDto {
  @ApiProperty({ enum: FavoriteType })
  @IsEnum(FavoriteType)
  type: FavoriteType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  destinationId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tourId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  hotelId?: string;
}

