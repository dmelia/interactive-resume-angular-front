import {Injectable} from '@angular/core';
import {SharedLocalStorageService} from "../services/shared-local-storage.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private sharedLocalStorageService: SharedLocalStorageService) {
  }

  isLoggedIn(): boolean {
    const storedToken = this.sharedLocalStorageService.getStoredJwtToken();
    return storedToken != null;
  }
}
