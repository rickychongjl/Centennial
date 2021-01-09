import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElectricityPriceInspectorService {
  public electricityPrice = 30;
  public electricityThreshold = 200;
  public spikeDuration;

  public electricitySpikeSource = new Subject<boolean>();
  public electricitySpike$ = this.electricitySpikeSource.asObservable();

  public timer = 0;
  public timeOutValue = 300;//30 is 1 minute because we are going twice as slow, 300 is 10 mins, 150 is 5 mins

  public spike = false;

  constructor() { 
    setInterval(() => {
      if(this.timer === this.timeOutValue){
        this.electricitySpikeSource.next(true);
        this.spike = true;
        this.spikeDuration = (Math.floor(Math.random() * 75) + 1) * 1000;
        setTimeout(() => {
          this.electricitySpikeSource.next(false);
          this.spike = false;
          this.timer = 0;
        }, this.spikeDuration);
      }
      if(this.spike){
        this.electricityPrice = Math.floor(Math.random() * 30) + this.electricityThreshold;
      }else{
        this.electricityPrice = Math.floor(Math.random() * 30) + 30; 
      }
      this.timer++;
    },2000);
  }
}
