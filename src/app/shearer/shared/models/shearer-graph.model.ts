export class ShearerGraph {
    public location: number;
    public time: string;
    public stale: boolean;
    public dateObject: Date;
    public staleLocation: number;
    public globalIndex: number;
    constructor(shearerLocation: number, dateObject: Date, time: string, stale: boolean, globalIndex: number) {
        this.location = shearerLocation;
        this.time = time;
        this.dateObject = dateObject;
        this.stale = stale;
        this.staleLocation = null;
        this.globalIndex = globalIndex;
    }
}