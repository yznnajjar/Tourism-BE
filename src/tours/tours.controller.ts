import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { Public } from '@/common/decorators/public.decorator';

@ApiTags('Tours')
@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new tour' })
  @ApiResponse({ status: 201, description: 'Tour created successfully' })
  async create(@Body() createTourDto: CreateTourDto) {
    return this.toursService.create(createTourDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all tours' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'destinationId', required: false })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Tours retrieved successfully' })
  async findAll(
    @Query('search') search?: string,
    @Query('destinationId') destinationId?: string,
    @Query('categoryId') categoryId?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.toursService.findAll(search, destinationId, categoryId, limit, offset);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get tour by ID' })
  @ApiResponse({ status: 200, description: 'Tour retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Tour not found' })
  async findOne(@Param('id') id: string) {
    return this.toursService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update tour' })
  @ApiResponse({ status: 200, description: 'Tour updated successfully' })
  async update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.toursService.update(id, updateTourDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete tour' })
  @ApiResponse({ status: 200, description: 'Tour deleted successfully' })
  async remove(@Param('id') id: string) {
    return this.toursService.remove(id);
  }
}

