import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, of, tap} from 'rxjs';
import {User} from '../models/user.model';
import {SharedLocalStorageService} from "./shared-local-storage.service";

@Injectable({providedIn: 'root'})
export class AuthService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private sharedLocalStorageService: SharedLocalStorageService) {
  }

  login(username: string | undefined | null, password: string | undefined | null): Observable<User> {
    if (typeof username === 'string' && typeof password == 'string') {
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.post<User>(`${this.baseUrl}/auth/login`, {
        username,
        password
      }, {headers})
        .pipe(
          tap((user: User) => this.setSession(user)),
          catchError(this.handleError<User>('login'))
        );
    } else {
      throw new Error("login form is required");
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
    return storedToken != null;
  }

  private setSession(user: User): void {
    this.sharedLocalStorageService.setStoredUser(user);
  }

  logOut(): void {
    this.sharedLocalStorageService.clearStoredUser();
  }
}
