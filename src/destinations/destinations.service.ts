import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Destination, DestinationDocument } from './entities/destination.entity';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { Category, CategoryDocument } from '@/categories/entities/category.entity';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectModel(Destination.name) private destinationModel: Model<DestinationDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createDestinationDto: CreateDestinationDto): Promise<Destination> {
    const destinationData: any = { ...createDestinationDto };
    
    if (createDestinationDto.categoryIds) {
      destinationData.categories = createDestinationDto.categoryIds.map(id => new Types.ObjectId(id));
    }

    const destination = new this.destinationModel(destinationData);
    return destination.save();
  }

  async findAll(
    search?: string,
    categoryId?: string,
    limit?: number,
    offset?: number,
  ): Promise<{ data: Destination[]; total: number }> {
    const query: any = { isActive: true };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (categoryId) {
      query.categories = new Types.ObjectId(categoryId);
    }

    const total = await this.destinationModel.countDocuments(query);
    
    let queryBuilder = this.destinationModel
      .find(query)
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

  async findOne(id: string): Promise<Destination> {
    const destination = await this.destinationModel
      .findById(id)
      .populate('categories')
      .exec();

    if (!destination) {
      throw new NotFoundException(`Destination with ID ${id} not found`);
    }

    return destination;
  }

  async update(
    id: string,
    updateDestinationDto: UpdateDestinationDto,
  ): Promise<Destination> {
    const updateData: any = { ...updateDestinationDto };

    if (updateDestinationDto.categoryIds) {
      updateData.categories = updateDestinationDto.categoryIds.map(
        catId => new Types.ObjectId(catId),
      );
    }

    const destination = await this.destinationModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('categories')
      .exec();

    if (!destination) {
      throw new NotFoundException(`Destination with ID ${id} not found`);
    }

    return destination;
  }

  async remove(id: string): Promise<void> {
    const result = await this.destinationModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Destination with ID ${id} not found`);
    }
  }
}
