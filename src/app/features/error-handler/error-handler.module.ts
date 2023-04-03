import {ErrorHandler, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { InternalServerErrorComponent } from './pages/internal-server-error/internal-server-error.component';
import {ErrorHandlerRoutingModule} from "./error-handler-routing.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ErrorHandlerService} from "./services/error-handler.service";
import {ErrorHandlerInterceptor} from "./interceptors/error-handler.interceptor";
@NgModule({
  declarations: [
    NotFoundComponent,
    InternalServerErrorComponent
  ],
  imports: [
    CommonModule,
    ErrorHandlerRoutingModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },

  ]
})
export class ErrorHandlerModule { }
