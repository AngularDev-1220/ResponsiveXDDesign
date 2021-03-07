import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FbService } from './services/fb/fb.service';
import { UiService } from './services/ui/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  showMenu = false;
  darkModeActive = false;
  userEmail = '';
  sub1: Subscription = new Subscription();
  constructor(public ui: UiService, public fb: FbService, public router: Router) {

  }

  loggedIn = this.fb.isAuth();

  ngOnInit(): void {
    this.sub1 = this.ui.darkModeState.subscribe((value) => {
      this.darkModeActive = value;
    });
    this.fb.auth.userData().subscribe((user => {
      this.userEmail = user.email;
    }));
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }
  modeToggleSwitch(): void {
    this.ui.darkModeState.next(!this.darkModeActive);
  }
  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }
  logout(): void {
    this.toggleMenu();
    this.router.navigateByUrl('/login');
    this.fb.auth.signout();
  }
}
