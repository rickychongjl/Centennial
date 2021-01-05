import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as dialogs from "tns-core-modules/ui/dialogs";

@Injectable({
  providedIn: 'root'
})
export class ElectricityPriceInspectorService {
  public price = 0;
  public threshold;
  public spikeDuration;

  public electricitySpikeSource = new Subject<boolean>();
  public electricitySpike$ = this.electricitySpikeSource.asObservable();

  public timer = 0;
  public timeOutValue = 20;//600000 is 10 minutes

  public spike = false;

  constructor() { 
    setInterval(() => {
      // if(this.price >= this.threshold){
      //   //notify operator
      //   this.electricitySpikeSource.next(true);
      // }
      // this.price = Math.floor(Math.random() * 60) + 1;
      if(this.timer === this.timeOutValue){
        this.electricitySpikeSource.next(true);
        this.spike = true;
        this.spikeDuration = Math.floor(Math.random() * 5) + 1;
        // this.notify(
        //   "Electricity price spike",
        //   "Shearer should halt",
        //   "Close"
        // );
        setTimeout(() => {
          this.electricitySpikeSource.next(false);
          this.spike = false;
          this.timer = 0;
        }, this.spikeDuration*1000);
      }
      if(this.spike != true){
        this.timer++;
      } 
    },1000);
  }
  public notify(title: string, message: string, okText: string) {
    dialogs.alert({
      title: title,
      message: message,
      okButtonText: okText
    });
  }
}
