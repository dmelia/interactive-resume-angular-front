import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../services/auth.service";
import {SharedStorageService} from "../services/shared-storage.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public translate: TranslateService, private authService: AuthService, private sharedLocalStorageService: SharedStorageService) {
    translate.addLangs(['en', 'fr']);
  }

  ngOnInit(): void {
    const language = this.sharedLocalStorageService.getCurrentLanguage();
    console.log(language);
    if (language != null) {
      this.translate.use(language);
    } else {
      this.translate.use('en');
    }
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.sharedLocalStorageService.setCurrentLanguage(lang);
  }

  logout() {
    this.authService.logOut();
  }

  isLogged(): boolean {
    return this.authService.isLoggedIn();
  }
}
