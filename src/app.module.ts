import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExporterModule } from './module/exporter/exporter.module';
import { APP_PIPE } from '@nestjs/core';
import { validatePipe } from './pipe/validate.pipe';
import { SERVE_STATIC_DIR } from './common/constant/dirName.constant';

const UPLOADS_DIR = join(__dirname, '..', SERVE_STATIC_DIR);
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: UPLOADS_DIR,
      serveRoot: `/${SERVE_STATIC_DIR}/`,
    }),
    ExporterModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: validatePipe,
    },
  ],
})
export class AppModule {}
