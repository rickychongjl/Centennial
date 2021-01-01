import { ShearerItem } from "./shearer-item.model";

export class ShearerGraph {
    public position: number;
    public time: string;
    public stale: boolean;
    public dateObject: Date;
    public stalePosition: number;

    constructor(shearerLocation: number, dateObject: Date, time: string, stale: boolean){
        this.position = shearerLocation;
        this.time = time;
        this.dateObject = dateObject;
        this.stale = stale;
        this.stalePosition = null;
    }
}
