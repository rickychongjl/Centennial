export class ShearerItem {
    public shearerLocation: number;
    public dateObject: Date;
    public remainingOutageDuration: number;
    public globalIndex: number;

    constructor(shearerLocation: number, globalIndex: number) {
        this.shearerLocation = shearerLocation;
        this.dateObject = new Date();
        this.globalIndex = globalIndex;
    }
}