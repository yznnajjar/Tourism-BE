import { IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ minimum: 1, maximum: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  comment?: string;

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

