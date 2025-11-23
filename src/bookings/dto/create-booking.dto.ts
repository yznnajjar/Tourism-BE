import { IsEnum, IsNumber, IsOptional, IsString, IsDateString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BookingType } from '@/bookings/entities/booking.entity';

export class CreateBookingDto {
  @ApiProperty({ enum: BookingType })
  @IsEnum(BookingType)
  type: BookingType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tourId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  hotelId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  numberOfGuests?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  checkInDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  checkOutDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  tourDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  specialRequests?: string;
}

