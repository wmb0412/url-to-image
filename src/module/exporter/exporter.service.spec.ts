import { Test, TestingModule } from '@nestjs/testing';
import { ExporterService } from './exporter.service';

describe('ExporterService', () => {
  let service: ExporterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExporterService],
    }).compile();

    service = module.get<ExporterService>(ExporterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
