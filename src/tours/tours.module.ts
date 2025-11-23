import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { Tour, TourSchema } from './entities/tour.entity';
import { Destination, DestinationSchema } from '@/destinations/entities/destination.entity';
import { Category, CategorySchema } from '@/categories/entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tour.name, schema: TourSchema },
      { name: Destination.name, schema: DestinationSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [ToursController],
  providers: [ToursService],
  exports: [ToursService],
})
export class ToursModule {}
