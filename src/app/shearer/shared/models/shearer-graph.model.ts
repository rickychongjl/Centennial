export class ShearerGraph {
    public position: number;
    public time: number;
    public stale: boolean;

    constructor(position: number){
        this.position = position;
        this.time = position;
        this.stale = false;
    }
}
