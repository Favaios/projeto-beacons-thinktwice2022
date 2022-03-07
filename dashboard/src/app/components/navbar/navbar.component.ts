import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  unseenAlerts: number = 0

  constructor(public alertService: AlertService) { }

  ngOnInit(): void {
  }

}
