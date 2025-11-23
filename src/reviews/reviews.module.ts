import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review, ReviewSchema } from './entities/review.entity';
import { Destination, DestinationSchema } from '@/destinations/entities/destination.entity';
import { Tour, TourSchema } from '@/tours/entities/tour.entity';
import { Hotel, HotelSchema } from '@/hotels/entities/hotel.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewSchema },
      { name: Destination.name, schema: DestinationSchema },
      { name: Tour.name, schema: TourSchema },
      { name: Hotel.name, schema: HotelSchema },
    ]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
