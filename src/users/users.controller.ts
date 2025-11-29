import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  UseGuards,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@CurrentUser() user: User) {
    const { password, ...profile } = await this.usersService.findOne(user.id);
    return profile;
  }

  @Put('profile')
  async updateProfile(
    @CurrentUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updated = await this.usersService.update(user.id, updateUserDto);
    const { password, ...profile } = updated;
    return profile;
  }

  @Put('change-password')
  async changePassword(
    @CurrentUser() user: User,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const currentUser = await this.usersService.findOne(user.id);
    const isPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      currentUser.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Current password is incorrect', HttpStatus.UNAUTHORIZED);
    }

    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
    await this.usersService.update(user.id, { password: hashedPassword } as any);

    return { message: 'Password changed successfully' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    const { password, ...profile } = user;
    return profile;
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}

