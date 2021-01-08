import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ShearerItem } from './../../shearer/shared/models/shearer-item.model';
import { ElectricityPriceInspectorService } from '../../electricity-price-inspector/electricity-price-inspector.service';
import { ControlSystemInspectorService } from '../../shearer/shared/control-system-inspector.service';

@Injectable({
  providedIn: 'root'
})
export class ShearerService {
  public shearerLocationSource = new Subject<ShearerItem>();
  public shearerLocation$ = this.shearerLocationSource.asObservable();

  private shearerItem: ShearerItem;

  private index = 0;
  public cycle = 100;
  public mainGate = 0;
  public tailGate = 100;

  public randomMaxRange = this.cycle;
  public numberOfOutages = 17;

  private position = 0;
  private outageDuration = 3;
  private outagesPositionArray = this.randomArrayGenerator(this.randomMaxRange, this.numberOfOutages);
  private activeOutagesArray: Array<ShearerItem> = new Array<ShearerItem>();

  private previousGate: string = "";
  private stopGate: string = "";
  private reachStopGate: boolean = false;

  private expectedResumeOperationTime: string;
  private priceSpikeEvent = false;
  private priceSpike = false;
  private timerStarted = false;

  constructor(
      private electricityPriceInspectorService: ElectricityPriceInspectorService,
      private controlSystemInspectorService: ControlSystemInspectorService
    ) {
    var timer = setInterval(() => {
      this.electricityPriceInspectorService.electricitySpike$.subscribe(spike => {
        if(spike){
          this.stopGate = this.nearestGate();
          this.stopGate == "tailGate" ? this.previousGate = "mainGate" : this.previousGate = "tailGate";
          this.priceSpikeEvent = true;
          this.priceSpike = true;
          console.log("in spike now, the nearest gate is " + this.stopGate);
        }else{
          console.log("out of spike now ");
          this.priceSpike = false;
        }
      });
      if (this.priceSpikeEvent && !this.priceSpike && !this.timerStarted){
        this.timerStarted = true;
        var now = new Date();
        this.expectedResumeOperationTime = this.timeAdder(2, now, "minutes");
        setTimeout(() => {
          this.priceSpike ? this.priceSpikeEvent = true : this.priceSpikeEvent = false;
          this.timerStarted = false;
          this.reachStopGate = false;
        }, 120000);
      }

      if (!this.reachStopGate){
        if (this.position == this.tailGate) {
          this.previousGate = "tailGate";
          this.outagesPositionArray = this.randomArrayGenerator(this.randomMaxRange, this.numberOfOutages);
        } else if (this.position == this.mainGate) {
          this.previousGate = "mainGate";
          this.outagesPositionArray = this.randomArrayGenerator(this.randomMaxRange, this.numberOfOutages);
        }
        this.shearerItem = new ShearerItem(this.position, this.index);
        if (this.outagesPositionArray.includes(this.position)) {
          this.shearerItem.remainingOutageDuration = this.outageDuration;
          this.activeOutagesArray.push(this.shearerItem);
        } else {
          // if(this.controlSystemInspectorService.getControlSystemStatus()){
            this.shearerLocationSource.next(this.shearerItem);
          // }
        }
        if (this.previousGate === "tailGate") {
          this.position--;
        } else {
          this.position++;
        }
        this.index++;
        if (this.previousGate === this.stopGate) {
          this.reachStopGate = true;
          this.stopGate = "";
        } else {
          this.reachStopGate = false;
        }
      }
      if (this.activeOutagesArray.length > 0) {
        if (this.activeOutagesArray[0].remainingOutageDuration <= 0){
          // if (this.controlSystemInspectorService.getControlSystemStatus()) {
            this.shearerLocationSource.next(this.activeOutagesArray[0]);
          // }
          this.activeOutagesArray.shift();
        }
        for (var i = 0; i < this.activeOutagesArray.length; i++) {
          this.activeOutagesArray[i].remainingOutageDuration--;
        }
      }
    }, 2000);
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

  private timeAdder(valueToAdd: number, dateTimeObject: Date, unit: string): string{
    var hours = dateTimeObject.getHours();
    var minutes = dateTimeObject.getMinutes();
    var seconds = dateTimeObject.getSeconds();

    if (unit == "seconds") {
      seconds += valueToAdd;
    } else if (unit == "minutes") {
      minutes += valueToAdd;
    } else if (unit == "hours") {
      hours += valueToAdd;
    }
    if (seconds >= 60) {
      seconds = 0;
      minutes += 1;
    } else if (minutes >= 60) {
      minutes = 0;
      hours += 1;
    } else if (hours >= 24) {
      seconds = 0;
      minutes = 0;
      hours = 0;
    }

    return hours + ":" + minutes + ":" + seconds;
  }
}
