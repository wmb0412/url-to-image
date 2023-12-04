import { Injectable } from '@nestjs/common';
import { CreateExporterDto, ExportPageDto, ViewPort } from './dto/exporter.dto';
import puppeteer from 'puppeteer';
import { SERVE_STATIC_DIR } from 'src/common/constant/dirName.constant';
import { ImageService } from 'src/common/service/image.service';

@Injectable()
export class ExporterService {
  constructor(private readonly imageService: ImageService) {}
  getPageViewPort(viewPort: ViewPort) {
    return {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2,
      ...viewPort,
    };
  }
  async exportPage(exportPageDto: ExportPageDto) {
    const { url, delay } = exportPageDto;
    const browser = await puppeteer.launch({
      headless: 'new',
      slowMo: 25,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url);
    await new Promise((resolve) => setTimeout(resolve, delay));
    await page.setViewport(this.getPageViewPort(exportPageDto));
    const path = `${SERVE_STATIC_DIR}/${new Date().getTime()}.png`;
    await page.screenshot({
      path,
      fullPage: true,
    });
    await browser.close();
    const base64 = await this.imageService.getImageBase64(path);
    this.imageService.deleteImage(path);
    return base64;
  }
}
