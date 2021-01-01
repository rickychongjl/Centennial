import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ShearerItem } from './../../shearer/shared/models/shearer-item.model';

@Injectable({
  providedIn: 'root'
})
export class ShearerService {
  /*this is longwall operator service which gets the information from the shearer,
  which in this case, we will mock up the shearer */

  public shearerLocationSource = new Subject<ShearerItem>();
  public shearerLocation$ = this.shearerLocationSource.asObservable();
  private shearerItem: ShearerItem;

  private cycle = 100;

  private position = 0;
  private outageDuration = 3;
  private outagesPositionArray = this.randomArrayGenerator(this.cycle,50);
  private activeOutagesArray: Array<ShearerItem> = new Array<ShearerItem>();

  /*we need to generate a random number generator to represent the position which we will mock data outage
  and then we will have a temp to hold the location we want to hold on to. 
  */
  constructor() {
    for(var i=0; i<this.outagesPositionArray.length; i++){
      console.log(this.outagesPositionArray[i]);
    }
    console.log("__________");
    var timer = setInterval(() => {
      if (this.position > this.cycle){
        clearInterval(timer);
      }
      this.shearerItem = new ShearerItem(this.position);
      if (this.activeOutagesArray.length > 0 && (this.position === this.activeOutagesArray[0].shearerLocation + this.outageDuration)) {
        // console.log("resolving " + this.activeOutagesArray[0].shearerLocation);
        this.shearerLocationSource.next(this.activeOutagesArray[0]);
        this.activeOutagesArray.shift();
      }else{
        if (this.outagesPositionArray.includes(this.position)) {
          this.activeOutagesArray.push(this.shearerItem);
        } else {
          // console.log("Sending " + this.shearerItem.shearerLocation);
          this.shearerLocationSource.next(this.shearerItem);
        }
        this.position++;
      }
    }, 1000);
  }

  private randomArrayGenerator(maxRange: number, numberOfOutage: number): Array<number>{
    var randomOutageArray: Array<number> = new Array<number>();
    for(var i=0; i<numberOfOutage; i++){
      var randNumber = Math.floor(Math.random() * maxRange) + 2;
      while(randomOutageArray.includes(randNumber)){
        randNumber = Math.floor(Math.random() * maxRange) + 2;
      }
      randomOutageArray.push(randNumber);
    }
    
    return randomOutageArray.sort();
  }
}
