import { Injectable } from '@angular/core';

export interface Tile {
  id: number,
  class: string,
  cols: number,
  rows: number,
  text: string,
}

@Injectable({
  providedIn: 'root'
})
export class StoreInfoService {

  tiles: Tile[] = [
    {id: 1, text: 'One', cols: 3, rows: 1, class: 'one-tile'},
    {id: 2, text: 'Two', cols: 1, rows: 2, class: 'two-tile'},
    {id: 3, text: 'Three', cols: 1, rows: 1, class: 'three-tile'},
    {id: 4, text: 'Four', cols: 2, rows: 1, class: 'four-tile'},
  ];
  constructor() { }
}
