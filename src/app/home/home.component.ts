import { Component, OnInit } from '@angular/core'
import { StoreInfoService, Tile } from '../shared/services/store-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private storeInfo: StoreInfoService) { }
  tiles: Tile[] = []

  ngOnInit(): void {
    this.tiles = this.storeInfo.tiles
  }

}
