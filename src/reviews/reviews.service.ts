import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Review, ReviewDocument } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Destination, DestinationDocument } from '@/destinations/entities/destination.entity';
import { Tour, TourDocument } from '@/tours/entities/tour.entity';
import { Hotel, HotelDocument } from '@/hotels/entities/hotel.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @InjectModel(Destination.name) private destinationModel: Model<DestinationDocument>,
    @InjectModel(Tour.name) private tourModel: Model<TourDocument>,
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
  ) {}

  async create(userId: string, createReviewDto: CreateReviewDto): Promise<Review> {
    const { destinationId, tourId, hotelId } = createReviewDto;

    if (!destinationId && !tourId && !hotelId) {
      throw new BadRequestException('At least one of destinationId, tourId, or hotelId is required');
    }

    // Check if user already reviewed this item
    const existingQuery: any = { userId: new Types.ObjectId(userId) };
    if (destinationId) existingQuery.destinationId = new Types.ObjectId(destinationId);
    if (tourId) existingQuery.tourId = new Types.ObjectId(tourId);
    if (hotelId) existingQuery.hotelId = new Types.ObjectId(hotelId);

    const existingReview = await this.reviewModel.findOne(existingQuery).exec();

    if (existingReview) {
      throw new BadRequestException('You have already reviewed this item');
    }

    // Verify the item exists
    if (destinationId) {
      const destination = await this.destinationModel.findById(destinationId).exec();
      if (!destination) {
        throw new NotFoundException('Destination not found');
      }
    }

    if (tourId) {
      const tour = await this.tourModel.findById(tourId).exec();
      if (!tour) {
        throw new NotFoundException('Tour not found');
      }
    }

    if (hotelId) {
      const hotel = await this.hotelModel.findById(hotelId).exec();
      if (!hotel) {
        throw new NotFoundException('Hotel not found');
      }
    }

    const review = new this.reviewModel({
      ...createReviewDto,
      userId: new Types.ObjectId(userId),
      destinationId: destinationId ? new Types.ObjectId(destinationId) : undefined,
      tourId: tourId ? new Types.ObjectId(tourId) : undefined,
      hotelId: hotelId ? new Types.ObjectId(hotelId) : undefined,
    });

    const savedReview = await review.save();
    await this.updateRatings(destinationId, tourId, hotelId);

    return savedReview;
  }

  async findAll(
    destinationId?: string,
    tourId?: string,
    hotelId?: string,
    limit?: number,
    offset?: number,
  ): Promise<{ data: Review[]; total: number }> {
    const query: any = {};

    if (destinationId) {
      query.destinationId = new Types.ObjectId(destinationId);
    }

    if (tourId) {
      query.tourId = new Types.ObjectId(tourId);
    }

    if (hotelId) {
      query.hotelId = new Types.ObjectId(hotelId);
    }

    const total = await this.reviewModel.countDocuments(query);

    let queryBuilder = this.reviewModel
      .find(query)
      .populate('userId')
      .sort({ createdAt: -1 });

    if (limit) {
      queryBuilder = queryBuilder.limit(limit);
    }
    if (offset) {
      queryBuilder = queryBuilder.skip(offset);
    }

    const data = await queryBuilder.exec();

    return { data, total };
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewModel
      .findById(id)
      .populate('userId')
      .exec();

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return review;
  }

  async update(id: string, userId: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.reviewModel
      .findOneAndUpdate(
        { _id: new Types.ObjectId(id), userId: new Types.ObjectId(userId) },
        updateReviewDto,
        { new: true },
      )
      .exec();

    if (!review) {
      throw new NotFoundException('Review not found or you do not have permission to update it');
    }

    await this.updateRatings(
      review.destinationId?.toString(),
      review.tourId?.toString(),
      review.hotelId?.toString(),
    );

    return review;
  }

  async remove(id: string, userId: string): Promise<void> {
    const review = await this.reviewModel
      .findOne({ _id: new Types.ObjectId(id), userId: new Types.ObjectId(userId) })
      .exec();

    if (!review) {
      throw new NotFoundException('Review not found or you do not have permission to delete it');
    }

    const { destinationId, tourId, hotelId } = review;
    await this.reviewModel.findByIdAndDelete(id).exec();
    await this.updateRatings(
      destinationId?.toString(),
      tourId?.toString(),
      hotelId?.toString(),
    );
  }

  private async updateRatings(
    destinationId?: string,
    tourId?: string,
    hotelId?: string,
  ): Promise<void> {
    if (destinationId) {
      const result = await this.reviewModel.aggregate([
        { $match: { destinationId: new Types.ObjectId(destinationId) } },
        {
          $group: {
            _id: null,
            avg: { $avg: '$rating' },
            count: { $sum: 1 },
          },
        },
      ]);

      const avg = result[0]?.avg || 0;
      const count = result[0]?.count || 0;

      await this.destinationModel.findByIdAndUpdate(destinationId, {
        rating: parseFloat(avg.toFixed(2)),
        reviewCount: count,
      }).exec();
    }

    if (tourId) {
      const result = await this.reviewModel.aggregate([
        { $match: { tourId: new Types.ObjectId(tourId) } },
        {
          $group: {
            _id: null,
            avg: { $avg: '$rating' },
            count: { $sum: 1 },
          },
        },
      ]);

      const avg = result[0]?.avg || 0;
      const count = result[0]?.count || 0;

      await this.tourModel.findByIdAndUpdate(tourId, {
        rating: parseFloat(avg.toFixed(2)),
        reviewCount: count,
      }).exec();
    }

    if (hotelId) {
      const result = await this.reviewModel.aggregate([
        { $match: { hotelId: new Types.ObjectId(hotelId) } },
        {
          $group: {
            _id: null,
            avg: { $avg: '$rating' },
            count: { $sum: 1 },
          },
        },
      ]);

      const avg = result[0]?.avg || 0;
      const count = result[0]?.count || 0;

      await this.hotelModel.findByIdAndUpdate(hotelId, {
        rating: parseFloat(avg.toFixed(2)),
        reviewCount: count,
      }).exec();
    }
  }
}
