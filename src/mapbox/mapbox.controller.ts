// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { MapboxService } from './mapbox.service';
// import { UpdateMapboxDto } from './dto/update-mapbox.dto';
// import { CreateMapboxDto } from './dto/create-mapbox.dto';

// @Controller('mapbox')
// export class MapboxController {
//   constructor(private readonly mapboxService: MapboxService) {}

//   @Post()
//   create(@Body() createMapboxDto: CreateMapboxDto) {
//     return this.mapboxService.create(createMapboxDto);
//   }

//   @Get()
//   findAll() {
//     return this.mapboxService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.mapboxService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateMapboxDto: UpdateMapboxDto) {
//     return this.mapboxService.update(+id, updateMapboxDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.mapboxService.remove(+id);
//   }
// }


import { Body, Controller, Get, Post } from '@nestjs/common';
import { Mapbox } from './entities/mapbox.entity';
import { MapboxService } from './mapbox.service';

@Controller('location')
export class MapboxController {
  constructor(private readonly serv: MapboxService) {}

  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }
  @Post()
  createLocation(@Body() location : Mapbox): void{
    this.serv.create(location);
  }
}