import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShearerService {
  /*this is longwall operator service which gets the information from the shearer,
  which in this case, we will mock up the shearer */

  public shearerLocationSource = new BehaviorSubject<number>(0);
  public shearerLocation$ = this.shearerLocationSource.asObservable();

  constructor() {
    var count = 1;
    var timer = setInterval(() => {
      this.shearerLocationSource.next(count);
      if(count >= 100 )
        clearInterval(timer);
      ++count;
    }, 300)
  }
}
