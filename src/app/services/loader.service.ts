import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Diamond } from '../models/diamond.model';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  private _isLoading$ = new BehaviorSubject<boolean>(false)
  public isLoading$ = this._isLoading$.asObservable()

  setIsLoading(isLoading: boolean){
    this._isLoading$.next(isLoading)
  }
}
