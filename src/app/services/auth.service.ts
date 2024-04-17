import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of, tap} from 'rxjs';
import {SharedStorageService} from "./shared-storage.service";
import {JwtToken} from "../models/jwt-token.model";

@Injectable({providedIn: 'root'})
export class AuthService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private sharedLocalStorageService: SharedStorageService) {
  }

  login(username: string | undefined | null, password: string | undefined | null): Observable<JwtToken> {
    if (typeof username === 'string' && typeof password == 'string') {
      return this.http.post<JwtToken>(`${this.baseUrl}/auth/login`, {username, password})
        .pipe(
          tap((token: JwtToken) => {
            this.setSession(token);
          }),
          catchError(this.handleError<JwtToken>('login'))
        );
    } else {
      throw new Error("login form is required");
    }
  }

  refreshToken(): Observable<JwtToken> {
    const prevToken = this.sharedLocalStorageService.getStoredJwtToken();
    if (prevToken != null) {
      return this.http.post<JwtToken>(`${this.baseUrl}/auth/refreshToken`, {token: prevToken.accessToken}).pipe(
        tap((token: JwtToken) => this.setSession(token)),
        catchError(this.handleError<JwtToken>('refresh'))
      );
    } else {
      return new Observable<JwtToken>(subscriber => () => null);
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  isLoggedIn(): boolean {
    const storedToken = this.sharedLocalStorageService.getStoredJwtToken();
    return storedToken !== null;
  }

  private setSession(token: JwtToken): void {
    this.sharedLocalStorageService.setToken(token);
  }

  logOut(): void {
    this.sharedLocalStorageService.clearStoredToken();
    this.sharedLocalStorageService.clearStoredUser();
  }
}
