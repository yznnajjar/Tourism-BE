import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Destination, DestinationDocument } from '@/destinations/entities/destination.entity';
import { Tour, TourDocument } from '@/tours/entities/tour.entity';
import { Hotel, HotelDocument } from '@/hotels/entities/hotel.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Destination.name) private destinationModel: Model<DestinationDocument>,
    @InjectModel(Tour.name) private tourModel: Model<TourDocument>,
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
  ) {}

  async searchAll(query: string, limit: number = 10) {
    const searchRegex = { $regex: query, $options: 'i' };

    const [destinations, tours, hotels] = await Promise.all([
      this.destinationModel
        .find({
          isActive: true,
          $or: [
            { name: searchRegex },
            { location: searchRegex },
            { description: searchRegex },
          ],
        })
        .populate('categories')
        .limit(limit)
        .exec(),

      this.tourModel
        .find({
          isActive: true,
          $or: [
            { name: searchRegex },
            { description: searchRegex },
          ],
        })
        .populate('destinationId')
        .populate('categories')
        .limit(limit)
        .exec(),

      this.hotelModel
        .find({
          isActive: true,
          $or: [
            { name: searchRegex },
            { description: searchRegex },
            { address: searchRegex },
          ],
        })
        .populate('destinationId')
        .limit(limit)
        .exec(),
    ]);

    return {
      destinations,
      tours,
      hotels,
      total: destinations.length + tours.length + hotels.length,
    };
  }
}
