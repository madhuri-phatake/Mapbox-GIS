import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Point } from 'geojson';

@Entity()
export class Mapbox {
  @PrimaryGeneratedColumn('increment')
  pk_id: number;

  @Column()
  lat: number;

  @Column()
  long: number;

  @Column()
  City_Name:string;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: Point;
}
