import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Booking, BookingType, BookingDocument } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Tour, TourDocument } from '@/tours/entities/tour.entity';
import { Hotel, HotelDocument } from '@/hotels/entities/hotel.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    @InjectModel(Tour.name) private tourModel: Model<TourDocument>,
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
  ) {}

  async create(userId: string, createBookingDto: CreateBookingDto): Promise<Booking> {
    let totalAmount = 0;

    if (createBookingDto.type === BookingType.TOUR) {
      if (!createBookingDto.tourId) {
        throw new BadRequestException('Tour ID is required for tour bookings');
      }

      const tour = await this.tourModel.findById(createBookingDto.tourId).exec();

      if (!tour) {
        throw new NotFoundException('Tour not found');
      }

      const numberOfGuests = createBookingDto.numberOfGuests || 1;
      totalAmount = tour.price * numberOfGuests;
    } else if (createBookingDto.type === BookingType.HOTEL) {
      if (!createBookingDto.hotelId) {
        throw new BadRequestException('Hotel ID is required for hotel bookings');
      }

      if (!createBookingDto.checkInDate || !createBookingDto.checkOutDate) {
        throw new BadRequestException('Check-in and check-out dates are required for hotel bookings');
      }

      const hotel = await this.hotelModel.findById(createBookingDto.hotelId).exec();

      if (!hotel) {
        throw new NotFoundException('Hotel not found');
      }

      const checkIn = new Date(createBookingDto.checkInDate);
      const checkOut = new Date(createBookingDto.checkOutDate);
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

      if (nights <= 0) {
        throw new BadRequestException('Check-out date must be after check-in date');
      }

      totalAmount = hotel.pricePerNight * nights;
    }

    const booking = new this.bookingModel({
      ...createBookingDto,
      userId: new Types.ObjectId(userId),
      tourId: createBookingDto.tourId ? new Types.ObjectId(createBookingDto.tourId) : undefined,
      hotelId: createBookingDto.hotelId ? new Types.ObjectId(createBookingDto.hotelId) : undefined,
      totalAmount,
      checkInDate: createBookingDto.checkInDate ? new Date(createBookingDto.checkInDate) : undefined,
      checkOutDate: createBookingDto.checkOutDate ? new Date(createBookingDto.checkOutDate) : undefined,
      tourDate: createBookingDto.tourDate ? new Date(createBookingDto.tourDate) : undefined,
    });

    return booking.save();
  }

  async findAll(userId?: string): Promise<Booking[]> {
    const query: any = {};
    if (userId) {
      query.userId = new Types.ObjectId(userId);
    }

    return this.bookingModel
      .find(query)
      .populate('userId')
      .populate('tourId')
      .populate('hotelId')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string, userId?: string): Promise<Booking> {
    const query: any = { _id: new Types.ObjectId(id) };
    if (userId) {
      query.userId = new Types.ObjectId(userId);
    }

    const booking = await this.bookingModel
      .findOne(query)
      .populate('userId')
      .populate('tourId')
      .populate('hotelId')
      .exec();

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto, userId?: string): Promise<Booking> {
    const query: any = { _id: new Types.ObjectId(id) };
    if (userId) {
      query.userId = new Types.ObjectId(userId);
    }

    const booking = await this.bookingModel
      .findOneAndUpdate(query, updateBookingDto, { new: true })
      .exec();

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking;
  }

  async cancel(id: string, userId: string): Promise<Booking> {
    const query = { _id: new Types.ObjectId(id), userId: new Types.ObjectId(userId) };
    const booking = await this.bookingModel
      .findOneAndUpdate(query, { status: 'cancelled' }, { new: true })
      .exec();

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking;
  }

  async remove(id: string): Promise<void> {
    const result = await this.bookingModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
  }
}
