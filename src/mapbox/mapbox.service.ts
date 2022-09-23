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

// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { QueryRunner, Repository } from 'typeorm';
// import { Mapbox } from './entities/mapbox.entity';
// import { Point } from 'geojson';

// @Injectable()
// export class MapboxService {
//   constructor(
//     @InjectRepository(Mapbox) private readonly repo: Repository<Mapbox>,
//   ) {}

//   getAll(): Promise<Mapbox[]> {
//     return this.repo.find();
//   }

//   create(adde): Promise<Mapbox> {
//     return this.repo.save(adde);
//   }

// public async create(location:Mapbox){
//   const pointObject :Point= {
//     type: "Point",
//     coordinates: [location.long,location.lat]
// };
// location.location = pointObject;
// return await this.repo.save(location)
// }
// public async create(location:Mapbox){
//   const pointObject :Point= {
//     type: "Point",
//     coordinates: [location.long,location.lat]
// };
// location.location = pointObject;
// return await this.repo.save(location)
// }

// public async getRange(lat:number,long:number,range:number = 1000) {
//   let origin = {
//     type: "Point",
//     coordinates: [long, lat]
//   };
//  let  locations = await this.repo
//       .createQueryBuilder('t_test_location')
//       .select(['t_test_location.city AS city','ST_Distance(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)))/1000 AS distance' ])
//       .where("ST_DWithin(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)) ,:range)")
//       .orderBy("distance","ASC")
//       .setParameters({
//          // stringify GeoJSON
//         origin: JSON.stringify(origin),
//         range:range*1000 //KM conversion
//       })
//      .getRawMany();
//   return locations;
// }
//}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mapbox } from './entities/mapbox.entity';
import { CreateMapboxDto } from './dto/create-mapbox.dto';
import { Polygon } from 'parse';

@Injectable()
export class MapboxService {
  constructor(
    @InjectRepository(Mapbox)
    private readonly MapRepository: Repository<Mapbox>,
  ) {}
  create(createMapboxDto: CreateMapboxDto) {
    return this.MapRepository.save(createMapboxDto);
  }

  findAll(): Promise<Mapbox[]> {
    return this.MapRepository.find();
  }
  addLocation() {}

  //   async createParcelPoint(createParcelPointDto: CreateMapboxDto): Promise<Mapbox> {
  //     const { polygon } = createParcelPointDto

  //     const polygon: Polygon = {
  //       type:'Polygon',
  //         coordinates: Polygon
  //     }

  //     const parcel = this.MapRepository.create({
  //         polygon,
  //     })

  //     await this.MapRepository.save(parcel)
  //     return parcel
  // }
}
