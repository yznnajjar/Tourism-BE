import { IsString, IsOptional, IsNumber, IsArray, IsEnum, Min } from 'class-validator';
import { HotelType } from '@/hotels/entities/hotel.entity';

export class CreateHotelDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  pricePerNight: number;

  @IsOptional()
  @IsEnum(HotelType)
  type?: HotelType;

  @IsString()
  address: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

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
  @IsNumber()
  @Min(0)
  totalRooms?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @IsOptional()
  @IsString()
  checkInTime?: string;

  @IsOptional()
  @IsString()
  checkOutTime?: string;
}

