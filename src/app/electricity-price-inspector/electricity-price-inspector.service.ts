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
  public timeOutValue = 30;//600000 is 10 minutes

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
        this.spikeDuration = (Math.floor(Math.random() * 15) + 1) * 1000;
        console.log("spike duration is " + this.spikeDuration);
        // this.notify(
        //   "Electricity price spike",
        //   "Shearer should halt",
        //   "Close"
        // );
        setTimeout(() => {
          this.electricitySpikeSource.next(false);
          this.spike = false;
          this.timer = 0;
        }, this.spikeDuration);
      }
      this.timer++;
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
