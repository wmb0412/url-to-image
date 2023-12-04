import {
  IsNotEmpty,
  IsNumber,
  IsString,
  isString,
  IsInt,
  IsOptional,
} from 'class-validator';
export class ViewPort {
  width = 1920;
  height = 1080;
}
export class CreateExporterDto extends ViewPort {
  url: string;
  token: string;
}

export class ExportPageDto extends ViewPort {
  url: string;
  @IsNumber()
  delay: number;
}
