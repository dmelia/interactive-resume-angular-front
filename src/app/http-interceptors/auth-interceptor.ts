import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, switchMap} from "rxjs";
import {SharedStorageService} from "../services/shared-storage.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private authService: AuthService, private sharedLocalStorageService: SharedStorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Content-Type': 'application/json'
      }
    });
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
      } else {
        const subscribe = this.refreshToken(request, next);
        if (subscribe) {
          subscribe.subscribe(() => {
            return next.handle(request);
          });
        }
      }
    }
    return next.handle(request);
  }

  private refreshToken(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      const refreshToken = this.sharedLocalStorageService.getStoredJwtToken()?.refreshToken;
      if (refreshToken) {
        return this.authService.refreshToken().pipe(switchMap((token) => {
            this.isRefreshing = false;
            this.sharedLocalStorageService.setToken(token);
            return next.handle((this.addTokenHeader(request, token.accessToken)));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.authService.logOut();
            throw err;
          }));
      }
    }
    return undefined;
  }

  private addTokenHeader(request: HttpRequest<any>, accessToken: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
}
