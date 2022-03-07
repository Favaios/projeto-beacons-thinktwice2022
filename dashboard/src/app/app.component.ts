import { Component } from '@angular/core';

import { default as Configurate } from './configuration'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor () {
    Configurate()
  }

}
