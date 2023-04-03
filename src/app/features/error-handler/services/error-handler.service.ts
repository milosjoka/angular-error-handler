import {ErrorHandler, Injectable, Injector} from "@angular/core";
import {ErrorService} from "./error.service";
import {ErrorInfo} from "../data-models/error-info.model";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
  // ErrorHandler is created before the providers
  // So we need Injector for dependency injection
  // in our custom error handler class(service)
  constructor(private injector: Injector) {
  }

  handleError(error: any): void {
    const errorService = this.injector.get(ErrorService);

    const errorInfo: ErrorInfo = errorService.getErrorInfo(error);


    if (error instanceof HttpErrorResponse) {
      // server side error
      errorService.handleServerSideError(errorInfo);
    } else {
      // client side error
      errorService.handleClientSideError(errorInfo);
    }
  }

}
