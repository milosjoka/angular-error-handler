import {Injectable, NgZone, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {ErrorInfo} from "../data-models/error-info.model";
import {HttpErrorResponse} from "@angular/common/http";
import * as StackTraceParser from 'error-stack-parser';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private zone: NgZone
  ) {}

  navigate(url: string, errorInfo: ErrorInfo) {
    this.zone.run(() => this.router.navigate([url], {state: {errorInfo}}));
  }

  handleServerSideError(errorInfo: ErrorInfo) {
    if (!navigator.onLine) {
      console.log('No internet connection');
    }

    switch (errorInfo.status) {
      // Bad request
      case 400: {
        this.navigate('/internal-server-error', errorInfo);
        break;
      }
      // Unauthorized
      case 401: {
        console.log('No internet connection');
        // TODO reset - clear Angular App
        break;
      }
      // Forbidden
      case 403: {
        console.log('Access denied');
        // TODO Redirect to access denied page
        break;
      }
      // NotFound
      case 404: {
        this.navigate('/not-found', errorInfo);
        break;
      }
      // TODO Implement logic for different HTTP status codes
      default: {
        this.navigate('/internal-server-error', errorInfo);
        break;
      }
    }
  }

  handleClientSideError(error: ErrorInfo) {
    // TODO Implement method
    console.log(`Client side error`, error);
  }

  getErrorInfo(error: any): ErrorInfo {
    const currentTime = new Date().getTime();
    let stack = null;
    try {
      if (!(error instanceof HttpErrorResponse)) {
        stack = StackTraceParser.parse(error);
      }
    } catch (e) {
      stack = null;
    }
    return {
      name: error.name || null,
      appId: 'My app name',
      loggedUser: {
        id: 1,
        email: 'loggedr@user.com',
        fullName: 'Logged user'

      },
      time: currentTime,
      id: `My app name -${currentTime}`,
      url: this.router.url,
      status: error.status || null,
      message: error.message || error.toString(),
      stack
    };
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
