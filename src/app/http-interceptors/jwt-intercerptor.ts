import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {SharedStorageService} from "../services/shared-storage.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private sharedLocalStorageService: SharedStorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.sharedLocalStorageService.getStoredJwtToken();
    if (token) {
      const helper = new JwtHelperService();
      const expired = helper.isTokenExpired(token.accessToken);
      if (!expired) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token.accessToken}`
          }
        });
      }
    }
    request = request.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Content-Type': 'application/json'
      }
    })
    return next.handle(request);
  }
}
