import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { User } from '@/users/entities/user.entity';
import { FavoriteType } from './entities/favorite.entity';

@ApiTags('Favorites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @ApiOperation({ summary: 'Add item to favorites' })
  @ApiResponse({ status: 201, description: 'Item added to favorites successfully' })
  async create(
    @CurrentUser() user: User,
    @Body() createFavoriteDto: CreateFavoriteDto,
  ) {
    return this.favoritesService.create(user.id, createFavoriteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all favorites for current user' })
  @ApiQuery({ name: 'type', required: false, enum: FavoriteType })
  @ApiResponse({ status: 200, description: 'Favorites retrieved successfully' })
  async findAll(
    @CurrentUser() user: User,
    @Query('type') type?: FavoriteType,
  ) {
    return this.favoritesService.findAll(user.id, type);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove favorite by ID' })
  @ApiResponse({ status: 200, description: 'Favorite removed successfully' })
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.favoritesService.remove(user.id, id);
  }

  @Delete('item/:type/:itemId')
  @ApiOperation({ summary: 'Remove favorite by item' })
  @ApiResponse({ status: 200, description: 'Favorite removed successfully' })
  async removeByItem(
    @Param('type') type: FavoriteType,
    @Param('itemId') itemId: string,
    @CurrentUser() user: User,
  ) {
    return this.favoritesService.removeByItem(user.id, type, itemId);
  }
}

