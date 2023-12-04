import { Module } from '@nestjs/common';
import { ExporterService } from './exporter.service';
import { ExporterController } from './exporter.controller';
import { ImageService } from 'src/common/service/image.service';

@Module({
  controllers: [ExporterController],
  providers: [ExporterService, ImageService],
})
export class ExporterModule {}
