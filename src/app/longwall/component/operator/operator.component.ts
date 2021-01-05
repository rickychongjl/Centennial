import { Component, OnInit } from '@angular/core';
import { ObservableArray } from '@nativescript/core';
import { ShearerGraph } from '../../../shearer/shared/models/shearer-graph.model';
import { ShearerService } from '../../../shearer/shared/shearer.service';

@Component({
  selector: 'ns-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {
  public shearerLocationArray: ObservableArray<ShearerGraph> = new ObservableArray<ShearerGraph>();

  public shearer: ShearerGraph;
  public date: Date = new Date();

  public majorTickInterval = 20;
  constructor(private shearerService: ShearerService) { }

  ngOnInit(): void {
    this.shearerService.shearerLocation$.subscribe(location => {
      this.date = new Date();
      var input_time = location.dateObject.getHours() + ":" + location.dateObject.getMinutes() + ":" + location.dateObject.getSeconds();
      var stale = false;
      var count = 0;
      var lastItemInArray = this.shearerLocationArray.getItem(this.shearerLocationArray.length - 1);

      if (location.globalIndex % this.shearerService.cycle === 0)
        this.majorTickInterval += this.majorTickInterval;
      
      if (this.shearerLocationArray.length > 0) {
        var diff = this.date.getTime() - location.dateObject.getTime();
        if (diff >= 3000)
          stale = true;
        count = location.globalIndex - lastItemInArray.globalIndex;
      }
      //received packet not in order
      if (count > 1) {
        var tempValue = lastItemInArray.location;
        if (location.shearerLocation > lastItemInArray.location){
          for (var i = lastItemInArray.globalIndex + 1; i < location.globalIndex; i++) {
            this.shearer = new ShearerGraph(tempValue, null, null, true, i);
            this.shearerLocationArray.setItem(i, this.shearer);
            tempValue++;
          }
        }else{
          for (var i = lastItemInArray.globalIndex + 1; i < location.globalIndex; i++) {
            this.shearer = new ShearerGraph(tempValue, null, null, true, i);
            this.shearerLocationArray.setItem(i, this.shearer);
            tempValue--;
          }
        }
      }
      //the delayed packet has arrived and we need to go back and set it subsequently
      if (count < 0) {
        var temp = this.shearerLocationArray.getItem(location.globalIndex);
        temp.location = location.shearerLocation;
        temp.dateObject = location.dateObject;
        temp.time = input_time;
        temp.stale = true;
        temp.staleLocation = temp.location;

        //set the stale points
        for (var i = location.globalIndex; i < this.shearerLocationArray.length; i++) {
          if (!this.shearerLocationArray.getItem(i).stale) {
            this.shearerLocationArray.getItem(i).staleLocation = this.shearerLocationArray.getItem(i).location;
            break;
          }
        }
        this.shearerLocationArray.setItem(location.globalIndex, temp);
      } else {
        this.shearer = new ShearerGraph(location.shearerLocation, location.dateObject, input_time, stale, location.globalIndex);
        this.shearerLocationArray.setItem(location.globalIndex, this.shearer);

      }
    });
  }

  public stopShearer() {
    this.shearerService.stopShearerSignalSource.next(true);
  }
}
