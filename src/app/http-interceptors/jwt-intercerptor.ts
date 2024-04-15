import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {SharedLocalStorageService} from "../services/shared-local-storage.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor
{
  constructor(private sharedLocalStorageService: SharedLocalStorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    const token = this.sharedLocalStorageService.getStoredJwtToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token.accessToken}`
        }
      });
    }
    return next.handle(request);
  }
 }
