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
  constructor(private shearerService: ShearerService) { }

  ngOnInit(): void {
    this.shearerService.shearerLocation$.subscribe(location => {
      console.log("location received is " + location.shearerLocation);
      this.date = new Date();
      var input_time = location.dateObject.getHours() + ":" + location.dateObject.getMinutes() + ":" + location.dateObject.getSeconds();
      var stale = false;
      var count = 0;
      var lastItemInArray = this.shearerLocationArray.getItem(this.shearerLocationArray.length - 1);

      if(this.shearerLocationArray.length > 0){
        var diff = this.date.getTime() - location.dateObject.getTime();
        if( diff >= 3000 )
          stale = true;
        count = location.shearerLocation - lastItemInArray.position;
      }
      //received packet not in order
      if(count > 1){
        //temporarily set the not received points
        console.log("receiving position is " + location.shearerLocation + " and last item array position is " + lastItemInArray.position);
        for (var i = lastItemInArray.position; i < location.shearerLocation-1; i++){
          this.shearer = new ShearerGraph(i, null, null, true);
          console.log("setting temp in index " + i);
          this.shearerLocationArray.setItem(i, this.shearer);
        }
      }
      //the delayed packet has arrived and we need to go back and set it subsequently
      if(count < 0){
        // console.log("Packet is resolved " + location);
        var temp = this.shearerLocationArray.getItem(location.shearerLocation - 1);
        temp.position = location.shearerLocation;
        temp.dateObject = location.dateObject;
        temp.time = input_time;
        temp.stale = true;
        this.shearerLocationArray.setItem(location.shearerLocation - 1, temp);
      }else{
        this.shearer = new ShearerGraph(location.shearerLocation, location.dateObject, input_time, stale);
        this.shearerLocationArray.setItem(location.shearerLocation - 1, this.shearer);
     
      }
    });
  }
}
