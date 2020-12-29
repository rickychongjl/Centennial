import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShearerService {
  public shearerLocationSource = new BehaviorSubject<number>(0);
  public shearerLocation$ = this.shearerLocationSource.asObservable();

  constructor() {
    // for (var i = 0; i < 100; ++i) {
    //   setInterval(() => {
    //     this.shearerLocationSource.next(i);
    //   }, 3000)
    //   // this.shearerLocationSource.next(i);
    // }
    var count = 1;
    var timer = setInterval(() => {
      this.shearerLocationSource.next(count);
      if(count >= 100 )
        clearInterval(timer);
      ++count;
    }, 300)
  }
}
