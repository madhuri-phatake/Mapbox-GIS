import { Point,Polygon } from 'geojson';
// import { Polygon } from 'parse';

export class CreateMapboxDto {
  pk_id?: number;
  lat?: number;
  long?: number;
  City_Name?: string;
  location?:Point;
  //  polygon?: Polygon[][]
}
