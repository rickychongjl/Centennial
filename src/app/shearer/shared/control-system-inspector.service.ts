import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControlSystemInspectorService {
  //this service will be used for mocking control system outage, 
  public controlSystemDownTime = 1728000;
  public controlSystemDownTimeDuration;
  public controlSystemDown = false;

  public currentPosition = 0;
  public controlSystemDownPosition = Math.floor(Math.random() * 60) + 60;
  constructor() {
    console.log("the system down position is " + this.controlSystemDownPosition);
    var timer = setInterval(() => {
      //this is to reset once we use up all of the cs down time
      if (this.controlSystemDownTime === 0) {
        //reset the whole thing
        console.log("we have used up all of the control system down time");
        this.controlSystemDownTime = 1728000;
        this.controlSystemDown = false;
        this.currentPosition = 0;
        this.controlSystemDownPosition = Math.floor(Math.random() * 60) + 60;
        // clearInterval(timer);
      }
      //choose a point to have control system downtime
      if (this.currentPosition == this.controlSystemDownPosition && !this.controlSystemDown) {
        console.log("the system down position is " + this.controlSystemDownPosition);
        this.controlSystemDown = true;
        this.controlSystemDownTimeDuration = (Math.floor(Math.random() * 15000) + 15000);
        this.controlSystemDownTime -= this.controlSystemDownTimeDuration;
        console.log("we are in control system down time" + " duration is " + this.controlSystemDownTimeDuration + " and control system down time remaining is " + this.controlSystemDownTime);
        setTimeout(() => {
          this.controlSystemDownPosition += Math.floor(Math.random() * 10) + 1;
          this.controlSystemDown = false;
        }, this.controlSystemDownTimeDuration);
      }
      if (!this.controlSystemDown)
        this.currentPosition++;
    }, 2000);
  }
}
