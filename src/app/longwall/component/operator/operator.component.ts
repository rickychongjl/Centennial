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

  constructor(private shearerService: ShearerService) { }

  ngOnInit(): void {
    this.shearerService.shearerLocation$.subscribe(location => {
      this.shearer = new ShearerGraph(location);
      this.shearerLocationArray.push(this.shearer);
    });
  }
}
