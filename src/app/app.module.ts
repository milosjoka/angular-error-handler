import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ErrorHandlerModule} from "./features/error-handler/error-handler.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ErrorHandlerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
