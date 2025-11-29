import { IsString, IsOptional, IsNumber, IsArray, IsInt, Min } from 'class-validator';

export class CreateTourDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsString()
  destinationId: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categoryIds?: string[];

  @IsOptional()
  @IsInt()
  @Min(1)
  maxParticipants?: number;

  @IsOptional()
  @IsString()
  meetingPoint?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  included?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  excluded?: string[];
}

