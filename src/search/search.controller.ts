import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { Public } from '@/common/decorators/public.decorator';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Public()
  @Get()
  async search(
    @Query('q') query: string,
    @Query('limit') limit?: number,
  ) {
    if (!query) {
      return {
        destinations: [],
        tours: [],
        hotels: [],
        total: 0,
      };
    }

    return this.searchService.searchAll(query, limit);
  }
}

