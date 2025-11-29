import { IsEnum, IsNumber, IsOptional, IsString, IsDateString, Min } from 'class-validator';
import { BookingType } from '@/bookings/entities/booking.entity';

export class CreateBookingDto {
  @IsEnum(BookingType)
  type: BookingType;

  @IsOptional()
  @IsString()
  tourId?: string;

  @IsOptional()
  @IsString()
  hotelId?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  numberOfGuests?: number;

  @IsOptional()
  @IsDateString()
  checkInDate?: string;

  @IsOptional()
  @IsDateString()
  checkOutDate?: string;

  @IsOptional()
  @IsDateString()
  tourDate?: string;

  @IsOptional()
  @IsString()
  specialRequests?: string;
}

