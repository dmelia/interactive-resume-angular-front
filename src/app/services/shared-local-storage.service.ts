import {Injectable} from "@angular/core";
import {User} from "../models/user.model";
import {JwtToken} from "../models/jwt-token.model";

@Injectable({providedIn: 'root'})
export class SharedLocalStorageService {

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
    localStorage.setItem('user', JSON.stringify(user));
  }

  getStoredJwtToken(): JwtToken | null {
    const storedString = localStorage.getItem('jwt-token');
    if (storedString != null) {
      const storedToken = JSON.parse(storedString);
      return {
        accessToken: storedToken['accessToken']
      }
    }
    return null;
  }
}
