import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { Destination, DestinationSchema } from '@/destinations/entities/destination.entity';
import { Tour, TourSchema } from '@/tours/entities/tour.entity';
import { Hotel, HotelSchema } from '@/hotels/entities/hotel.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Destination.name, schema: DestinationSchema },
      { name: Tour.name, schema: TourSchema },
      { name: Hotel.name, schema: HotelSchema },
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
