import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Hotel, HotelDocument } from './entities/hotel.entity';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Destination, DestinationDocument } from '@/destinations/entities/destination.entity';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
    @InjectModel(Destination.name) private destinationModel: Model<DestinationDocument>,
  ) {}

  async create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    const destination = await this.destinationModel.findById(createHotelDto.destinationId).exec();

    if (!destination) {
      throw new NotFoundException('Destination not found');
    }

    const hotel = new this.hotelModel({
      ...createHotelDto,
      destinationId: new Types.ObjectId(createHotelDto.destinationId),
    });

    return hotel.save();
  }

  async findAll(
    search?: string,
    destinationId?: string,
    limit?: number,
    offset?: number,
  ): Promise<{ data: Hotel[]; total: number }> {
    const query: any = { isActive: true };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } },
      ];
    }

    if (destinationId) {
      query.destinationId = new Types.ObjectId(destinationId);
    }

    const total = await this.hotelModel.countDocuments(query);

    let queryBuilder = this.hotelModel
      .find(query)
      .populate('destinationId');

    if (limit) {
      queryBuilder = queryBuilder.limit(limit);
    }
    if (offset) {
      queryBuilder = queryBuilder.skip(offset);
    }

    const data = await queryBuilder.exec();

    return { data, total };
  }

  async findOne(id: string): Promise<Hotel> {
    const hotel = await this.hotelModel
      .findById(id)
      .populate('destinationId')
      .exec();

    if (!hotel) {
      throw new NotFoundException(`Hotel with ID ${id} not found`);
    }

    return hotel;
  }

  async update(id: string, updateHotelDto: UpdateHotelDto): Promise<Hotel> {
    const updateData: any = { ...updateHotelDto };

    if (updateHotelDto.destinationId) {
      const destination = await this.destinationModel.findById(updateHotelDto.destinationId).exec();
      if (!destination) {
        throw new NotFoundException('Destination not found');
      }
      updateData.destinationId = new Types.ObjectId(updateHotelDto.destinationId);
    }

    const hotel = await this.hotelModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('destinationId')
      .exec();

    if (!hotel) {
      throw new NotFoundException(`Hotel with ID ${id} not found`);
    }

    return hotel;
  }

  async remove(id: string): Promise<void> {
    const result = await this.hotelModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Hotel with ID ${id} not found`);
    }
  }
}
