import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mapbox } from './entities/mapbox.entity';
import { MapboxController } from './mapbox.controller';
import { MapboxService } from './mapbox.service';
import { CsvModule } from 'nest-csv-parser';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mapbox]),
    CsvModule,
    MulterModule.register({
      dest: './GIS-Assign-Backend',
    }),
  ],
  providers: [MapboxService],
  controllers: [MapboxController],
})
export class MapboxModule {}
