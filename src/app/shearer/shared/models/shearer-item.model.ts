export class ShearerItem {
    public shearerLocation: number;
    public dateObject: Date;
    public remainingOutageDuration: number; 
    
    constructor(shearerLocation: number){
        this.shearerLocation = shearerLocation;
        this.dateObject = new Date();
    }
}
