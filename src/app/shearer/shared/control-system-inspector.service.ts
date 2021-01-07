import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControlSystemInspectorService {
  //this service will be used for mocking control system outage, 

  public status: boolean = true;
  public dataCoveragePercentage = 80;
  
  constructor() { }

  public getControlSystemStatus(): boolean{
    return this.status;
  }
}
