import Entity from './entity'
export default class Key extends Entity<number>{
    userName:string;
    key:string;
    region:string;
    remarks:string;
    usageTime:number;
}