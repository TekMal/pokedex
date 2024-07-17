import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const requestWithApiKey = req.clone({
      headers: req.headers.set('X-Api-Key', environment.apiKey),
    });

    return next.handle(requestWithApiKey);
  }
}
