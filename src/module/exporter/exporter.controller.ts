import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExporterService } from './exporter.service';
import { CreateExporterDto, ExportPageDto } from './dto/exporter.dto';

@Controller('exporter')
export class ExporterController {
  constructor(private readonly exporterService: ExporterService) {}
  @Post('page')
  exportPage(@Body() exportPageDto: ExportPageDto) {
    return this.exporterService.exportPage(exportPageDto);
  }

  @Get()
  findAll() {
    return '123';
  }
}
