import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private inputValue = new BehaviorSubject<number>(0);
  currentInputValue = this.inputValue.asObservable();

  constructor() { }

  changeInputValue(value: number) {
    this.inputValue.next(value);
  } 

}
