import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Point ,Polygon} from 'geojson';

@Entity()
export class Mapbox {
  @PrimaryGeneratedColumn()
  pk_id: number;

  @Column({ type: 'double precision', name: 'd_lat' })
  lat: number;

  @Column({ type: 'double precision', name: 'd_long' })
  long: number;

  @Column()
  City_Name: string;


@Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point', 
    srid: 4326,
    nullable: true,
  })
  location:Point;


  // @Index({ spatial: true })
  // @Column({
  //     type: 'geography',
  //     spatialFeatureType: 'Polygon',
  //     srid:4326,
  //     nullable: true
  // })
  // polygon: Polygon;
}
