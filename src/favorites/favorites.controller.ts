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
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { User } from '@/users/entities/user.entity';
import { FavoriteType } from './entities/favorite.entity';

@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createFavoriteDto: CreateFavoriteDto,
  ) {
    return this.favoritesService.create(user.id, createFavoriteDto);
  }

  @Get()
  async findAll(
    @CurrentUser() user: User,
    @Query('type') type?: FavoriteType,
  ) {
    return this.favoritesService.findAll(user.id, type);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.favoritesService.remove(user.id, id);
  }

  @Delete('item/:type/:itemId')
  async removeByItem(
    @Param('type') type: FavoriteType,
    @Param('itemId') itemId: string,
    @CurrentUser() user: User,
  ) {
    return this.favoritesService.removeByItem(user.id, type, itemId);
  }
}

