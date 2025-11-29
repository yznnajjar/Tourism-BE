import { IsEnum, IsOptional } from 'class-validator';
import { BookingStatus } from '@/bookings/entities/booking.entity';

export class UpdateBookingDto {
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  specialRequests?: string;
}

