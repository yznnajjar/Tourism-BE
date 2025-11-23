import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Favorite, FavoriteType, FavoriteDocument } from './entities/favorite.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Destination, DestinationDocument } from '@/destinations/entities/destination.entity';
import { Tour, TourDocument } from '@/tours/entities/tour.entity';
import { Hotel, HotelDocument } from '@/hotels/entities/hotel.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
    @InjectModel(Destination.name) private destinationModel: Model<DestinationDocument>,
    @InjectModel(Tour.name) private tourModel: Model<TourDocument>,
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
  ) {}

  async create(userId: string, createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    const { type, destinationId, tourId, hotelId } = createFavoriteDto;

    // Verify the item exists
    if (type === FavoriteType.DESTINATION) {
      if (!destinationId) {
        throw new BadRequestException('Destination ID is required');
      }
      const destination = await this.destinationModel.findById(destinationId).exec();
      if (!destination) {
        throw new NotFoundException('Destination not found');
      }
    } else if (type === FavoriteType.TOUR) {
      if (!tourId) {
        throw new BadRequestException('Tour ID is required');
      }
      const tour = await this.tourModel.findById(tourId).exec();
      if (!tour) {
        throw new NotFoundException('Tour not found');
      }
    } else if (type === FavoriteType.HOTEL) {
      if (!hotelId) {
        throw new BadRequestException('Hotel ID is required');
      }
      const hotel = await this.hotelModel.findById(hotelId).exec();
      if (!hotel) {
        throw new NotFoundException('Hotel not found');
      }
    }

    // Check if already favorited
    const existingQuery: any = {
      userId: new Types.ObjectId(userId),
      type,
    };
    if (destinationId) existingQuery.destinationId = new Types.ObjectId(destinationId);
    if (tourId) existingQuery.tourId = new Types.ObjectId(tourId);
    if (hotelId) existingQuery.hotelId = new Types.ObjectId(hotelId);

    const existing = await this.favoriteModel.findOne(existingQuery).exec();

    if (existing) {
      throw new BadRequestException('Item is already in favorites');
    }

    const favorite = new this.favoriteModel({
      ...createFavoriteDto,
      userId: new Types.ObjectId(userId),
      destinationId: destinationId ? new Types.ObjectId(destinationId) : undefined,
      tourId: tourId ? new Types.ObjectId(tourId) : undefined,
      hotelId: hotelId ? new Types.ObjectId(hotelId) : undefined,
    });

    return favorite.save();
  }

  async findAll(userId: string, type?: FavoriteType): Promise<Favorite[]> {
    const query: any = { userId: new Types.ObjectId(userId) };
    if (type) {
      query.type = type;
    }

    return this.favoriteModel
      .find(query)
      .populate('destinationId')
      .populate('tourId')
      .populate('hotelId')
      .sort({ createdAt: -1 })
      .exec();
  }

  async remove(userId: string, id: string): Promise<void> {
    const favorite = await this.favoriteModel
      .findOne({ _id: new Types.ObjectId(id), userId: new Types.ObjectId(userId) })
      .exec();

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    await this.favoriteModel.findByIdAndDelete(id).exec();
  }

  async removeByItem(
    userId: string,
    type: FavoriteType,
    itemId: string,
  ): Promise<void> {
    const where: any = {
      userId: new Types.ObjectId(userId),
      type,
    };
    if (type === FavoriteType.DESTINATION) {
      where.destinationId = new Types.ObjectId(itemId);
    } else if (type === FavoriteType.TOUR) {
      where.tourId = new Types.ObjectId(itemId);
    } else if (type === FavoriteType.HOTEL) {
      where.hotelId = new Types.ObjectId(itemId);
    }

    const favorite = await this.favoriteModel.findOne(where).exec();

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    await this.favoriteModel.findByIdAndDelete(favorite._id).exec();
  }
}
