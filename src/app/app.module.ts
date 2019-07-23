import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomTableComponent } from './Component/custom-table/custom-table.component';
import { DataService } from './Service/data.service';

import { MockBackendProvider } from './mockup-server/mockup-provider';
import { PaginationComponent } from './Component/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomTableComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    DataService,
    MockBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
