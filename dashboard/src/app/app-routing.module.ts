import { DevicePageComponent } from './pages/device-page/device-page.component';
import { LocationPageComponent } from './pages/location-page/location-page.component';
import { BeaconPageComponent } from './pages/beacon-page/beacon-page.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: IndexPageComponent },
  { path: 'locations', component: LocationPageComponent },
  { path: 'beacons', component: BeaconPageComponent },
  { path: 'devices', component: DevicePageComponent },
  { path: '**', pathMatch: 'full', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
