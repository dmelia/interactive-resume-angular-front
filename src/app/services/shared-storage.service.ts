import {Injectable} from "@angular/core";
import {User} from "../models/user.model";
import {JwtToken} from "../models/jwt-token.model";

@Injectable({providedIn: 'root'})
export class SharedStorageService {

  getStoredUser(): User | null {
    const storedString = localStorage.getItem('user');
    if (storedString != null) {
      const storedUser = JSON.parse(storedString);
      return {
        active: storedUser['active'],
        email: storedUser['email'],
        firstname: storedUser['firstname'],
        id: storedUser['id'],
        lastname: storedUser['lastname'],
        //password: storedUser['password'], We will never store the user's password
        username: storedUser['username']
      };
    }
    return null;
  }

  setStoredUser(user:User) {
    window.sessionStorage.setItem('user', JSON.stringify(user));
  }

  clearStoredUser() {
    window.sessionStorage.removeItem('user');
  }

  getStoredJwtToken(): JwtToken | null {
    const storedString = window.sessionStorage.getItem('token');
    if (storedString != null) {
      const storedToken = JSON.parse(storedString);
      return {
        accessToken: storedToken['accessToken']
      }
    }
    return null;
  }

  setToken(token: JwtToken) {
    window.sessionStorage.setItem('token', JSON.stringify(token));
  }

  clearStoredToken() {
    window.sessionStorage.removeItem('token');
  }

  getCurrentLanguage():string | null {
    return window.sessionStorage.getItem("language");
  }

  setCurrentLanguage(lang:string) {
    window.sessionStorage.setItem("language", lang);
  }
}
