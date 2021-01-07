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
  public timeOutValue = 150;//30 is 1 minute because we are going twice as slow, 300 is 10 mins, 150 is 5 mins

  public spike = false;

  constructor() { 
    setInterval(() => {
      if(this.timer === this.timeOutValue){
        this.electricitySpikeSource.next(true);
        this.spike = true;
        this.spikeDuration = (Math.floor(Math.random() * 75) + 1) * 1000;
        console.log("electricity spike");
        setTimeout(() => {
          this.electricitySpikeSource.next(false);
          this.spike = false;
          this.timer = 0;
          console.log("stabilised");
        }, this.spikeDuration);
      }
      this.timer++;
    },2000);
  }
  public notify(title: string, message: string, okText: string) {
    dialogs.alert({
      title: title,
      message: message,
      okButtonText: okText
    });
  }
}
