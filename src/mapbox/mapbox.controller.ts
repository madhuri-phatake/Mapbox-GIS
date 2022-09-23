import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
  Res,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { createReadStream, readFileSync } from 'fs';
import type { Response } from 'express';
import { parse } from 'papaparse';
import { MapboxService } from './mapbox.service';
import { Point } from 'geojson';
import { CreateMapboxDto } from './dto/create-mapbox.dto';
import { Mapbox } from './entities/mapbox.entity';

@Controller('location')
export class MapboxController {
  constructor(private readonly mapService: MapboxService) {}
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './mapbox',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = extname(file.originalname);
          const filename = `${uniqueSuffix}${fileExtName}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(csv)$/)) {
          return callback(new Error('Only CSV files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const csvFile = readFileSync(`mapbox/${file.originalname}`);
    const csvData = csvFile.toString();
    const parsedCsv = await parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data,
    });
    console.log(parsedCsv.data[0]);

    parsedCsv.data.forEach((element) => {
      var point: Point = {
        type: 'Point',
        coordinates: [element.lat, element.long],
      };
      const loadData = {
        // pk_id: element.pk_id,
        lat: element.lat,
        long: element.long,
        City_Name: element.city_name,
        location: point,
      };
      console.log(loadData);
      this.mapService.create(loadData);
      const response = {
        message: 'File uploaded successfully!',
        data: {
          originalname: file.originalname,
          // filename: file.filename,
        },
      };
      return response;
    });
  }
  // @Post('file')
  //   @UseInterceptors(
  //     FileInterceptor('file_asset', {
  //       storage: diskStorage({
  //         destination: './mapbox',
  //       })
  //     })
  //   )
  //   async uploadFile() {
  //     const csvFile = readFileSync('mapbox/1(1).csv')
  //     const csvData = csvFile.toString()
  //     const parsedCsv = await parse(csvData, {
  //       header: true,
  //       skipEmptyLines: true,
  //       transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
  //       complete: (results) => results.data,
  //     });
  //     console.log(parsedCsv)
  //     //console.log(typeof (parsedCsv.data.id))
  //   }
  @Get()
  findAll() {
    return this.mapService.findAll();
  }
  getFile() {
    const file = createReadStream(join(process.cwd(), './mapbox/1(1).csv'));
    console.log(file);
  }

  // @Post('/polygon')
  //    async createParcelPoint(
  //        @Body()
  //        createParcelPointDto: CreateMapboxDto
  //    ): Promise<Mapbox> {
  //        return this.mapService.createParcelPoint(createParcelPointDto)
  //    }
}
