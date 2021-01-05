import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ShearerItem } from './../../shearer/shared/models/shearer-item.model';
import { ElectricityPriceInspectorService } from '../../electricity-price-inspector/electricity-price-inspector.service';

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
  private stopGate: string = "";
  private reachStopGate: boolean = false;

  private priceSpike = false;
  private timerStarted = false;

  constructor(private ElectricityPriceInspectorService: ElectricityPriceInspectorService) {
    var timer = setInterval(() => {
      this.stopShearerSignal$.subscribe(stop => {
        if (stop)
          clearInterval(timer);
      });
      this.ElectricityPriceInspectorService.electricitySpike$.subscribe(spike => {
        if(spike){
          this.stopGate = this.nearestGate();
          if (this.stopGate === "tailGate"){
            this.previousGate = "mainGate";
          }else{
            this.previousGate = "tailGate";
          }
          this.priceSpike = true;
          console.log("in spike now, the nearest gate is " + this.stopGate);
        }else{
          console.log("out of spike now ");
          this.priceSpike = false;
        }
      });
      if (!this.priceSpike && !this.timerStarted){
        this.timerStarted = true;
        //start_timer for 2 mins
        setTimeout(() => {
          this.timerStarted = false;
          this.reachStopGate = false;
          this.stopGate = "";
        }, 120000);
      }
      if (!this.timerStarted || !this.reachStopGate){
        if (this.position == this.tailGate) {
          this.previousGate = "tailGate";
          this.outagesPositionArray = this.randomArrayGenerator(this.randomMaxRange, this.numberOfOutages);
        } else if (this.position == this.mainGate) {
          this.outagesPositionArray = this.randomArrayGenerator(this.randomMaxRange, this.numberOfOutages);
          this.previousGate = "mainGate";
        }
        if(!this.reachStopGate){
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
            if (this.previousGate === this.stopGate) {
              this.reachStopGate = true;
              this.stopGate = "";
            } else {
              this.reachStopGate = false;
            }
          }
        }
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

    return randomOutageArray;
  }

  private nearestGate(): string{
    var mainGateDiff = Math.abs(this.position - this.mainGate);
    var tailGateDiff = Math.abs(this.position - this.tailGate);
    if( mainGateDiff > tailGateDiff ){
      return "tailGate";
    }else{
      return "mainGate";
    }
  }
}
