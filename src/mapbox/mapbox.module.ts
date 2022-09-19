import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mapbox } from './entities/mapbox.entity';
import { MapboxController } from './mapbox.controller';
import { MapboxService } from './mapbox.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mapbox])],
  providers: [MapboxService],
  controllers: [MapboxController],
})
export class MapboxModule {}