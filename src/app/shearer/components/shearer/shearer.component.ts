import { Component, OnInit } from '@angular/core';
import { ShearerService } from "../../shared/shearer.service";
import { ShearerGraph } from "../../shared/models/shearer-graph.model";
import { ObservableArray } from '@nativescript/core';

@Component({
  selector: 'ns-shearer',
  templateUrl: './shearer.component.tns.html',
  styleUrls: ['./shearer.component.css']
})
export class ShearerComponent implements OnInit {
  public shearerLocation: number;  
  public categoricalSource: ObservableArray<ShearerGraph> = new ObservableArray<ShearerGraph>();

  public shearer: ShearerGraph;
  public timer;

  constructor(private shearerService: ShearerService) { }

  ngOnInit(): void {
    this.shearerService.shearerLocation$.subscribe(location => {
      this.shearerLocation = location;
      this.shearer = new ShearerGraph(this.shearerLocation);
      this.categoricalSource.push(this.shearer);
      this.timer = () => {
        setTimeout(() => {
          console.log("Hello");
        }, 1000);
      }
    });
  }

}
