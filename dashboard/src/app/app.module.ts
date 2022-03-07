import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';

import { NgChartsModule } from 'ng2-charts';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { CardChartComponent } from './components/charts/card-chart/card-chart.component';
import { TableComponent } from './components/table/table.component';
import { LocationPageComponent } from './pages/location-page/location-page.component';
import { BeaconPageComponent } from './pages/beacon-page/beacon-page.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { DevicePageComponent } from './pages/device-page/device-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    NotFoundPageComponent,
    IndexPageComponent,
    LineChartComponent,
    PieChartComponent,
    CardChartComponent,
    TableComponent,
    LocationPageComponent,
    BeaconPageComponent,
    DevicePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    HttpClientModule,
    DataTablesModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
