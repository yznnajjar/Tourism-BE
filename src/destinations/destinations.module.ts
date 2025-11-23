import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DestinationsService } from './destinations.service';
import { DestinationsController } from './destinations.controller';
import { Destination, DestinationSchema } from './entities/destination.entity';
import { Category, CategorySchema } from '@/categories/entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Destination.name, schema: DestinationSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [DestinationsController],
  providers: [DestinationsService],
  exports: [DestinationsService],
})
export class DestinationsModule {}
