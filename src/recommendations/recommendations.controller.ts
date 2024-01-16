import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MovieResponseDto } from './dto/movie-response.dto';
import { ShowResponseDto } from './dto/show-response.dto';
import { RecommendationsService } from './recommendations.service';

@Controller('recommendations')
@ApiTags('recommendations')
@ApiInternalServerErrorResponse({
  description: 'There was an error processing this request.',
})
@ApiBadRequestResponse({
  description: 'Bad request.',
})
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Get('movies')
  @ApiOkResponse({
    description: 'Movies fetched successfully.',
    type: [MovieResponseDto],
  })
  @ApiOperation({
    summary: 'Returns recommended movies',
    description:
      'Returns recommended movies depending on the provided movie ids.',
  })
  getMovieRecommendations(
    @Query('movieIds') movieIds: number[],
  ): Promise<MovieResponseDto[]> {
    return this.recommendationsService.getMovieRecommendations(movieIds);
  }

  @Get('shows')
  @ApiOkResponse({
    description: 'Shows fetched successfully.',
    type: [ShowResponseDto],
  })
  @ApiOperation({
    summary: 'Returns recommended shows',
    description:
      'Returns recommended shows depending on the provided show ids.',
  })
  getShowRecommendations(
    @Query('showIds') showIds: number[],
  ): Promise<ShowResponseDto[]> {
    return this.recommendationsService.getShowRecommendations(showIds);
  }
}
