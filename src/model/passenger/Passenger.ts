import {PClass} from "./PClass";

export class Passenger {
  id: number;
  survived: boolean;
  pClass: PClass;
  name: string;
  sex: string;
  age: number;
  siblingsSpouses: number;
  parentsChildren: number;
  fare: number;

  constructor(id: number, survived: boolean, pClass: PClass, name: string, sex: string, age: number, siblingsSpouses: number, parentsChildren: number, fare: number) {
    this.id = id;
    this.survived = survived;
    this.pClass = pClass;
    this.name = name;
    this.sex = sex;
    this.age = age;
    this.siblingsSpouses = siblingsSpouses;
    this.parentsChildren = parentsChildren;
    this.fare = fare;
  }
}
