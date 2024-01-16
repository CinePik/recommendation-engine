import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { MovieResponseDto } from './dto/movie-response.dto';
import { ShowResponseDto } from './dto/show-response.dto';

@Injectable()
export class RecommendationsService {
  private readonly logger = new Logger(RecommendationsService.name);
  private apiKey;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = this.configService.get('WATCH_THIS_RAPID_API_KEY');
  }

  async getMovieRecommendations(
    movieIds: number[],
  ): Promise<MovieResponseDto[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<any>('https://watchthis.p.rapidapi.com/api/v1/movie', {
          headers: {
            'X-RapidAPI-Key': this.apiKey,
            'X-RapidAPI-Host': 'watchthis.p.rapidapi.com',
          },
          params: { ids: movieIds.toString() },
        })
        .pipe(
          catchError((error: AxiosError) => {
            const message = error.response.data;
            const status = error.response.status;

            this.logger.warn(
              `Get movie recommendations failed with status ${status}`,
              message,
            );
            throw new HttpException(message, status);
          }),
        ),
    );

    let movies: Array<MovieResponseDto> = [];
    for (const movie of data.related) {
      movies.push({
        id: movie.tmdb_id,
        title: movie.title,
        backdrop_path: movie.tmdb_backdrop_path,
        genres: movie.genres,
        original_title: movie.original_title,
        overview: movie.overview,
        poster_path: movie.tmdb_poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        match_score: movie.match_score,
      });
    }

    return movies;
  }

  async getShowRecommendations(showIds: number[]): Promise<ShowResponseDto[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<any>('https://watchthis.p.rapidapi.com/api/v1/tv', {
          headers: {
            'X-RapidAPI-Key': this.apiKey,
            'X-RapidAPI-Host': 'watchthis.p.rapidapi.com',
          },
          params: { ids: showIds.toString() },
        })
        .pipe(
          catchError((error: AxiosError) => {
            const message = error.response.data;
            const status = error.response.status;

            this.logger.warn(
              `Get Show recommendations failed with status ${status}`,
              message,
            );
            throw new HttpException(message, status);
          }),
        ),
    );

    let shows: Array<ShowResponseDto> = [];
    for (const show of data.related) {
      shows.push({
        id: show.tmdb_id,
        title: show.name,
        backdrop_path: show.tmdb_backdrop_path,
        original_title: show.original_title,
        poster_path: show.tmdb_poster_path,
        first_aired: show.first_air_date,
        vote_average: show.vote_average,
        match_score: show.match_score,
      });
    }

    return shows;
  }
}
