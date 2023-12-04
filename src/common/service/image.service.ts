import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class ImageService {
  async getImageBase64(imagePath: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      // 读取图像文件
      fs.readFile(imagePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          // 将图像数据转换为Base64编码
          const base64Data = Buffer.from(data).toString('base64');
          const base64Image = `data:image/png;base64,${base64Data}`;
          resolve(base64Image);
        }
      });
    });
  }
  async deleteImage(imagePath: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // 删除图片文件
      fs.unlink(imagePath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
