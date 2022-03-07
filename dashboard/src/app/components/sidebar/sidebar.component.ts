import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  navigation: { [key: string]: { name: string, icon: string, path?: string, children?: { [key: string]: { name: string, path: string }[] }}[] } = {
    "": [
      { name: "Dashboard", icon: "tachometer-alt", path: "" },
      { name: "Locations", icon: "map-pin", path: "locations" },
      { name: "Beacons", icon: "signal", path: "beacons" },
      { name: "Devices", icon: "mobile-alt", path: "devices" },
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    document.body.classList.toggle('sidebar-toggled')
    document.getElementById('accordionSidebar')?.classList.toggle('toggled')
  }

  navHasChildren(nav: {children?: any}) {
    return Object.keys(nav).includes('children')
  }

}
