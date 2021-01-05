import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ShearerItem } from './../../shearer/shared/models/shearer-item.model';

@Injectable({
  providedIn: 'root'
})
export class ShearerService {
  public shearerLocationSource = new Subject<ShearerItem>();
  public shearerLocation$ = this.shearerLocationSource.asObservable();

  public stopShearerSignalSource = new Subject<boolean>();
  public stopShearerSignal$ = this.stopShearerSignalSource.asObservable();

  private shearerItem: ShearerItem;

  private index = 0;
  public cycle = 10;
  public mainGate = 0;
  public tailGate = this.cycle;

  public randomMaxRange = this.cycle;
  public numberOfOutages = 1;

  private position = 0;
  private outageDuration = 3;
  private outagesPositionArray = this.randomArrayGenerator(this.randomMaxRange, this.numberOfOutages);
  private activeOutagesArray: Array<ShearerItem> = new Array<ShearerItem>();

  private previousGate: string = "";

  constructor() {
    var timer = setInterval(() => {
      this.stopShearerSignal$.subscribe(stop => {
        if (stop)
          clearInterval(timer);
      });
      if (this.position == this.tailGate) {
        this.previousGate = "tailGate";
        this.outagesPositionArray = this.randomArrayGenerator(this.randomMaxRange, this.numberOfOutages);
      } else if (this.position == this.mainGate) {
        this.outagesPositionArray = this.randomArrayGenerator(this.randomMaxRange, this.numberOfOutages);
        this.previousGate = "mainGate";
      }
      this.shearerItem = new ShearerItem(this.position, this.index);

      if (this.activeOutagesArray.length > 0 && this.activeOutagesArray[0].remainingOutageDuration === 0) {
        this.shearerLocationSource.next(this.activeOutagesArray[0]);
        this.activeOutagesArray.shift();
      } else {
        if (this.outagesPositionArray.includes(this.position)) {
          this.shearerItem.remainingOutageDuration = this.outageDuration;
          this.activeOutagesArray.push(this.shearerItem);
        } else {
          this.shearerLocationSource.next(this.shearerItem);
        }
        if (this.previousGate === "tailGate") {
          this.position--;
        } else {
          this.position++;
        }
        if (this.activeOutagesArray.length > 0) {
          for (var i = 0; i < this.activeOutagesArray.length; i++) {
            this.activeOutagesArray[i].remainingOutageDuration--;
          }
        }
        this.index++;
      }
    }, 1000);
  }

  private randomArrayGenerator(maxRange: number, numberOfOutage: number): Array<number> {
    var randomOutageArray: Array<number> = new Array<number>();
    for (var i = 0; i < numberOfOutage; i++) {
      var randNumber = Math.floor(Math.random() * maxRange) + 2;
      while (randomOutageArray.includes(randNumber)) {
        randNumber = Math.floor(Math.random() * maxRange) + 2;
      }
      randomOutageArray.push(randNumber);
    }

    return randomOutageArray.sort();
  }
}
