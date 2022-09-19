// import { Injectable } from '@nestjs/common';
// import { CreateMapboxDto } from './dto/create-mapbox.dto';
// import { UpdateMapboxDto } from './dto/update-mapbox.dto';

// @Injectable()
// export class MapboxService {
//   create(createMapboxDto: CreateMapboxDto) {
//     return 'This action adds a new mapbox';
//   }

//   findAll() {
//     return `This action returns all mapbox`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} mapbox`;
//   }

//   update(id: number, updateMapboxDto: UpdateMapboxDto) {
//     return `This action updates a #${id} mapbox`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} mapbox`;
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mapbox } from './entities/mapbox.entity';
import {  Point } from 'geojson';


@Injectable()
export class MapboxService {
  constructor(
    @InjectRepository(Mapbox) private readonly repo: Repository<Mapbox>,
  ) {}

 getAll():Promise<Mapbox[]> {
    return  this.repo.find();
  }

  public async create(location:Mapbox){
    const pointObject :Point= {
      type: "Point",
      coordinates: [location.long,location.lat]
  };
  location.location = pointObject;
  return await this.repo.save(location)
  }
}
