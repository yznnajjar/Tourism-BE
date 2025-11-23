import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Tour, TourDocument } from './entities/tour.entity';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { Destination, DestinationDocument } from '@/destinations/entities/destination.entity';
import { Category, CategoryDocument } from '@/categories/entities/category.entity';

@Injectable()
export class ToursService {
  constructor(
    @InjectModel(Tour.name) private tourModel: Model<TourDocument>,
    @InjectModel(Destination.name) private destinationModel: Model<DestinationDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createTourDto: CreateTourDto): Promise<Tour> {
    const destination = await this.destinationModel.findById(createTourDto.destinationId).exec();

    if (!destination) {
      throw new NotFoundException('Destination not found');
    }

    const tourData: any = {
      ...createTourDto,
      destinationId: new Types.ObjectId(createTourDto.destinationId),
    };

    if (createTourDto.categoryIds) {
      tourData.categories = createTourDto.categoryIds.map(id => new Types.ObjectId(id));
    }

    const tour = new this.tourModel(tourData);
    return tour.save();
  }

  async findAll(
    search?: string,
    destinationId?: string,
    categoryId?: string,
    limit?: number,
    offset?: number,
  ): Promise<{ data: Tour[]; total: number }> {
    const query: any = { isActive: true };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (destinationId) {
      query.destinationId = new Types.ObjectId(destinationId);
    }

    if (categoryId) {
      query.categories = new Types.ObjectId(categoryId);
    }

    const total = await this.tourModel.countDocuments(query);

    let queryBuilder = this.tourModel
      .find(query)
      .populate('destinationId')
      .populate('categories');

    if (limit) {
      queryBuilder = queryBuilder.limit(limit);
    }
    if (offset) {
      queryBuilder = queryBuilder.skip(offset);
    }

    const data = await queryBuilder.exec();

    return { data, total };
  }

  async findOne(id: string): Promise<Tour> {
    const tour = await this.tourModel
      .findById(id)
      .populate('destinationId')
      .populate('categories')
      .exec();

    if (!tour) {
      throw new NotFoundException(`Tour with ID ${id} not found`);
    }

    return tour;
  }

  async update(id: string, updateTourDto: UpdateTourDto): Promise<Tour> {
    const updateData: any = { ...updateTourDto };

    if (updateTourDto.destinationId) {
      const destination = await this.destinationModel.findById(updateTourDto.destinationId).exec();
      if (!destination) {
        throw new NotFoundException('Destination not found');
      }
      updateData.destinationId = new Types.ObjectId(updateTourDto.destinationId);
    }

    if (updateTourDto.categoryIds) {
      updateData.categories = updateTourDto.categoryIds.map(id => new Types.ObjectId(id));
    }

    const tour = await this.tourModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('destinationId')
      .populate('categories')
      .exec();

    if (!tour) {
      throw new NotFoundException(`Tour with ID ${id} not found`);
    }

    return tour;
  }

  async remove(id: string): Promise<void> {
    const result = await this.tourModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Tour with ID ${id} not found`);
    }
  }
}
