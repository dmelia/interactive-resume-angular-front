import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public translate: TranslateService, private authService: AuthService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  logout() {
    this.authService.logOut();
  }

  isLogged(): boolean {
    return this.authService.isLoggedIn();
  }
}
