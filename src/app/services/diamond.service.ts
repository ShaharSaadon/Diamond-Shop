import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, from, tap, retry, catchError } from 'rxjs';
import { storageService } from './async-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Diamond, DiamondFilter } from '../models/diamond.model';
const ENTITY = 'diamonds'

@Injectable({
  providedIn: 'root'
})

export class DiamondService {

  private _diamonds$ = new BehaviorSubject<Diamond[]>([])
  public diamonds$ = this._diamonds$.asObservable()

  private _diamondFilter$ = new BehaviorSubject<DiamondFilter>({ term: '' });
  public diamondFilter$ = this._diamondFilter$.asObservable()

  constructor() {
    // Handling Demo Data, fetching from storage || saving to storage 
    const diamonds = JSON.parse(localStorage.getItem(ENTITY) || 'null')
    if (!diamonds || diamonds.length === 0) {
      localStorage.setItem(ENTITY, JSON.stringify(this._createDiamonds()))
    }
  }

  public query() {
    return from(storageService.query(ENTITY))
      .pipe(
        tap(diamonds => {
          const filterBy = this._diamondFilter$.value
          diamonds = diamonds.filter(diamond =>
            diamond.name.toLowerCase().includes(filterBy.term.toLowerCase())
            || diamond.collection.toLowerCase().includes(filterBy.term.toLowerCase())
          )
          this._diamonds$.next(diamonds)
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  public setFilter(diamondFilter: DiamondFilter) {
    this._diamondFilter$.next({ ...diamondFilter })
    this.query().subscribe()
  }

  public getById(id: string): Observable<Diamond> {
    return from(storageService.get(ENTITY, id))
      .pipe(catchError(this._handleError))
  }

  public remove(id: string) {
    return from(storageService.remove(ENTITY, id))
      .pipe(
        tap(() => {
          let diamonds = this._diamonds$.value
          diamonds = diamonds.filter(diamond => diamond._id !== id)
          this._diamonds$.next(diamonds)
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  public save(diamond: Diamond) {
    return diamond._id ? this._updateDiamond(diamond) : this._addDiamond(diamond)
  }

  public getEmptyDiamond() {
    return {
      name: '',
      price: 0,
      collection: '',
      imgUrl: ''
    }
  }

  private _updateDiamond(diamond: Diamond) {

    return from(storageService.post(ENTITY, diamond))
      .pipe(
        tap(updatedDiamond => {
          const diamonds = this._diamonds$.value
          this._diamonds$.next(diamonds.map(diamond => diamond._id === updatedDiamond._id ? updatedDiamond : diamond))
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  private _addDiamond(diamond: Diamond) {
    const newDiamond = new Diamond(diamond.name, diamond.collection,diamond.price);
    if (typeof newDiamond.setId === 'function') newDiamond.setId(this._getRandomId());
    return from(storageService.post(ENTITY, diamond))
      .pipe(
        tap(newDiamond => {
          const diamonds = this._diamonds$.value
          this._diamonds$.next([...diamonds, newDiamond])
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  private _sort(diamonds: Diamond[]): Diamond[] {
    return diamonds.sort((a, b) => {
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
        return -1;
      }
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
        return 1;
      }
      return 0;
    })
  }

  private _filter(diamonds: Diamond[], term: string) {
    term = term.toLocaleLowerCase()
    return diamonds.filter(diamond => {
      return diamond.name.toLocaleLowerCase().includes(term) ||
        diamond.collection.toLocaleLowerCase().includes(term)
    })
  }

  private _createDiamonds() {
    const diamonds = [
      {
        "_id": "1",
        "name": "Round Brilliant Cut Diamond",
        "price": "5000",
        "collection": "Classic",
        "imgUrl": "https://images.pexels.com/photos/2849742/pexels-photo-2849742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        "_id": "2",
        "name": "Princess Cut Diamond",
        "price": "3500",
        "collection": "Modern",
        "imgUrl": "https://images.pexels.com/photos/735252/pexels-photo-735252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        "_id": "3",
        "name": "Oval Cut Diamond",
        "price": "4000",
        "collection": "Vintage",
        "imgUrl": "https://images.pexels.com/photos/2876036/pexels-photo-2876036.jpeg"
      },
      {
        "_id": "4",
        "name": "Emerald Cut Diamond",
        "price": "6000",
        "collection": "Classic",
        "imgUrl": "https://images.pexels.com/photos/168927/pexels-photo-168927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        "_id": "5",
        "name": "Cushion Cut Diamond",
        "price": "4500",
        "collection": "Modern",
        "imgUrl": "https://images.pexels.com/photos/750148/pexels-photo-750148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        "_id": "6",
        "name": "Pear Cut Diamond",
        "price": "5500",
        "collection": "Vintage",
        "imgUrl": "https://images.pexels.com/photos/3266703/pexels-photo-3266703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        "_id": "7",
        "name": "Asscher Cut Diamond",
        "price": "7000",
        "collection": "Classic",
        "imgUrl": "https://images.pexels.com/photos/750148/pexels-photo-750148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        "_id": "8",
        "name": "Radiant Cut Diamond",
        "price": "8000",
        "collection": "Modern",
        "imgUrl": "https://images.pexels.com/photos/2732096/pexels-photo-2732096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        "_id": "9",
        "name": "Marquise Cut Diamond",
        "price": "6500",
        "collection": "Vintage",
        "imgUrl": "https://images.pexels.com/photos/9332185/pexels-photo-9332185.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
      },
      {
        "_id": "10",
        "name": "Heart Cut Diamond",
        "price": "7500",
        "collection": "Classic",
        "imgUrl": "https://images.pexels.com/photos/5362404/pexels-photo-5362404.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
      },
      {
        "_id": "11",
        "name": "Round Brilliant Cut Diamond",
        "price": "5500",
        "collection": "Modern",
        "imgUrl": "https://images.pexels.com/photos/7856960/pexels-photo-7856960.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
      },
      {
        "_id": "12",
        "name": "Oval Cut Diamond",
        "price": "4200",
        "collection": "Vintage",
        "imgUrl": "https://images.pexels.com/photos/8398839/pexels-photo-8398839.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
      },
      {
        "_id": "13",
        "name": "Princess Cut Diamond",
        "price": "3600",
        "collection": "Classic",
        "imgUrl": "https://images.pexels.com/photos/10976653/pexels-photo-10976653.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
      },
      {
        "_id": "14",
        "name": "Emerald Cut Diamond",
        "price": "6200",
        "collection": "Modern",
        "imgUrl": "https://images.pexels.com/photos/230289/pexels-photo-230289.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
      },
      {
        "_id": "15",
        "name": "Asscher Cut Diamond",
        "price": "7200",
        "collection": "Vintage",
        "imgUrl": "https://images.pexels.com/photos/14058109/pexels-photo-14058109.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
      },
      {
        "_id": "16",
        "name": "Radiant Cut Diamond",
        "price": "8200",
        "collection": "Classic",
        "imgUrl": "https://images.pexels.com/photos/13412779/pexels-photo-13412779.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
      },
      {
        "_id": "17",
        "name": "Marquise Cut Diamond",
        "price": "6700",
        "collection": "Modern",
        "imgUrl": "https://images.pexels.com/photos/9332183/pexels-photo-9332183.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
      },
      {
        "_id": "18",
        "name": "Heart Cut Diamond",
        "price": "7700",
        "collection": "Vintage",
        "imgUrl": "https://images.pexels.com/photos/9332187/pexels-photo-9332187.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
      },
      {
        "_id": "19",
        "name": "Round Brilliant Cut Diamond",
        "price": "5600",
        "collection": "Classic",
        "imgUrl": "https://images.pexels.com/photos/5370704/pexels-photo-5370704.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
      },
      {
        "_id": "20",
        "name": "Oval Cut Diamond",
        "price": "4300",
        "collection": "Modern",
        "imgUrl": "https://images.pexels.com/photos/5370657/pexels-photo-5370657.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
      }
    ]

    return diamonds
  }

  private _handleError(err: HttpErrorResponse) {
    console.log('error in diamond service:', err)
    return throwError(() => err)
  }

  private _getRandomId(length = 8): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}

