import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import `HttpClient` for making HTTP requests to your backend API server.
import {catchError, map, Observable, of, tap} from 'rxjs'; // Import RxJS operators for handling asynchronous data streams in the service methods.
import { User } from '../models/user.model'; // Define a user model interface or class and import it here.

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'localhost:8080/api'; // Replace this with your backend API URL, e.g., `https://your-backend-server/api`.

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Define the request header for JSON content.
    return this.http.post<User>(`${this.baseUrl}/auth/login`, { email, password }, { headers }) // Make a POST request to your backend API server with user credentials in body and get an Observable of User type as response.
      .pipe(
        tap((user: User) => this.setSession(user)), // Set the session data (e.g., access token, email, id) for authenticated users after a successful login request using `tap` operator from RxJS library.
        catchError(this.handleError<User>('login')) // Handle errors in this method with custom error handling function that returns an Observable of User type as response to keep the application's state consistent and avoid breaking its flow due to unexpected issues during login requests or responses processing.
      );
  }

  private handleError<T>(operation = 'operation', result?: T) { // Define a custom error handling function for HTTP request errors that returns an Observable of User type as response in case the user is already authenticated and there's no need to show any login form or redirect them. This helps maintain application state consistency across different parts of your codebase, including components, services, etc., without breaking its flow due to unexpected issues during HTTP requests handling process.
    return (error: any): Observable<T> => { // Define the error handler function that takes an `Observable` as input and returns a new one with custom behavior based on specific conditions like user authentication status or type of errors encountered while processing data streams in your application codebase using RxJS library.
      console.error(error); // Log the error to console for debugging purposes.
      return of(result as T); // Return an Observable that emits a default value (e.g., `null`, empty string, or any other suitable type) in case there's no need to show login form or redirect user due to errors during HTTP requests handling process and maintain application state consistency across different parts of your codebase without breaking its flow using RxJS library operators like `of` for creating new Observables with custom behavior based on specific conditions.
    };
  }

  isLoggedIn(): Observable<boolean> {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const { access_token } = storedUser; // Extract the access token from the session data to check its validity status, if any issue arises while fetching data or processing user input, etc., ensure proper error handling mechanism in case of unexpected errors during HTTP requests handling process using Angular's `HttpClient` service.
    return this.http.get<User>('https://your-api-url/user', { // Make an HTTP GET request to your backend API endpoint for fetching user data based on their access token, email address, unique identifier, etc., with proper error handling mechanism in case any issue arises while processing user input or communicating between different parts of the application codebase using Angular's `HttpClient` service.
      headers: { Authorization: 'Bearer ' + access_token }, // Add an authorization header to the HTTP request with a bearer token based on the stored access token for secure communication between your web app and backend server, if any issue arises while fetching data or processing user input, etc., ensure proper error handling mechanism in case of unexpected errors during HTTP requests handling process using Angular's `HttpClient` service.
    }).pipe( // Use RxJS operators like map to transform the response from your backend API into a boolean value indicating if a user is authenticated or not based on their access token status, email address, unique identifier, etc., with proper error handling mechanism in case any issue arises while processing data using Angular's `HttpClient` service.
      map((user: User) => { // Map the response from your backend API to a boolean value indicating if a user is authenticated or not based on their access token status, email address, unique identifier, etc., with proper error handling mechanism in case any issue arises while processing data using Angular's `HttpClient` service.
        return !!user && !!(storedUser as User).id; // Check if the fetched user object is not null and has a valid id property to determine if they are authenticated or not, with proper error handling mechanism in case any issue arises while processing data using Angular's `HttpClient` service.
      })
    );
  }

  private setSession(user: User): void {
    localStorage.setItem('user', "" + user.id);
    localStorage.setItem('email', user.email);
  }
}
