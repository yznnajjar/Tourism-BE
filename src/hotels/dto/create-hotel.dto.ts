import { IsString, IsOptional, IsNumber, IsArray, IsEnum, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { HotelType } from '@/hotels/entities/hotel.entity';

export class CreateHotelDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  pricePerNight: number;

  @ApiProperty({ enum: HotelType, required: false })
  @IsOptional()
  @IsEnum(HotelType)
  type?: HotelType;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiProperty()
  @IsString()
  destinationId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalRooms?: number;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  checkInTime?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  checkOutTime?: string;
}

