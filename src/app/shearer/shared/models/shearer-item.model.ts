export class ShearerItem {
    public shearerLocation: number;
    public dateObject: Date;

    constructor(shearerLocation: number){
        this.shearerLocation = shearerLocation;
        this.dateObject = new Date();
    }
}
