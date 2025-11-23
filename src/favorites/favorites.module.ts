import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { Favorite, FavoriteSchema } from './entities/favorite.entity';
import { Destination, DestinationSchema } from '@/destinations/entities/destination.entity';
import { Tour, TourSchema } from '@/tours/entities/tour.entity';
import { Hotel, HotelSchema } from '@/hotels/entities/hotel.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Favorite.name, schema: FavoriteSchema },
      { name: Destination.name, schema: DestinationSchema },
      { name: Tour.name, schema: TourSchema },
      { name: Hotel.name, schema: HotelSchema },
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
