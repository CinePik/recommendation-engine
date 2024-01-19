import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { HttpLoggerMiddleware } from './http-logger/http-logger.middleware';
import { MetricsModule } from './metrics/metrics.module';
import { RecommendationsModule } from './recommendations/recommendations.module';

@Module({
  imports: [
    RecommendationsModule,
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      isGlobal: true,
    }),
    HealthModule,
    MetricsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
