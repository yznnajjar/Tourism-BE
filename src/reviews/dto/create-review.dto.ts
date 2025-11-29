import { IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;

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

